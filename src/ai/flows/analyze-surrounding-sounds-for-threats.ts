// The AI flow analyzes surrounding sounds for keywords or unusual noises to determine if there is a threat.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const AnalyzeSurroundingSoundsForThreatsInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "Audio data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeSurroundingSoundsForThreatsInput =
  z.infer<typeof AnalyzeSurroundingSoundsForThreatsInputSchema>;

const AnalyzeSurroundingSoundsForThreatsOutputSchema = z.object({
  isThreat: z.boolean().describe('Whether or not the surrounding sounds indicate a threat.'),
  threatDescription: z.string().describe('A description of the potential threat.'),
});
export type AnalyzeSurroundingSoundsForThreatsOutput =
  z.infer<typeof AnalyzeSurroundingSoundsForThreatsOutputSchema>;

export async function analyzeSurroundingSoundsForThreats(
  input: AnalyzeSurroundingSoundsForThreatsInput
): Promise<AnalyzeSurroundingSoundsForThreatsOutput> {
  return analyzeSurroundingSoundsForThreatsFlow(input);
}

const analyzeSurroundingSoundsForThreatsPrompt = ai.definePrompt({
  name: 'analyzeSurroundingSoundsForThreatsPrompt',
  input: {schema: AnalyzeSurroundingSoundsForThreatsInputSchema},
  output: {schema: AnalyzeSurroundingSoundsForThreatsOutputSchema},
  prompt: `You are an AI assistant designed to analyze surrounding sounds and determine if there is a threat.

  Analyze the provided audio data for keywords, unusual noises, and patterns that may indicate a dangerous situation. Consider sounds like shouting, breaking glass, sirens, or specific words related to distress or violence.

  Audio data: {{media url=audioDataUri}}

  Based on your analysis, determine whether the surrounding sounds indicate a threat and provide a description of the potential threat.
  Set the isThreat output field to true if a threat is detected, and provide a detailed description in the threatDescription field. If no threat is detected, set isThreat to false and provide a reassuring message in the threatDescription field.

  Format your response as a JSON object.
  `,
});

const analyzeSurroundingSoundsForThreatsFlow = ai.defineFlow(
  {
    name: 'analyzeSurroundingSoundsForThreatsFlow',
    inputSchema: AnalyzeSurroundingSoundsForThreatsInputSchema,
    outputSchema: AnalyzeSurroundingSoundsForThreatsOutputSchema,
  },
  async input => {
    const {output} = await analyzeSurroundingSoundsForThreatsPrompt(input);
    return output!;
  }
);
