import React from 'react';
import { BrandModelCard, DropdownOption } from '@/app/types';

interface FilterPanelProps {
  brandModelCards: BrandModelCard[];
  dropdownOptions: { [key: string]: DropdownOption[] };
  setBrandModelCards: React.Dispatch<React.SetStateAction<BrandModelCard[]>>;
}

const sectionMapping: { [key: string]: string } = {
  selectedMarketingChannels: 'marketing_channels',
  selectedMarkets: 'geographic_markets',
  selectedIndustries: 'industries',
  selectedVALSSegments: 'vals_segments',
  selectedLanguages: 'languages',
  selectedNILActivities: 'nil_activities',
  selectedInterests: 'interests',
  selectedProducts: 'products',
};

const FilterPanel: React.FC<FilterPanelProps> = ({
  brandModelCards,
  dropdownOptions,
  setBrandModelCards,
}) => {
  const handleSelect = (sectionName: string, optionId: string) => {
    setBrandModelCards(prev => {
      const existingCard = prev.find(
        card => card.sectionName === sectionName && card.brandFacetId === optionId
      );

      if (existingCard) {
        // Remove the selection if it's already selected
        return prev.filter(card => !(card.sectionName === sectionName && card.brandFacetId === optionId));
      } else {
        // Add the new selection as a card
        return [
          ...prev,
          {
            id: `card-${sectionName}-${optionId}`,
            accountId: '12345', // Adjust as needed
            ownerId: 'user_abc123', // Adjust as needed
            resourceType: 'BrandModelCard',
            sectionName,
            brandFacetId: optionId,
            createdAt: new Date(),
            updatedAt: new Date(),
            visibility: 'public',
          },
        ];
      }
    });
  };

  const renderFacet = (sectionName: string, label: string) => {
    const options = dropdownOptions[sectionMapping[sectionName]];
    const selectedOptions = brandModelCards
      .filter(card => card.sectionName === sectionName)
      .map(card => card.brandFacetId);

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
                onClick={() => handleSelect(sectionName, option.id)}
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
