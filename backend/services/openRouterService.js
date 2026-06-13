import axios from "axios";
import askGemini from "./geminiService.js";

const askAI = async (prompt) => {
  const models = [
    "meta-llama/llama-3.3-70b-instruct:free",
    "liquid/lfm-2.5-1.2b-instruct:free",
    "openrouter/free"
  ];

  for (const model of models) {
    try {
      console.log(`🤖 Attempting to query OpenRouter model: ${model}...`);
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: model,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 20000 // 20s timeout per model
        }
      );

      if (response.data && response.data.choices && response.data.choices[0] && response.data.choices[0].message) {
        const text = response.data.choices[0].message.content;
        if (text && text.trim().length > 0) {
          console.log(`✅ OpenRouter model ${model} response received successfully.`);
          return text;
        }
      }
    } catch (error) {
      console.warn(
        `⚠️ OpenRouter model ${model} failed:`,
        error.response?.data?.error?.message || error.message
      );
    }
  }

  // Fallback to Gemini
  console.warn("⚠️ All OpenRouter models failed. Falling back to Gemini AI...");
  try {
    const geminiResponse = await askGemini(prompt);
    console.log("✅ Gemini AI fallback response received successfully.");
    return geminiResponse;
  } catch (geminiError) {
    console.error("❌ Both OpenRouter and Gemini AI failed:", geminiError.message);
    throw geminiError;
  }
};

export default askAI;