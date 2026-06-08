import model from "../config/gemini.js";

const askGemini = async (prompt) => {
  try {
    const result = await model.generateContent(
      prompt
    );

    const response =
      await result.response;

    return response.text();
  } catch (error) {
    console.error(
      "Gemini Error:",
      error.message
    );

    throw error;
  }
};

export default askGemini;