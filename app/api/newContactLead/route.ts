import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import Airtable from 'airtable';

const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;
const tableName = 'NewLeads'; // Your Airtable table name

const base = new Airtable({ apiKey }).base(baseId);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Validate form data
    if (!formData.firstName || !formData.lastName || !formData.email) {
      return NextResponse.json(
        { error: 'Please provide first name, last name, and email.' },
        { status: 400 }
      );
    }

    // Check if the email already exists in Airtable
    const existingRecords = await base(tableName).select({
      filterByFormula: `{email} = "${formData.email}"`,
    }).firstPage();

    if (existingRecords.length > 0) {
      return NextResponse.json(
        { error: 'This email is already in use. Please use a different email.' },
        { status: 400 }
      );
    }

    // Create a new record in Airtable
    const records = await base(tableName).create([
      {
        fields: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone || '',
          agreePrivacy: formData.agreePrivacy || false,
          agreeCommunication: formData.agreeCommunication || false,
        },
      },
    ]);

    // Return success response
    return NextResponse.json({ message: 'Contact information submitted successfully.', records });

  } catch (error) {
    console.error('Error creating record:', error);
    return NextResponse.json(
      { error: 'An error occurred while submitting contact information.' },
      { status: 500 }
    );
  }
}
