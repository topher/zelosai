"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createConnector, updateConnector } from "@/app/actions/connectorsActions"; // Import the actions

// Define Zod schema for core connector fields (email, api_key)
const connectorFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }).nonempty(), // Use nonempty for required field
  api_key: z.string().nonempty().refine((val) => val !== "", {
    message: "Please enter your API Key.",
    path: ["api_key"], // Specify error path for custom message
  }),
});

// Define type for connector form values
type ConnectorFormValues = z.infer<typeof connectorFormSchema>;

export const ConnectorForm = ({
  initialMetadata,
  onSubmit,
  isUpdate = false,
}: {
  initialMetadata: Partial<ConnectorFormValues>;
  onSubmit: (data: ConnectorFormValues) => void;
  isUpdate?: boolean; // For distinguishing between create and update
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ConnectorFormValues>({
    resolver: zodResolver(connectorFormSchema),
    defaultValues: initialMetadata,
  });

  const handleFormSubmit = async (data: ConnectorFormValues) => {
    if (isUpdate) {
      await updateConnector(initialMetadata.id as string, data); // Update existing connector
    } else {
      await createConnector(data); // Create new connector
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {/* Email Field */}
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input {...register("email")} type="email" placeholder="Enter email address" />
        {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
      </FormControl>

      {/* API Key Field */}
      <FormControl>
        <FormLabel htmlFor="api_key">API Key</FormLabel>
        <Input {...register("api_key")} type="password" placeholder="Enter API Key" />
        {errors.api_key && <FormMessage>{errors.api_key.message}</FormMessage>}
      </FormControl>

      {/* Submit Button */}
      <Button type="submit">{isUpdate ? "Update Connector" : "Save Connector"}</Button>
    </form>
  );
};
