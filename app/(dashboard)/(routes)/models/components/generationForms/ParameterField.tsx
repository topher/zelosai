import React from "react";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps } from "react-hook-form"; // Add this import for proper types

// Update the options type to handle object structures
interface ParameterOption {
  value: string;
  label: string;
}

interface ParameterFieldProps {
  parameter: {
    name: string;
    label: string;
    type: string;
    options?: ParameterOption[] | string[]; // Handle both string[] and {value, label}[]
  };
}

export const ParameterField: React.FC<ParameterFieldProps> = ({ parameter }) => {
  return (
    <FormField
      name={parameter.name}
      render={({ field }: { field: ControllerRenderProps<any, string> }) => ( // Add proper typing to 'field'
        <FormItem className="flex flex-col gap-2">
          <FormLabel className="font-medium">{parameter.label}</FormLabel>
          <FormControl>
            {parameter.type === "select" && Array.isArray(parameter.options) ? (
              <select
                {...field}
                className="rounded-lg border border-gray-300 px-4 py-3 bg-white text-gray-700 focus:ring-2 focus:ring-blue-300"
              >
                {parameter.options.map((option) =>
                  typeof option === "string" ? (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ) : (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  )
                )}
              </select>
            ) : (
              <input
                type={parameter.type}
                {...field}
                className="rounded-lg border border-gray-300 px-4 py-3 bg-white text-gray-700 focus:ring-2 focus:ring-blue-300"
              />
            )}
          </FormControl>
        </FormItem>
      )}
    />
  );
};
