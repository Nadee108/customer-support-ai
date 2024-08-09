import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are a chatbot for the startup software tech company Headstarter. Use a friendly, supportive, and encouraging tone. Ensure explanations are clear and easy to understand.",
});

async function startChat(history) {
  return model.startChat({
    history: history,
    generationConfig: {
      maxOutputTokens: 50,
    },
  });
}

export async function POST(req) {
  try {
    const history = await req.json();
    const userMsg = history[history.length - 1]?.parts[0]?.text;

    if (!userMsg) {
      throw new Error("Invalid user message format.");
    }

    const chat = await startChat(history);
    const result = await chat.sendMessage(userMsg);
    const response = await result.response;
    const output = await response.text();

    return NextResponse.json({ text: output });
  } catch (e) {
    console.error("Error processing request:", e);
    return NextResponse.json({ text: "An error occurred. Please check the console for details." });
  }
}
