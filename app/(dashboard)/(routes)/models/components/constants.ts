// components/constants.tsx

import * as z from "zod";

export const imageFormSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  subject_type: z.string().min(1, "Subject Type is required"),
  setting_location: z.string().min(1, "Setting Location is required"),
  style_theme: z.string().min(1, "Style Theme is required"),
  resolution: z.string().min(1, "Resolution is required"),
  lighting: z.string().min(1, "Lighting is required"),
  special_effects: z.string().optional(),
  narrative_tone: z.string().optional(),
  amount: z.number().min(1).max(10).default(1), // Adjust max as needed
});

export const textFormSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  speaker: z.string().min(1, "Speaker is required"),
  hearer: z.string().min(1, "Hearer is required"),
  when: z.string().min(1, "When is required"),
  where: z.string().min(1, "Where is required"),
  why: z.string().min(1, "Why is required"),
  what: z.string().min(1, "What is required"),
  amount: z.number().min(1).max(10).default(1), // Adjust max as needed
});

export const voiceFormSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  voice_id: z.string().min(1, "Voice ID is required"),
  optimize_streaming_latency: z.boolean(),
  output_format: z.string().min(1, "Output Format is required"),
  text: z.string().min(1, "Text is required"),
  stability: z.number().min(0).max(1).default(0.5),
  similarity_boost: z.number().min(0).max(1).default(0.5),
  style: z.number().min(0).max(1).default(0.5),
  amount: z.number().min(1).max(10).default(1), // Adjust max as needed
});

