import React, { useEffect, useState } from 'react';

interface ResourceType {
  id: string;
  name: string;
  thumbnailUrl?: string; // Add additional fields as needed
}

interface AutocompleteSelectProps {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  resourceTypes?: string[]; // Now represents resource types to fetch
  placeholder?: string;
  disabled?: boolean;
  fetchPredicates?: any;
}

const AutocompleteSelect: React.FC<AutocompleteSelectProps> = ({
  value,
  onChange,
  multiple,
  resourceTypes,
  placeholder,
  disabled = false,
}) => {
  const [options, setOptions] = useState<ResourceType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch options based on resourceTypes
  useEffect(() => {
    const fetchOptions = async () => {
      if (!resourceTypes || resourceTypes.length === 0) return;

      setLoading(true);

      try {
        // Fetch options for each resource type and combine them
        const fetchedOptions = await Promise.all(
          resourceTypes.map(async (type) => {
            const response = await fetch(`/api/resource/${type}`);
            if (!response.ok) throw new Error(`Failed to fetch ${type}`);
            const data = await response.json();
            // Assuming data.resources is an array of resources
            return data.resources.map((resource: any) => ({
              id: resource.id,
              name: resource.name || resource.title || resource.Goal || 'Unnamed',
              thumbnailUrl: resource.thumbnailUrl, // Adjust based on your resource structure
            }));
          })
        );

        // Flatten the array of arrays
        setOptions(fetchedOptions.flat());
      } catch (error) {
        console.error('Error fetching options:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [resourceTypes]);

  // Handle displaying previously selected resources
  const [selectedOptions, setSelectedOptions] = useState<ResourceType[]>([]);

  useEffect(() => {
    const fetchSelectedOptions = async () => {
      if (!value || (Array.isArray(value) && value.length === 0)) return;

      const ids = Array.isArray(value) ? value : [value];

      try {
        const fetchedSelectedOptions = await Promise.all(
          ids.map(async (id) => {
            const response = await fetch(`/api/resource/${id}`);
            if (!response.ok) throw new Error(`Failed to fetch resource with id ${id}`);
            const resource = await response.json();
            return {
              id: resource.id,
              name: resource.name || resource.title || resource.Goal || 'Unnamed',
              thumbnailUrl: resource.thumbnailUrl, // Adjust based on your resource structure
            };
          })
        );

        setSelectedOptions(fetchedSelectedOptions);
      } catch (error) {
        console.error('Error fetching selected options:', error);
      }
    };

    fetchSelectedOptions();
  }, [value]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = multiple
      ? Array.from(e.target.selectedOptions, (option) => option.value)
      : e.target.value;

    onChange(selectedValues);
  };

  return (
    <div>
      {loading ? (
        <p>Loading options...</p>
      ) : (
        <select
          value={value}
          onChange={handleSelectChange}
          multiple={multiple}
          disabled={disabled}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...(!multiple && placeholder && { 'aria-label': placeholder })}
        >
          {!multiple && placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      )}

      {/* Display selected options with thumbnails */}
      {selectedOptions.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              {option.thumbnailUrl && (
                <img src={option.thumbnailUrl} alt={option.name} className="w-6 h-6 rounded-full" />
              )}
              <span>{option.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteSelect;
