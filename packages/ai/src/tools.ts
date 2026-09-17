import { z } from 'zod';

export const aiTools = {
  getWeather: {
    description: 'Get the current weather in a given location',
    inputSchema: z.object({
      location: z.string().describe('The city and state, e.g. San Francisco, CA'),
      unit: z.enum(['celsius', 'fahrenheit']).optional(),
    }),
    execute: async ({ location, unit }: { location: string; unit?: 'celsius' | 'fahrenheit' }) => {
      return `The weather in ${location} is 22 degrees ${unit || 'celsius'}.`;
    },
  },
  calculator: {
    description: 'Calculate the result of a math expression',
    inputSchema: z.object({
      expression: z.string().describe('A mathematical expression, e.g. "2 + 2 * 4"'),
    }),
    execute: async ({ expression }: { expression: string }) => {
      try {
        const result = eval(expression);
        return `The result is ${result}`;
      } catch {
        return `Could not evaluate expression: ${expression}`;
      }
    },
  },
};
