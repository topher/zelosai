import { UserSelectedFacets, DropdownOption } from '@/app/types';
import { SetStateAction } from 'react';
import FilterPanel from './FilterPanel';

const BrandPersonalityForm: React.FC = () => {
  return (
    <div className="brand-personality-form">
      <h1>Brand Personality Settings</h1>
      <FilterPanel selectedFacets={{
        userId: '',
        selectedMarketingChannels: [],
        selectedMarkets: [],
        selectedIndustries: [],
        selectedVALSSegments: [],
        selectedLanguages: [],
        selectedNILActivities: [],
        selectedInterests: [],
        selectedProducts: [],
      }} dropdownOptions={{}} setSelectedFacets={function (value: SetStateAction<UserSelectedFacets>): void {
        throw new Error('Function not implemented.');
      } } setDropdownOptions={function (value: SetStateAction<{ [key: string]: DropdownOption[]; }>): void {
        throw new Error('Function not implemented.');
      } } />
    </div>
  );
};

export default BrandPersonalityForm;
