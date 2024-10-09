// FilterPanel.tsx
import React from 'react';
import { UserSelectedFacets, DropdownOption } from '@/app/types';

interface FilterPanelProps {
  selectedFacets: UserSelectedFacets;
  dropdownOptions: { [key: string]: DropdownOption[] };
  setSelectedFacets: React.Dispatch<React.SetStateAction<UserSelectedFacets>>;
  setDropdownOptions: React.Dispatch<React.SetStateAction<{ [key: string]: DropdownOption[] }>>;
}

const dropdownKeysMap: { [key in keyof UserSelectedFacets]: string } = {
  selectedMarketingChannels: 'marketing_channels',
  selectedMarkets: 'geographic_markets',
  selectedIndustries: 'industries',
  selectedVALSSegments: 'vals_segments',
  selectedLanguages: 'languages',
  selectedNILActivities: 'nil_activities',
  selectedInterests: 'interests',
  selectedProducts: 'products',
  userId: ''
};

const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedFacets,
  dropdownOptions,
  setSelectedFacets,
  setDropdownOptions,
}) => {
  const handleSelect = (facetName: keyof UserSelectedFacets, optionId: string) => {
    setSelectedFacets(prev => {
      const currentSelections = prev[facetName] as string[];
      if (currentSelections.includes(optionId)) {
        // Remove the selection
        return {
          ...prev,
          [facetName]: currentSelections.filter(id => id !== optionId),
        };
      } else {
        // Add the selection
        return {
          ...prev,
          [facetName]: [...currentSelections, optionId],
        };
      }
    });
  };

  const renderFacet = (facetName: keyof UserSelectedFacets, label: string) => {
    const optionsKey = dropdownKeysMap[facetName];
    const options = dropdownOptions[optionsKey];
    const selectedOptions = selectedFacets[facetName] as string[];

    if (!options) {
      return null; // Or display a loading indicator or message
    }

    return (
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-2">{label}</h4>
        <div className="flex flex-wrap gap-2">
          {options.map(option => {
            const isSelected = selectedOptions.includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(facetName, option.id)}
                className={`px-3 py-1 rounded-full border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-200 text-gray-800 border-gray-200'
                } hover:bg-blue-500 hover:text-white transition-colors duration-200`}
              >
                {option.name}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderFacet('selectedMarketingChannels', 'Marketing Channels')}
      {renderFacet('selectedMarkets', 'Geographic Markets')}
      {renderFacet('selectedIndustries', 'Industries')}
      {renderFacet('selectedVALSSegments', 'VALS Segments')}
      {renderFacet('selectedLanguages', 'Languages')}
      {renderFacet('selectedNILActivities', 'NIL Activities')}
      {renderFacet('selectedInterests', 'Interests')}
      {renderFacet('selectedProducts', 'Products')}
    </div>
  );
};

export default FilterPanel;
