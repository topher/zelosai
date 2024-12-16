// connector-form.tsx
"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { connectorFormSchema, ConnectorFormValues, connectorTypes } from "./connectorFormSchema";
import HTTPConnectorForm from "./HTTPConnectorForm";
import { createConnector, updateConnector } from "@/app/actions/connectorsActions";
import { useEffect } from "react";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';
import { DataConnector } from "@/app/types";

const generateId = () => uuidv4();
const getAccountId = () => "your-account-id"; // Replace with actual logic

interface ConnectorFormProps {
  initialMetadata: Partial<ConnectorFormValues> & { id?: string };
  onSubmit: (data: ConnectorFormValues) => void;
  isUpdate?: boolean;
}

export const ConnectorForm: React.FC<ConnectorFormProps> = ({
  initialMetadata,
  onSubmit,
  isUpdate = false,
}) => {
  const methods = useForm<ConnectorFormValues>({
    resolver: zodResolver(connectorFormSchema),
    defaultValues: initialMetadata,
  });

  const { register, handleSubmit, watch, formState: { errors } } = methods;

  const selectedType = watch("type");

  const handleFormSubmit = async (data: ConnectorFormValues) => {
    const completeData = {
      ...data,
      id: isUpdate ? initialMetadata.id : generateId(),
      accountId: getAccountId(),
      name: data.name || "Default Name",
      connectionType: mapFormTypeToConnectionType(data.type),
      whitelist: data.whitelist?.map(item => item.url) || [],
    };

    if (isUpdate) {
      await updateConnector(initialMetadata.id as string, completeData);
    } else {
      await createConnector(completeData);
    }
    onSubmit(data);
  };

  // Helper to map form type to connectionType
  const mapFormTypeToConnectionType = (type: ConnectorFormValues["type"]): DataConnector["connectionType"] => {
    const mapping: Record<ConnectorFormValues["type"], DataConnector["connectionType"]> = {
      email_marketing: "Email Marketing",
      api_key: "API",
      social_media: "Social Media",
      http: "HTTP",
    };
    return mapping[type];
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Connector Type Selection */}
        <FormLabel htmlFor="type">Connector Type</FormLabel>
        <FormControl>
          <Select
            {...register("type")}
            defaultValue={initialMetadata.type || ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select connector type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email_marketing">Email Marketing</SelectItem>
              <SelectItem value="api_key">API Key</SelectItem>
              <SelectItem value="social_media">Social Media</SelectItem>
              <SelectItem value="http">HTTP</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
        {errors.type && <FormMessage>{errors.type.message}</FormMessage>}

        {/* Conditional Fields Based on Connector Type */}
        {selectedType === "email_marketing" && (
          <>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormControl>
              <Input
                {...register("email")}
                type="email"
                placeholder="Enter email address"
              />
            </FormControl>
            {errors.email && <FormMessage>{errors.email.message}</FormMessage>}

            <FormLabel htmlFor="api_key">API Key</FormLabel>
            <FormControl>
              <Input
                {...register("api_key")}
                type="password"
                placeholder="Enter API Key"
              />
            </FormControl>
            {errors.api_key && <FormMessage>{errors.api_key.message}</FormMessage>}
          </>
        )}

        {selectedType === "api_key" && (
          <>
            <FormLabel htmlFor="api_key">API Key</FormLabel>
            <FormControl>
              <Input
                {...register("api_key")}
                type="password"
                placeholder="Enter API Key"
              />
            </FormControl>
            {errors.api_key && <FormMessage>{errors.api_key.message}</FormMessage>}
          </>
        )}

        {selectedType === "social_media" && (
          <>
            <FormLabel htmlFor="username">Username</FormLabel>
            <FormControl>
              <Input
                {...register("username")}
                type="text"
                placeholder="Enter username"
              />
            </FormControl>
            {errors.username && <FormMessage>{errors.username.message}</FormMessage>}

            <FormLabel htmlFor="password">Password</FormLabel>
            <FormControl>
              <Input
                {...register("password")}
                type="password"
                placeholder="Enter password"
              />
            </FormControl>
            {errors.password && <FormMessage>{errors.password.message}</FormMessage>}
          </>
        )}

        {selectedType === "http" && <HTTPConnectorForm />}

        {/* Submit Button */}
        <Button type="submit" className="mt-4">
          {isUpdate ? "Update Connector" : "Save Connector"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default ConnectorForm;
