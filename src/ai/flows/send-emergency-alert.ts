// The AI flow for sending an emergency alert with location to contacts.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SendEmergencyAlertInputSchema = z.object({
  latitude: z.number().describe('The latitude of the user\'s location.'),
  longitude: z.number().describe('The longitude of the user\'s location.'),
  contacts: z.array(z.string()).describe('A list of emergency contacts to notify.'),
});
export type SendEmergencyAlertInput = z.infer<typeof SendEmergencyAlertInputSchema>;

const SendEmergencyAlertOutputSchema = z.object({
  success: z.boolean().describe('Whether the alert was sent successfully.'),
  message: z.string().describe('A confirmation message.'),
});
export type SendEmergencyAlertOutput = z.infer<typeof SendEmergencyAlertOutputSchema>;

export async function sendEmergencyAlert(
  input: SendEmergencyAlertInput
): Promise<SendEmergencyAlertOutput> {
  return sendEmergencyAlertFlow(input);
}

const sendEmergencyAlertFlow = ai.defineFlow(
  {
    name: 'sendEmergencyAlertFlow',
    inputSchema: SendEmergencyAlertInputSchema,
    outputSchema: SendEmergencyAlertOutputSchema,
  },
  async (input) => {
    // In a real application, this is where you would integrate with an SMS or email service.
    // For this prototype, we'll simulate the action and return a success message.
    console.log(`Simulating sending emergency alert to: ${input.contacts.join(', ')}`);
    console.log(`Location: https://www.google.com/maps/search/?api=1&query=${input.latitude},${input.longitude}`);
    
    return {
      success: true,
      message: `Successfully sent emergency alert and location to ${input.contacts.length} contacts.`,
    };
  }
);
