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

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is missing"
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
      operationName: operation.name || null
    });

  } catch (error) {
    console.error("VIDEO GENERATION ERROR:", error);

    return res.status(500).json({
      error: error?.message || "Video generation failed"
    });
  }
}
