import { NextResponse } from 'next/server';
import { predicates } from '@/config/predicates'; // 📁 Import local predicates
import { Predicate } from '@/app/types';
import { ResourceType } from '@/config/resourceTypes'; // Import ResourceType

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get('q')?.toLowerCase() || '';
  const applicableSubjectResourceTypeParam = url.searchParams.get('applicableSubjectResourceType');

  let applicableSubjectResourceType: ResourceType | undefined;

  if (applicableSubjectResourceTypeParam) {
    if (Object.values(ResourceType).includes(applicableSubjectResourceTypeParam as ResourceType)) {
      applicableSubjectResourceType = applicableSubjectResourceTypeParam as ResourceType;
    } else {
      return NextResponse.json(
        { error: 'Invalid applicableSubjectResourceType' },
        { status: 400 }
      );
    }
  }

  try {
    // Convert predicates object to an array if necessary
    const predicatesArray: Predicate[] = Object.values(predicates);

    // Filter predicates based on applicableSubjectResourceType if provided
    let filteredPredicates = predicatesArray;

    if (applicableSubjectResourceType) {
      filteredPredicates = filteredPredicates.filter((predicate) =>
        predicate.applicableSubjectResourceTypes.includes(applicableSubjectResourceType!)
      );
    }

    // Perform text search over the local data
    if (searchQuery) {
      filteredPredicates = filteredPredicates.filter((predicate) => {
        const labelMatch = predicate.label.toLowerCase().includes(searchQuery);
        const synonymsMatch = predicate.synonyms?.some((synonym) =>
          synonym.toLowerCase().includes(searchQuery)
        );
        return labelMatch || synonymsMatch;
      });
    }

    return NextResponse.json({ resources: filteredPredicates });
  } catch (error: any) {
    console.error('Error fetching predicates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch predicates' },
      { status: 500 }
    );
  }
}
