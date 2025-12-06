"use server";

import { sentimentSummarizer, SentimentSummarizerInput } from "@/ai/flows/sentiment-summarizer";

export async function getSentimentSummary(input: SentimentSummarizerInput) {
  // In a real app, you'd add authentication and authorization checks here
  // to ensure only authorized admins can run this.
  try {
    const result = await sentimentSummarizer(input);
    return result;
  } catch (error) {
    console.error("Error in sentiment summarizer action:", error);
    throw new Error("Failed to get sentiment summary.");
  }
}
