// molecules/MessageTypeNav.tsx

import React from 'react';
import CustomRefinementList from '@/app/components/atomic/molecules/CustomRefinementList';

interface MessageTypeNavProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  messageTypes?: { label: string; value: string }[]; // Make message types customizable
}

// Default message types if none are provided
const defaultMessageTypes = [
  { label: 'Text', value: 'text' },
  { label: 'Email', value: 'email' },
  { label: 'Notification', value: 'notification' },
];

export function MessageTypeNav({
  selectedType,
  onTypeChange,
  messageTypes = defaultMessageTypes,
}: MessageTypeNavProps) {
  const items = messageTypes.map((type) => ({
    ...type,
    isSelected: selectedType === type.value,
  }));

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Message Type</h3>
      <CustomRefinementList items={items} onToggle={onTypeChange} />
    </div>
  );
}

export default MessageTypeNav;
