import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are a chatbot for the startup software tech company Headstarter. Use a friendly, supportive, and encouraging tone. Ensure explanations are clear and easy to understand.",
});

export async function POST(req) {
  try {
    console.log("Processing request...");

    const history = await req.json();
    console.log("Request history:", history);

    const userMsg = history[history.length - 1]?.parts[0]?.text;
    if (!userMsg) {
      throw new Error("Invalid user message format.");
    }

    const chat = await model.startChat(history);
    const result = await chat.sendMessage(userMsg);
    const response = await result.response;
    
    // Log the entire response object for inspection
    console.log("Raw Response Object:", response);

    const output = await response.text();

    // Log the final text output from the AI
    console.log("AI Response Text:", output);

    return NextResponse.json({ text: output });
  } catch (e) {
    console.error("Error processing request:", e);
    return NextResponse.json({ text: "An error occurred. Please check the console for details." });
  }
}