// Parameter definitions for different model types
export const parameterDefinitions = {
  txt2audio: [
    {
      name: "voice_id",
      label: "Voice ID",
      description: "Unique ID for selecting a pre-defined or custom voice.",
      default: "",
      type: "select",
      options: [
        { value: "pMsXgVXv3BLzUgSXRplE", label: "Voice 1" },
        { value: "voice_id_2", label: "Voice 2" },
        // Add more voices as needed
      ],
      required: true,
    },
    {
      name: "optimize_streaming_latency",
      label: "Optimize Streaming Latency",
      description:
        "Adjusts the balance between audio quality and streaming speed.\n0: Focus on quality.\n1: Focus on lower latency.",
      default: "0",
      type: "radio",
      options: [
        { value: "0", label: "Quality" },
        { value: "1", label: "Lower Latency" },
      ],
      required: false,
    },
    {
      name: "output_format",
      label: "Output Format",
      description:
        "Determines the format and quality of the audio output.",
      default: "mp3_22050_32",
      type: "select",
      options: [
        { value: "mp3_22050_32", label: "MP3 (22.05 kHz, 32 kbps)" },
        { value: "mp3_44100_64", label: "MP3 (44.1 kHz, 64 kbps)" },
        { value: "wav_44100_16", label: "WAV (44.1 kHz, 16-bit)" },
      ],
      required: true,
    },
    {
      name: "text",
      label: "Text",
      description:
        "The actual message or speech act you want converted into spoken word.",
      default: "",
      type: "textarea",
      required: true,
    },
    {
      name: "stability",
      label: "Stability",
      description:
        "Controls how consistent the voice remains over time.\nRange: 0.0 (very varied) to 1.0 (very consistent).",
      default: 0.5,
      type: "slider",
      min: 0,
      max: 1,
      step: 0.1,
      required: false,
    },
    {
      name: "similarity_boost",
      label: "Similarity Boost",
      description:
        "Enhances similarity to the original speaker's voice.\nRange: 0.0 (low similarity) to 1.0 (high similarity).",
      default: 0.5,
      type: "slider",
      min: 0,
      max: 1,
      step: 0.1,
      required: false,
    },
    {
      name: "style",
      label: "Style",
      description:
        "Determines how expressive or flat the voice sounds.\nRange: 0.0 (monotone) to 1.0 (very expressive).",
      default: 0.5,
      type: "slider",
      min: 0,
      max: 1,
      step: 0.1,
      required: false,
    },
  ],

  txt2image: [
    {
      name: "subject_type",
      label: "Subject Type",
      description:
        "Specifies the primary subject (person, object, scene) for the image.",
      default: "person",
      type: "select",
      options: [
        { value: "person", label: "Person" },
        { value: "animal", label: "Animal" },
        { value: "landscape", label: "Landscape" },
        { value: "object", label: "Object" },
        // Add more options as needed
      ],
      required: true,
    },
    {
      name: "setting_location",
      label: "Setting/Location",
      description:
        "Defines where the scene takes place.",
      default: "urban backdrop",
      type: "select",
      options: [
        { value: "urban backdrop", label: "Urban Backdrop" },
        { value: "nature", label: "Nature" },
        { value: "studio", label: "Studio" },
        { value: "indoor", label: "Indoor" },
        { value: "outdoor", label: "Outdoor" },
        // Add more options as needed
      ],
      required: true,
    },
    {
      name: "style_theme",
      label: "Style/Theme",
      description:
        "Controls the mood and look of the image.",
      default: "cinematic",
      type: "select",
      options: [
        { value: "cinematic", label: "Cinematic" },
        { value: "fashion-forward", label: "Fashion-Forward" },
        { value: "artistic", label: "Artistic" },
        { value: "realistic", label: "Realistic" },
        { value: "stylized", label: "Stylized" },
        // Add more options as needed
      ],
      required: true,
    },
    {
      name: "resolution",
      label: "Resolution",
      description:
        "Determines how detailed the image is.",
      default: "high-definition",
      type: "select",
      options: [
        { value: "4K", label: "4K" },
        { value: "8K", label: "8K" },
        { value: "high-definition", label: "High-Definition" },
        { value: "full-body", label: "Full-Body" },
        { value: "close-up", label: "Close-Up" },
      ],
      required: true,
    },
    {
      name: "lighting",
      label: "Lighting",
      description:
        "Determines the light intensity and atmosphere.",
      default: "natural lighting",
      type: "select",
      options: [
        { value: "natural lighting", label: "Natural Lighting" },
        { value: "moody", label: "Moody" },
        { value: "dramatic", label: "Dramatic" },
        { value: "soft", label: "Soft" },
        { value: "studio lighting", label: "Studio Lighting" },
      ],
      required: true,
    },
    {
      name: "special_effects",
      label: "Special Effects/Post-Processing",
      description:
        "Enhances the artistic quality of the image.",
      default: "none",
      type: "select",
      options: [
        { value: "none", label: "None" },
        { value: "film grain", label: "Film Grain" },
        { value: "HDR", label: "HDR" },
        { value: "cinematic color grading", label: "Cinematic Color Grading" },
        { value: "black and white", label: "Black and White" },
      ],
      required: false,
    },
    {
      name: "narrative_tone",
      label: "Narrative Tone",
      description:
        "Provides a context or message for the image.",
      default: "neutral",
      type: "select",
      options: [
        { value: "neutral", label: "Neutral" },
        { value: "heroic", label: "Heroic" },
        { value: "adventurous", label: "Adventurous" },
        { value: "mysterious", label: "Mysterious" },
        { value: "joyful", label: "Joyful" },
      ],
      required: false,
    },
  ],

  txt2txt: [
    {
      name: "speaker",
      label: "Speaker",
      description:
        "Indicates who is delivering the message (brand, influencer, official account, etc.).",
      default: "brand official channel",
      type: "select",
      options: [
        { value: "brand official channel", label: "Brand Official Channel" },
        { value: "Rigoberto Uran", label: "Rigoberto Uran" },
        // Add more speakers as needed
      ],
      required: true,
    },
    {
      name: "hearer",
      label: "Hearer",
      description:
        "Identifies who the message is intended for.",
      default: "general audience",
      type: "select",
      options: [
        { value: "general audience", label: "General Audience" },
        { value: "cycling enthusiasts", label: "Cycling Enthusiasts" },
        { value: "local community", label: "Local Community" },
        { value: "potential customers", label: "Potential Customers" },
      ],
      required: true,
    },
    {
      name: "when",
      label: "When",
      description:
        "Indicates when the communication happens.",
      default: "weekly",
      type: "select",
      options: [
        { value: "weekly", label: "Weekly" },
        { value: "monthly on the 1st", label: "Monthly on the 1st" },
        { value: "annually during the holiday season", label: "Annually During Holiday Season" },
        { value: "summer season", label: "Summer Season" },
        { value: "as needed", label: "As Needed" },
      ],
      required: true,
    },
    {
      name: "where",
      label: "Where",
      description:
        "Defines where the communication takes place (social media, blogs, etc.).",
      default: "social media platforms",
      type: "select",
      options: [
        { value: "social media platforms", label: "Social Media Platforms" },
        { value: "Instagram", label: "Instagram" },
        { value: "official blog", label: "Official Blog" },
        { value: "sales channel", label: "Sales Channel" },
      ],
      required: true,
    },
    {
      name: "why",
      label: "Why",
      description:
        "Indicates the reason or goal behind the message.",
      default: "to promote products",
      type: "select",
      options: [
        { value: "to promote engagement", label: "Promote Engagement" },
        { value: "to increase sales", label: "Increase Sales" },
        { value: "to build brand awareness", label: "Build Brand Awareness" },
        { value: "to boost participation", label: "Boost Participation" },
        { value: "to promote products", label: "Promote Products" },
        { value: "to share tips", label: "Share Tips" },
        { value: "to announce new features", label: "Announce New Features" },
        { value: "to motivate", label: "Motivate" },
      ],
      required: true,
    },
    {
      name: "what",
      label: "What",
      description:
        "Outlines the main topic or purpose of the communication.",
      default: "promote products",
      type: "select",
      options: [
        { value: "promote products", label: "Promote Products" },
        { value: "share tips", label: "Share Tips" },
        { value: "announce new features", label: "Announce New Features" },
        { value: "motivate", label: "Motivate" },
        // Add more options as needed
      ],
      required: true,
    },
  ],
};

// Options for generic form fields
export const amountOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
];

export const resolutionOptions = [
  { value: "512x512", label: "512x512" },
  { value: "1024x1024", label: "1024x1024" },
  { value: "2048x2048", label: "2048x2048" },
];
