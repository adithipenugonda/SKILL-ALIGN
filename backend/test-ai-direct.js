import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const models = [
  "google/gemma-4-31b-it:free",
  "liquid/lfm-2.5-1.2b-instruct:free",
  "moonshotai/kimi-k2.6:free",
  "qwen/qwen3-coder:free",
  "openrouter/free"
];

const run = async () => {
  for (const model of models) {
    try {
      console.log(`Testing model: ${model}...`);
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: model,
          messages: [{ role: "user", content: "Hello, reply with only the word 'Active'" }]
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
          },
          timeout: 8000
        }
      );
      console.log(`✅ Success for ${model}: "${response.data?.choices?.[0]?.message?.content?.trim()}"`);
      break;
    } catch (error) {
      console.error(`❌ Failed for ${model}:`, error.response?.data || error.message);
    }
  }
};

run();
