// 'use server';

// /**
//  * @fileOverview A sentiment summarizer AI agent.
//  *
//  * - sentimentSummarizer - A function that handles the sentiment summarization process.
//  * - SentimentSummarizerInput - The input type for the sentimentSummarizer function.
//  * - SentimentSummarizerOutput - The return type for the sentimentSummarizer function.
//  */

// import {ai} from '@/ai/genkit';
// import {z} from 'genkit';

// const SentimentSummarizerInputSchema = z.object({
//   reviews: z.array(z.string()).describe('The reviews to summarize.'),
// });
// export type SentimentSummarizerInput = z.infer<typeof SentimentSummarizerInputSchema>;

// const SentimentSummarizerOutputSchema = z.object({
//   summary: z.string().describe('The summary of the sentiment of the reviews.'),
//   fiveStarCount: z.number().describe('The number of 5-star reviews.'),
//   averageScore: z.number().describe('The average score of the reviews.'),
// });
// export type SentimentSummarizerOutput = z.infer<typeof SentimentSummarizerOutputSchema>;

// export async function sentimentSummarizer(input: SentimentSummarizerInput): Promise<SentimentSummarizerOutput> {
//   return sentimentSummarizerFlow(input);
// }

// const prompt = ai.definePrompt({
//   name: 'sentimentSummarizerPrompt',
//   input: {schema: SentimentSummarizerInputSchema},
//   output: {schema: SentimentSummarizerOutputSchema},
//   prompt: `You are a sentiment analysis expert. Please summarize the sentiment of the following reviews, determine the total number of 5-star ratings and calculate the average score (out of 5). Provide a concise summary of the reviews.

// Reviews:
// {{#each reviews}}
// - {{{this}}}
// {{/each}}

// Output the summary, the total number of 5-star reviews, and the average score.`,
// });

// const sentimentSummarizerFlow = ai.defineFlow(
//   {
//     name: 'sentimentSummarizerFlow',
//     inputSchema: SentimentSummarizerInputSchema,
//     outputSchema: SentimentSummarizerOutputSchema,
//   },
//   async input => {
//     const {output} = await prompt(input);
//     return output!;
//   }
// );
