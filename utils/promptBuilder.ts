// utils/promptBuilder.ts

interface Txt2AudioParams {
    prompt?: string;
    voice_id?: string;
    optimize_streaming_latency?: string;
    output_format?: string;
    text?: string;
    stability?: number;
    similarity_boost?: number;
    style?: number;
  }
  
  interface Txt2TxtParams {
    prompt?: string;
    speaker?: string;
    hearer?: string;
    when?: string;
    where?: string;
    why?: string;
    what?: string;
  }
  
  interface Txt2ImageParams {
    prompt?: string;
    subject_type?: string;
    setting_location?: string;
    style_theme?: string;
    resolution?: string;
    lighting?: string;
    special_effects?: string;
    narrative_tone?: string;
  }
  
  export const constructVoicePrompt = (params: Txt2AudioParams): string => {
    // Construct the prompt based on parameters for voice generation
    // Modify this as per your specific requirements
    return `
      Voice Generation Parameters:
      - Voice ID: ${params.voice_id}
      - Optimize Streaming Latency: ${params.optimize_streaming_latency || "Not set"}
      - Output Format: ${params.output_format}
      - Text: ${params.text}
      - Stability: ${params.stability ?? 0.5}
      - Similarity Boost: ${params.similarity_boost ?? 0.5}
      - Style: ${params.style ?? 0.5}
  
      Generate voice based on the above parameters.
    `;
  };
  
  export const constructTextPrompt = (params: Txt2TxtParams): string => {
    // Example prompt structure for text generation
    return `
      Instructions:
      You are an AI assisting a brand in generating text for social media posts, blog entries, or other forms of brand communication, given context about a desired speech act. Your goal is to generate utterance(s) for the brand.
  
      Context:
      - Speaker: ${params.speaker}
      - Hearer: ${params.hearer}
      - When: ${params.when}
      - Where: ${params.where}
      - Why: ${params.why}
      - What: ${params.what}
  
      Use this information to guide your responses and ensure they align with the brand's objectives.
    `;
  };
  
  export const constructImagePrompt = (params: Txt2ImageParams): string => {
    // Construct the image prompt in the desired format
    return `
      High-resolution, ${params.resolution} photograph of a ${params.subject_type} (${params.subject_type}:1.1) in a ${params.setting_location}. ${params.style_theme === 'cinematic' ? 'Cinematic' : params.style_theme} style. Lighting: ${params.lighting}. ${params.special_effects ? `Special Effects: ${params.special_effects}.` : ''} ${params.narrative_tone ? `Narrative Tone: ${params.narrative_tone}.` : ''} 
    `;
  };
  