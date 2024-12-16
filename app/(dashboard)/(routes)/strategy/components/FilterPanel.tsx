// /app/(dashboard)/(routes)/strategy/components/FilterPanel.tsx

import React from 'react';
import { BrandModelCard, DropdownOption } from '@/app/types';
import { Montserrat } from 'next/font/google';
import { FaFilter } from 'react-icons/fa';

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

interface FilterPanelProps {
  brandModelCards: BrandModelCard[];
  dropdownOptions: { [key: string]: DropdownOption[] };
  setBrandModelCards: React.Dispatch<React.SetStateAction<BrandModelCard[]>>;
  loading?: { [key: string]: boolean };
  error?: { [key: string]: string };
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
  loading = {},
  error = {},
}) => {
  const handleSelect = (sectionName: string, optionId: string) => {
    setBrandModelCards(prev => {
      const existingCard = prev.find(
        card => card.sectionName === sectionName && card.brandFacetId === optionId
      );
      if (existingCard) {
        // Deselect
        return prev.filter(card => !(card.sectionName === sectionName && card.brandFacetId === optionId));
      } else {
        // Select new
        return [
          ...prev,
          {
            id: `card-${sectionName}-${optionId}`,
            accountId: '12345',
            ownerId: 'user_abc123',
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

    const isLoading = loading[sectionName];
    const hasError = error[sectionName];

    return (
      <div className="mb-6" key={sectionName}>
        <div className="flex items-center mb-2">
          <FaFilter className={`text-primary mr-2`} />
          <h4 className={`text-lg font-medium text-white ${montserrat.className}`}>
            {label}
          </h4>
          <div className="flex-1 h-px bg-white/20 ml-2" />
        </div>
        {isLoading && (
          <p className="text-gray-400 italic">Loading options...</p>
        )}
        {hasError && (
          <p className="text-red-500 italic">{error[sectionName]}</p>
        )}
        {!isLoading && !hasError && options && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {options.map(option => {
              const isSelected = selectedOptions.includes(option.id);
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(sectionName, option.id)}
                  className={`
                    flex items-center justify-center px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                    ${isSelected
                      ? 'bg-primary text-white border-primary shadow-lg'
                      : 'bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600 hover:text-white hover:border-gray-500'
                    }
                  `}
                  aria-pressed={isSelected}
                >
                  {option.name}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
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
