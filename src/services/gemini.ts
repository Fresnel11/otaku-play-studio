import { GoogleGenerativeAI } from "@google/generative-ai";

// Transforme une description simple en prompt artistique détaillé
export const enhancePromptWithGemini = async (
  userPrompt: string,
  style: string,
  apiKey: string
): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);

    // Modèles gratuits accessibles au niveau “Sans frais”
    let model = genAI.getGenerativeModel({ model: "gemini-1.0" });

    const styleInstructions = {
      anime: "anime style, 2d, vibrant colors, studio ghibli inspired, high quality",
      "3d": "3d render, pixar style, cute, kawaii, octane render, 8k, soft lighting",
      pixel: "pixel art, 16-bit, retro game style, vibrant",
      realistic: "photorealistic, cinematic lighting, 8k, highly detailed, portrait",
    };

    const instruction =
      styleInstructions[style as keyof typeof styleInstructions] ||
      styleInstructions.anime;

    const prompt = `You are an expert AI art prompt engineer.
Convert the following simple description into a highly detailed, artistic image generation prompt suitable for Stable Diffusion or Midjourney.

User Description: "${userPrompt}"
Target Style: ${instruction}

Rules:
1. Keep it under 40 words.
2. Focus on visual details (lighting, texture, composition).
3. Output ONLY the prompt, no other text.
4. Make it sound epic and premium.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text.trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback si tout échoue
    return `${userPrompt}, ${style} style, high quality, 8k`;
  }
};

// Génère l’URL de l’avatar via Pollinations.ai
export const generateAvatarUrl = (enhancedPrompt: string): string => {
  const encodedPrompt = encodeURIComponent(enhancedPrompt);
  const seed = Math.floor(Math.random() * 10000); // pour varier les images
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?seed=${seed}&width=512&height=512&nologo=true`;
};
