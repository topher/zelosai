import { Button } from '@/app/components/ui/button';
import { PlusIcon, TrashIcon } from 'lucide-react';
import React from 'react';
import { useFieldArray, Control, Controller, ControllerRenderProps, FieldValues } from 'react-hook-form';

interface ConditionGroupComponentProps {
  control: Control<any>;
  name: string;
}

const ConditionGroupComponent: React.FC<ConditionGroupComponentProps> = ({
  control,
  name,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${name}.conditions`,
  });

  return (
    <div className="ml-4 border-l pl-4">
      <div className="flex items-center space-x-2 mb-2">
        <label>Operator:</label>
        <Controller
          control={control}
          name={`${name}.operator`}
          render={({ field }: { field: ControllerRenderProps<FieldValues, string> }) => (
            <select {...field} className="border p-2 rounded">
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>
          )}
        />
      </div>
      <ul className="list-disc list-inside">
        {fields.map((fieldItem, index) => (
          <li key={fieldItem.id} className="mb-2">
            {/* Check if the current item is a group or a condition */}
            {'type' in fieldItem && fieldItem.type === 'group' ? (
              <ConditionGroupComponent
                control={control}
                name={`${name}.conditions.${index}`}
              />
            ) : (
              <div className="flex items-center space-x-2 mt-2">
                <input
                  placeholder="Attribute"
                  {...control.register(`${name}.conditions.${index}.attribute` as const)}
                  className="border p-2 rounded"
                />
                <input
                  placeholder="Operator"
                  {...control.register(`${name}.conditions.${index}.operator` as const)}
                  className="border p-2 rounded"
                />
                <input
                  placeholder="Value"
                  {...control.register(`${name}.conditions.${index}.value` as const)}
                  className="border p-2 rounded"
                />
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => remove(index)}
                  className="flex items-center space-x-1"
                >
                  <TrashIcon className="w-4 h-4" />
                  <span>Remove</span>
                </Button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="flex space-x-2 mt-2">
        <Button
          variant="secondary"
          type="button"
          onClick={() =>
            append({
              type: 'condition',
              attribute: '',
              operator: '',
              value: '',
            })
          }
          className="flex items-center space-x-2"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Add Condition</span>
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() =>
            append({
              type: 'group',
              operator: 'AND',
              conditions: [],
            })
          }
          className="flex items-center space-x-2"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Add Condition Group</span>
        </Button>
      </div>
    </div>
  );
};

export default ConditionGroupComponent;
