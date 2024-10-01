// /components/FilterPanel.tsx

import { useState } from 'react';
import Dropdown from './Dropdown';
import { UserSelectedFacets, DropdownOption } from '@/app/types';
import axios from 'axios';

interface FilterPanelProps {
  selectedFacets: UserSelectedFacets;
  dropdownOptions: { [key: string]: DropdownOption[] };
  setSelectedFacets: React.Dispatch<React.SetStateAction<UserSelectedFacets>>;
  setDropdownOptions: React.Dispatch<React.SetStateAction<{ [key: string]: DropdownOption[] }>>;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedFacets,
  dropdownOptions,
  setSelectedFacets,
  setDropdownOptions,
}) => {
  const handleDropdownOpen = async (category: string) => {
    const currentOptions = dropdownOptions[category];

    if (!currentOptions) {
      console.error(`Dropdown options for category "${category}" are undefined.`);
      return;
    }

    if (currentOptions.length < 100) { // Adjust the threshold as needed
      try {
        const response = await axios.get(`/api/${category}`, { params: { limit: 10000 } }); // Fetch all for large datasets
        if (response.status === 200) {
          const data: DropdownOption[] = response.data.data.map((item: DropdownOption) => ({
            ...item,
            id: String(item.id), // Ensure ID is a string
          }));
          setDropdownOptions(prev => ({
            ...prev,
            [category]: data,
          }));
        } else {
          console.error(`Failed to fetch ${category}`);
        }
      } catch (error: any) {
        console.error(`Error fetching ${category}:`, error.message);
      }
    }
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

  return (
    <div className="filter-panel">
      <Dropdown
        label="Marketing Channels"
        options={dropdownOptions.marketing_channels}
        selected={selectedFacets.selectedMarketingChannels}
        onChange={(selected) =>
          setSelectedFacets(prev => ({
            ...prev,
            selectedMarketingChannels: selected,
          }))
        }
        onDropdownOpen={() => handleDropdownOpen('marketing_channels')}
      />
      <Dropdown
        label="Geographic Markets"
        options={dropdownOptions.geographic_markets}
        selected={selectedFacets.selectedMarkets}
        onChange={(selected) =>
          setSelectedFacets(prev => ({
            ...prev,
            selectedMarkets: selected,
          }))
        }
        onDropdownOpen={() => handleDropdownOpen('geographic_markets')}
      />
      <Dropdown
        label="Industries"
        options={dropdownOptions.industries}
        selected={selectedFacets.selectedIndustries}
        onChange={(selected) =>
          setSelectedFacets(prev => ({
            ...prev,
            selectedIndustries: selected,
          }))
        }
        onDropdownOpen={() => handleDropdownOpen('industries')}
      />
      <Dropdown
        label="VALS Segments"
        options={dropdownOptions.vals_segments}
        selected={selectedFacets.selectedVALSSegments}
        onChange={(selected) =>
          setSelectedFacets(prev => ({
            ...prev,
            selectedVALSSegments: selected,
          }))
        }
        onDropdownOpen={() => handleDropdownOpen('vals_segments')}
      />
      <Dropdown
        label="Languages"
        options={dropdownOptions.languages}
        selected={selectedFacets.selectedLanguages}
        onChange={(selected) =>
          setSelectedFacets(prev => ({
            ...prev,
            selectedLanguages: selected,
          }))
        }
        onDropdownOpen={() => handleDropdownOpen('languages')}
      />
      <Dropdown
        label="NIL Activities"
        options={dropdownOptions.nil_activities}
        selected={selectedFacets.selectedNILActivities}
        onChange={(selected) =>
          setSelectedFacets(prev => ({
            ...prev,
            selectedNILActivities: selected,
          }))
        }
        onDropdownOpen={() => handleDropdownOpen('nil_activities')}
      />

      {/* New Dropdowns for Interests and Products */}
      <Dropdown
        label="Interests"
        options={dropdownOptions.interests}
        selected={selectedFacets.selectedInterests}
        onChange={(selected) =>
          setSelectedFacets(prev => ({
            ...prev,
            selectedInterests: selected,
          }))
        }
        onDropdownOpen={() => handleDropdownOpen('interests')}
      />
      <Dropdown
        label="Products"
        options={dropdownOptions.products}
        selected={selectedFacets.selectedProducts}
        onChange={(selected) =>
          setSelectedFacets(prev => ({
            ...prev,
            selectedProducts: selected,
          }))
        }
        onDropdownOpen={() => handleDropdownOpen('products')}
      />
    </div>
  );
};

export default FilterPanel;
