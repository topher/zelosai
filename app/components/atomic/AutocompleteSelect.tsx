import React, { useEffect, useState, useRef, forwardRef } from "react";
import debounce from "lodash.debounce";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import { Predicate } from "@/app/types";
import { predicates } from "@/config/predicates";
import { LucideIcon } from "lucide-react";
import { profileTypeToResourceType } from "@/utils/profileTypeToResourceType";
import { getIconComponent } from '@/utils/getIconComponent';
import { searchPredicates } from '@/lib/predicateService';

interface AutocompleteSelectProps {
  multiple: boolean;
  resourceTypes: string[];
  placeholder: string;
  disabled: boolean;
  fetchPredicates: boolean;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  maxSelection?: number;
  icons?: boolean;
  profileType?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  name?: string;
}

const AutocompleteSelect = forwardRef<
  HTMLInputElement,
  AutocompleteSelectProps
>(
  (
    {
      multiple,
      resourceTypes,
      placeholder,
      disabled = false,
      fetchPredicates = false,
      value,
      onChange,
      maxSelection,
      icons = false,
      profileType,
      onBlur,
      name,
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState<Predicate[]>([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const resourceType = profileTypeToResourceType(profileType || "");

    // Debounced fetch function
    const debouncedFetch = React.useMemo(
      () =>
        debounce(async (query: string) => {
          setLoading(true);
          try {
            const options = await searchPredicates(query, resourceType);
            setOptions(options);
          } catch (error) {
            console.error("Error fetching predicates:", error);
            toast.error("An unexpected error occurred.");
          } finally {
            setLoading(false);
          }
        }, 300),
      [resourceType]
    );

    useEffect(() => {
      if (fetchPredicates) {
        debouncedFetch(inputValue);
      }
    }, [inputValue, fetchPredicates, debouncedFetch]);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setShowDropdown(false);
        }
      };

      if (showDropdown) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [showDropdown]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      setShowDropdown(true);
    };

    const handleOptionClick = (optionId: string) => {
      if (multiple) {
        let newValue: string[] = Array.isArray(value) ? [...value] : [];
        if (!newValue.includes(optionId)) {
          if (maxSelection && newValue.length >= maxSelection) {
            toast.error(`You can select up to ${maxSelection} options.`);
            return;
          }
          newValue.push(optionId);
          onChange(newValue);
        }
      } else {
        onChange(optionId);
      }
      setInputValue("");
      setShowDropdown(false);
    };

    const handleRemoveChip = (optionId: string) => {
      if (multiple) {
        let newValue: string[] = Array.isArray(value) ? [...value] : [];
        newValue = newValue.filter((id) => id !== optionId);
        onChange(newValue);
      } else {
        onChange("");
      }
    };

    const renderOption = (option: Predicate) => {
      const IconComponent = getIconComponent(option.icon);
    
      return (
        <li
          key={option.id}
          onClick={() => handleOptionClick(option.id)}
          className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center"
        >
          {icons && IconComponent && (
            <IconComponent className="w-4 h-4 mr-2 text-gray-500" />
          )}
          <span>{option.label}</span>
        </li>
      );
    };

    const renderChips = () => {
      if (multiple && Array.isArray(value)) {
        return value.map((val) => {
          const option = predicates[val];
          if (!option) return null;
          const IconComponent: LucideIcon | undefined =
            typeof option.icon === 'function' ? option.icon : undefined;

          return (
            <div
              key={val}
              className="flex items-center bg-blue-500 text-white px-2 py-1 rounded-full mr-2 mt-2"
            >
              {icons && IconComponent && (
                <IconComponent className="w-4 h-4 mr-1 text-white" />
              )}
              <span>{option.label}</span>
              {!disabled && (
                <X
                  className="w-4 h-4 ml-1 cursor-pointer"
                  onClick={() => handleRemoveChip(val)}
                />
              )}
            </div>
          );
        });
      } else if (!multiple && typeof value === "string") {
        const option = predicates[value];
        if (!option) return null;
        const IconComponent: LucideIcon | undefined =
          typeof option.icon === 'function' ? option.icon : undefined;

        return (
          <div className="flex items-center bg-blue-500 text-white px-2 py-1 rounded-full mr-2 mt-2">
            {icons && IconComponent && (
              <IconComponent className="w-4 h-4 mr-1 text-white" />
            )}
            <span>{option.label}</span>
            {!disabled && (
              <X
                className="w-4 h-4 ml-1 cursor-pointer"
                onClick={() => handleRemoveChip(value)}
              />
            )}
          </div>
        );
      }
      return null;
    };

    return (
      <div className="relative" ref={containerRef}>
        {renderChips()}
        {!disabled && (
          <input
            type="text"
            ref={ref}
            name={name}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            onFocus={() => {
              setShowDropdown(true);
              if (options.length === 0) {
                debouncedFetch(inputValue);
              }
            }}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
          />
        )}
        {loading && (
          <p className="absolute top-full left-0 mt-1 text-sm text-gray-500">
            Loading...
          </p>
        )}
        {!disabled && showDropdown && options.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
            {options.map((option) => renderOption(option))}
          </ul>
        )}
        {!disabled && showDropdown && !loading && options.length === 0 && (
          <p className="absolute top-full left-0 mt-1 text-sm text-gray-500">
            No options found.
          </p>
        )}
      </div>
    );
  }
);

export default AutocompleteSelect;
