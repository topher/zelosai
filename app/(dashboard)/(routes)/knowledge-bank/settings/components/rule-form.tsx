'use client'
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { ChevronDownIcon } from 'lucide-react';
import { z } from 'zod';

const accessRightsSchema = z.object({
  subject: z.enum(['asset', 'user']),
  attribute: z.string(),
  operator: z.enum(['is', 'contains', 'starts_with', "manifested by"]),
  value: z.enum(['Private Info', 'Training Data', 'Raw Data', "Creative Work", "Audio", "Video", "Image"]),
  duty: z.enum(['permit', 'restrict']),
  action: z.enum(['copy', 'delete']),
  target: z.enum(['user', 'asset']),
});

const presetLists = {
  subject: ['asset', 'user'],
  operator: ['is', 'contains', 'starts_with', "manifested by"],
  value: ['Private Info', 'Training Data', 'Raw Data', "Creative Work", "Audio", "Video", "Image"],
  duty: ['permit', 'restrict'],
  action: ['copy', 'delete'],
  target: ['user', 'asset'],
};

type PresetField = keyof typeof presetLists;

const AccessRightsForm = () => {
  const [accessRights, setAccessRights] = useState({
    subject: '',
    attribute: '',
    operator: '',
    value: '',
    duty: '',
    action: '',
    target: '',
  });

  const form = useForm({
    resolver: zodResolver(accessRightsSchema),
    defaultValues: accessRights,
  });

  const onSubmit = (data: any) => {
    console.log('Submitted access rights:', data);
  };

  // Helper function to create the form item JSX element
  const createFormItem = (field: PresetField, options: string[]) => (
    <FormItem key={field}>
      <FormLabel>{field}</FormLabel>
      <div className="relative w-max">
        <FormControl>
          <select
            className="w-[200px] appearance-none font-normal"
            {...form.register(field)}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </FormControl>
        <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
      </div>
      <FormDescription>
        Select the {field} for access rights.
      </FormDescription>
      <FormMessage />
    </FormItem>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <FormLabel>Subject</FormLabel>
          <div className="relative w-max">
            <FormControl>
              <select
                className="w-[200px] appearance-none font-normal"
                {...form.register('subject')}
              >
                {presetLists.subject.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </FormControl>
            <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
          </div>
          <FormDescription>
            Select the subject you want to set access rights for.
          </FormDescription>
          <FormMessage />
        </FormItem>

        {/* Iterate over presetLists and call createFormItem for each field and options */}
        {Object.entries(presetLists).map(([field, options]: [string, string[]]) =>
          createFormItem(field as PresetField, options) // Type assertion
        )}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AccessRightsForm;
