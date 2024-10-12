// HTTPConnectorForm.tsx
"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Trash2 } from "lucide-react";
import { ConnectorFormValues } from "./connectorFormSchema";
import { useEffect } from "react";

const HTTPConnectorForm = () => {
  const { control, register, formState: { errors } } = useFormContext<ConnectorFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "whitelist",
  });

  // Pre-populate dummy URLs if whitelist is empty
  useEffect(() => {
    if (fields.length === 0) {
      append({ url: "https://example.com" });
      append({ url: "https://anotherexample.com" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [append]);

  return (
    <div className="space-y-4">
      <FormLabel>URL Whitelist</FormLabel>
      
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center space-x-2 mb-2">
          <FormControl>
            <Input
              {...register(`whitelist.${index}.url` as const)}
              placeholder="https://example.com"
              className="flex-1"
              aria-label={`Whitelist URL ${index + 1}`}
            />
          </FormControl>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => remove(index)}
            aria-label={`Remove URL ${index + 1}`}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      ))}

      {/* Display errors for each whitelist URL */}
      {errors.whitelist && errors.whitelist.map((error, index) => (
        error?.url && (
          <FormMessage key={index}>{error.url.message}</FormMessage>
        )
      ))}

      <Button
        type="button"
        variant="secondary"
        onClick={() => append({ url: "https://newdummyurl.com" })} // Append a dummy URL
        className="mt-2"
      >
        Add URL
      </Button>
    </div>
  );
};

export default HTTPConnectorForm;
