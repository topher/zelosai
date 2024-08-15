import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useRef } from "react";
import { Table } from "@tanstack/react-table"; // Import the correct Table type

interface SelectAllCheckboxProps {
  table: Table<any>; // Replace 'any' with your actual row data type if available
}

function SelectAllCheckbox({ table }: SelectAllCheckboxProps) {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = table.getIsSomePageRowsSelected();
    }
  }, [table]);

  return (
    <Checkbox
      ref={checkboxRef as any} // Type assertion to silence the type error
      checked={table.getIsAllPageRowsSelected()}
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
      className="translate-y-[2px]"
    />
  );
}

export default SelectAllCheckbox;
