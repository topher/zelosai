// connectorFormSchema.ts
import * as z from "zod";

// Define connector types
export const connectorTypes = z.enum(["email_marketing", "api_key", "social_media", "http"]);

// Unified schema with conditional fields
export const connectorFormSchema = z.object({
  name: z.string().min(1, "Name is required."),
  type: connectorTypes,
  email: z.string().email({ message: "Please enter a valid email address." }).optional(),
  api_key: z.string().min(1, "API Key is required.").optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  whitelist: z
    .array(
      z.object({
        url: z.string().url("Invalid URL format"),
      })
    )
    .optional(),
});

export type ConnectorFormValues = z.infer<typeof connectorFormSchema>;
export type HTTPConnectorFormValues = z.infer<typeof connectorFormSchema>; // Adjust if needed
