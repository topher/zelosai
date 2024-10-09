'use client';

import { useEffect, useState } from 'react';
import FilterPanel from '../components/FilterPanel';
import { UserSelectedFacets, DropdownOption } from '@/app/types';
import axios from 'axios';
import { Separator } from '@/components/ui/separator';
import StrategyLayout from '../StrategyLayout';

const BrandPersonalityPage: React.FC = () => {
  const [selectedFacets, setSelectedFacets] = useState<UserSelectedFacets>({
    userId: '',
    selectedMarketingChannels: [],
    selectedMarkets: [],
    selectedIndustries: [],
    selectedVALSSegments: [],
    selectedLanguages: [],
    selectedNILActivities: [],
    selectedInterests: [],
    selectedProducts: [],
  });
  
  const [dropdownOptions, setDropdownOptions] = useState<{
    [key: string]: DropdownOption[];
  }>({
    marketing_channels: [],
    geographic_markets: [],
    industries: [],
    vals_segments: [],
    languages: [],
    nil_activities: [],
    interests: [],
    products: []
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const userId = getCurrentUserId(); // Implement this function based on your auth system

      // Fetch selected facets
      const facetsResponse = await axios.get(`/api/user_selected_facets`, {
        params: { userId },
      });

      if (facetsResponse.status === 200) {
        const facetsData: UserSelectedFacets = facetsResponse.data;
        setSelectedFacets(facetsData);
      } else if (facetsResponse.status === 404) {
        console.warn('No facets found for the user. Initializing with empty facets.');
        setSelectedFacets(prev => ({
          ...prev,
          userId,
          selectedInterests: [],
          selectedProducts: [],
        }));
      } else {
        console.error('Failed to fetch user-selected facets');
        setError('Failed to fetch your selections. Please try again later.');
      }

      // Fetch initial dropdown options for smaller datasets (limit 10)
      const entities = [
        'marketing_channels',
        'geographic_markets',
        'industries',
        'vals_segments',
        'languages',
        'nil_activities',
        'interests',
        'products',
      ];
      const optionsPromises = entities.map(entity =>
        axios.get(`/api/${entity}`, { params: { limit: 10 } })
      );
      const optionsResponses = await Promise.all(optionsPromises);

      const options = entities.reduce((acc, entity, idx) => {
        acc[entity] = optionsResponses[idx].data.data.map((item: DropdownOption) => ({
          ...item,
          id: String(item.id),
        }));
        return acc;
      }, {} as { [key: string]: DropdownOption[] });

      setDropdownOptions(options);
    } catch (err: any) {
      console.error('Error fetching initial data:', err.message);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentUserId = (): string => {
    // Example: Retrieve from context, auth provider, etc.
    // For demonstration, returning a static ID
    return '1234';
  };

  const handleSaveSelections = async () => {
    try {
      const response = await axios.post('/api/user_selected_facets', selectedFacets);

      if (response.status === 200) {
        alert('Selections saved successfully!');
      } else {
        alert('Failed to save selections.');
      }
    } catch (error: any) {
      console.error('Error saving selections:', error.message);
      alert('An error occurred while saving selections.');
    }
  };

  if (isLoading) {
    return <div>Loading your preferences...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <StrategyLayout>
    <div className="space-y-8 p-6">
      <div>
        {/* Main content */}
        <FilterPanel
          selectedFacets={selectedFacets}
          dropdownOptions={dropdownOptions}
          setSelectedFacets={setSelectedFacets}
          setDropdownOptions={setDropdownOptions}
        />
        <button
          onClick={handleSaveSelections}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  </StrategyLayout>
  );
};

export default BrandPersonalityPage;
