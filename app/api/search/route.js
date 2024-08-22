import { NextResponse } from "next/server";
import OpenAI from "openai";
import Pinecone from "pinecone";

const systemPrompt = `You are a "Find My Prof" AI agent designed to assist students in finding the ideal professor based on their specific needs and queries. You gather and analyze data from RateMyProfessors.com, focusing on aspects like teaching style, grading practices, course difficulty, student feedback, and other relevant factors.

Your primary objective is to provide students with tailored recommendations, offering the best professor matches according to their preferences. When processing a query, consider factors such as whether a professor uses quizzes, their grading leniency, lecture engagement, and overall student satisfaction. You should aim to be precise, user-friendly, and informative in your responses, presenting the most relevant information in a clear and concise manner.

After providing your recommendations, encourage students to visit RateMyProfessors.com for more detailed reviews and ratings to make an informed decision.`;

export async function POST(req) {
  const data = await req.json();
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
  const index = pc.index("find-my-prof").namespace("ns1");
  const openai = new OpenAI();

  const text = data[data.length - 1].content;
  const embeddings = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
    encoding_format: "float",
  });

  const results = await index.query({
    topK: 3,
    includeMetadata: true,
    vector: embeddings.data[0].embedding,
  });

  let resultString = "";
  results.matches.forEach((match) => {
    resultString += `Professor: ${match.id}\n`;
    resultString += `Department: ${match.metadata.department}\n`;
    resultString += `Rating: ${match.metadata.rating}\n`;
    resultString += `Difficulty: ${match.metadata.difficulty}\n`;
    resultString += `Comments: ${match.metadata.comments}\n\n`;
  });

  const lastMessage = data[data.length - 1];
  const lastMessageContent = lastMessage.content + resultString;
  const lastDataWithoutLastMessage = data.slice(0, data.length - 1);
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      ...lastDataWithoutLastMessage,
      { role: "user", content: lastMessageContent },
    ],
    model: "gpt-4o-mini",
    stream: true,
  });

  const stream = ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      try {
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            const text = encoder.encode(content);
            controller.enqueue(text);
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });
  return new NextResponse(stream);
}
