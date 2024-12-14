// /app/(dashboard)/(routes)/strategy/branding/page.tsx

"use client";

import { useEffect, useState } from 'react';
import FilterPanel from '../components/FilterPanel';
import { BrandModelCard, DropdownOption } from '@/app/types';
import axios from 'axios';
import SmartFormLayout from '@/app/components/atomic/templates/SmartFormLayout';

const BrandPersonalityPage: React.FC = () => {
  const [brandModelCards, setBrandModelCards] = useState<BrandModelCard[]>([]);
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
    products: [],
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      // Fetch the user's selected brand model cards
      const cardsResponse = await axios.get(`/api/resource/brand_model_cards`);

      if (cardsResponse.status === 200) {
        const cardsData: BrandModelCard[] = cardsResponse.data.resources;
        setBrandModelCards(cardsData);
      } else {
        console.error('Failed to fetch brand model cards');
        setError('Failed to fetch your selections. Please try again later.');
      }

      // Fetch dropdown options for all categories (limit 10)
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

  const handleSaveSelections = async () => {
    try {
      const response = await axios.post('/api/resource/brand_model_cards', brandModelCards);

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
    <SmartFormLayout
      header={{
        title: "Brand Identity",
        description: "Customize your brand's personality traits.",
      }}
      isLoading={isLoading}
      error={error}
    >
      {/* Main content */}
      <FilterPanel
        brandModelCards={brandModelCards}
        dropdownOptions={dropdownOptions}
        setBrandModelCards={setBrandModelCards}
      />
    </SmartFormLayout>
  );
};

export default BrandPersonalityPage;
