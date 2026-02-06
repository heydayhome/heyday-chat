import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function handler(event) {
  const { message } = JSON.parse(event.body);

  const prompt = `
  You are Heyday Landscaping's backyard expert.
  A user has sent this project info: "${message}"
  Respond with:
  1) Friendly summary of their selections
  2) Rough estimated cost
  3) Rough timeline
  Make it conversational and in Heyday style.
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ reply: completion.choices[0].message.content })
  };
}
