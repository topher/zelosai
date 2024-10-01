// /components/Dropdown.tsx

import { useState, useEffect, useRef } from 'react';
import { DropdownOption } from '@/app/types';

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  onDropdownOpen: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options = [], // Default to empty array
  selected,
  onChange,
  onDropdownOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm(''); // Reset search on close
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    if (!isOpen) {
      onDropdownOpen();
    }
    setIsOpen(!isOpen);
  };

  const handleSelect = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter(item => item !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter options based on search term
  const filteredOptions = options?.filter(option => {
    const optionName = typeof option.name === 'string' ? option.name : '';
    const search = typeof searchTerm === 'string' ? searchTerm : '';
    return optionName.toLowerCase().includes(search.toLowerCase());
  }) || []; // Ensure it's an array

  return (
    <div className="dropdown" ref={dropdownRef}>
      <label>{label}</label>
      <div className="dropdown-trigger" onClick={toggleDropdown}>
        {selected.length
          ? options
              .filter(o => selected.includes(o.id))
              .map(o => o.name)
              .join(', ')
          : 'Select...'}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="dropdown-search"
          />
          <div className="dropdown-options">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => (
                <div
                  key={option.id}
                  className={`dropdown-item ${selected.includes(option.id) ? 'selected' : ''}`}
                  onClick={() => handleSelect(option.id)}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(option.id)}
                    readOnly
                  />
                  {option.name}
                </div>
              ))
            ) : (
              <div className="dropdown-no-options">No options found</div>
            )}
          </div>
        </div>
      )}
      <style jsx>{`
        .dropdown {
          position: relative;
          margin-bottom: 20px;
        }
        .dropdown-trigger {
          padding: 10px;
          border: 1px solid #ccc;
          cursor: pointer;
          border-radius: 4px;
          background-color: #fff;
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          border: 1px solid #ccc;
          background-color: #fff;
          z-index: 1000;
          max-height: 300px;
          overflow-y: auto;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
        .dropdown-search {
          width: 100%;
          padding: 8px;
          border: none;
          border-bottom: 1px solid #eee;
          outline: none;
        }
        .dropdown-options {
          max-height: 250px;
          overflow-y: auto;
        }
        .dropdown-item {
          padding: 8px 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .dropdown-item:hover {
          background-color: #f5f5f5;
        }
        .dropdown-item.selected {
          background-color: #e6f7ff;
        }
        .dropdown-no-options {
          padding: 8px 10px;
          color: #999;
        }
      `}</style>
    </div>
  );
};

export default Dropdown;
