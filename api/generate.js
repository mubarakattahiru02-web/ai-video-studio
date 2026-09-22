import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { prompt } = req.body || {};

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required"
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });

    const operation = await ai.models.generateVideos({
      model: "veo-3.1-generate-preview",
      prompt: prompt
    });

    return res.status(200).json({
      success: true,
      message: "Video generation started.",
      operation: operation
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message || "Video generation failed"
    });
  }
}
