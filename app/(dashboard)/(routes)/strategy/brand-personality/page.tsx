// /brand-personality/page.tsx

'use client';

import { useEffect, useState } from 'react';
import FilterPanel from '../components/FilterPanel';
import { UserSelectedFacets, DropdownOption } from '@/app/types';
import axios from 'axios'; // Ensure Axios is installed

const BrandPersonalityPage: React.FC = () => {
  const [selectedFacets, setSelectedFacets] = useState<UserSelectedFacets>({
    userId: '',
    selectedMarketingChannels: [],
    selectedMarkets: [],
    selectedIndustries: [],
    selectedVALSSegments: [],
    selectedLanguages: [],
    selectedNILActivities: [],
    selectedInterests: [], // Corrected
    selectedProducts: [],  // Corrected
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

  /**
   * Fetch initial data including user-selected facets and initial dropdown options.
   */
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
          selectedInterests: [], // Corrected
          selectedProducts: [],  // Corrected
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
          id: String(item.id), // Convert ID to string
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

  /**
   * Mock function to get the current user's ID.
   * Replace this with your actual authentication logic.
   */
  const getCurrentUserId = (): string => {
    // Example: Retrieve from context, auth provider, etc.
    // For demonstration, returning a static ID
    return '1234';
  };

  /**
   * Handle saving of user-selected facets.
   */
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

  /**
   * Render loading and error states.
   */
  if (isLoading) {
    return <div>Loading your preferences...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="brand-personality-page">
      <h1>Brand Personality Settings</h1>
      <FilterPanel
        selectedFacets={selectedFacets}
        dropdownOptions={dropdownOptions}
        setSelectedFacets={setSelectedFacets}
        setDropdownOptions={setDropdownOptions}
      />
      <button onClick={handleSaveSelections} className="save-button">Save</button>

      <style jsx>{`
        .brand-personality-page {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        .save-button {
          padding: 10px 20px;
          margin-top: 20px;
          background-color: #1890ff;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .save-button:hover {
          background-color: #40a9ff;
        }
        .error {
          color: red;
          padding: 20px;
          background-color: #ffe6e6;
          border: 1px solid red;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default BrandPersonalityPage;
