// Chip.tsx (Ensure Chip atom includes all required props)
import React from 'react';

interface ChipProps {
  label: string;
  onClick?: () => void;
  onDelete?: () => void;
  color?: 'default' | 'primary' | 'secondary';
  variant?: 'filled' | 'outlined';
  className?: string;
}

const Chip: React.FC<ChipProps> = ({ label, onClick, onDelete, color = 'default', variant = 'filled', className }) => (
  <div
    onClick={onClick}
    className={`${className} chip ${variant} ${color}`}
  >
    {label}
    {onDelete && <button onClick={onDelete} aria-label="delete">×</button>}
  </div>
);

export default Chip;
