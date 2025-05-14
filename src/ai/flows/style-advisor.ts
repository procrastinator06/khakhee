'use server';

/**
 * @fileOverview An AI Style Advisor for recommending combat dress clothing.
 *
 * - getStyleRecommendation - A function that provides personalized clothing recommendations.
 * - StyleAdvisorInput - The input type for the getStyleRecommendation function.
 * - StyleAdvisorOutput - The return type for the getStyleRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StyleAdvisorInputSchema = z.object({
  stylePreferences: z
    .string()
    .describe('Describe your style preferences, including preferred colors, materials, and fit.'),
  bodyMeasurements: z
    .string()
    .describe('Provide your body measurements, including height, weight, chest, waist, and hip size.'),
});
export type StyleAdvisorInput = z.infer<typeof StyleAdvisorInputSchema>;

const StyleAdvisorOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A list of recommended combat dress clothing items based on the provided preferences and measurements.'),
  reasoning: z
    .string()
    .describe('Explanation of why the recommended items match the user preferences and measurements.'),
});
export type StyleAdvisorOutput = z.infer<typeof StyleAdvisorOutputSchema>;

export async function getStyleRecommendation(input: StyleAdvisorInput): Promise<StyleAdvisorOutput> {
  return styleAdvisorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'styleAdvisorPrompt',
  input: {schema: StyleAdvisorInputSchema},
  output: {schema: StyleAdvisorOutputSchema},
  prompt: `You are a personal style advisor specializing in combat dress clothing.

  Based on the user's style preferences and body measurements, recommend specific clothing items from our catalog that match their needs.
  Explain why each recommended item is a good fit for the user.

  Style Preferences: {{{stylePreferences}}}
  Body Measurements: {{{bodyMeasurements}}}
  `,
});

const styleAdvisorFlow = ai.defineFlow(
  {
    name: 'styleAdvisorFlow',
    inputSchema: StyleAdvisorInputSchema,
    outputSchema: StyleAdvisorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
