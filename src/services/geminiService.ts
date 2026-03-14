import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getAIPlannerResponse(prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  try {
    const model = ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `You are an expert AI Event Planner for "Mithila Catering & Decoration Service". 
        Your goal is to help users plan their events (weddings, birthdays, corporate events, etc.).
        Business Info: Serving since 2021, 600+ events done, 4000+ happy customers.
        Services: Catering (Kitty parties, Birthday parties, Get-togethers, Weddings, Anniversaries, Bhandara, Bulk orders), Decoration, Event Management, and Tent Services.
        Coverage: All over India.
        Tone: Professional, helpful, and welcoming.
        If users ask about Tiffin services, mention they are available in Delhi, Noida, and Faridabad, but focus on event planning here.
        Keep responses concise and structured.`,
      }
    });

    const result = await model;
    return result.text || "I'm sorry, I couldn't process that. Please try again.";
  } catch (error) {
    console.error("AI Planner Error:", error);
    return "Our AI planner is currently busy. Please use the enquiry form or contact us directly!";
  }
}
