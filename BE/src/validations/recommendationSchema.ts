import { z } from 'zod';

// Input validation schema for recommendation request
export const recommendationInputSchema = z.object({
  age: z.number()
    .int()
    .min(18, 'Age must be at least 18 years')
    .max(100, 'Age cannot exceed 100 years'),
  
  income: z.number()
    .positive('Income must be positive')
    .max(10000000, 'Income cannot exceed 10 million'),
  
  dependents: z.number()
    .int()
    .min(0, 'Dependents cannot be negative')
    .max(10, 'Dependents cannot exceed 10'),
  
  riskTolerance: z.enum(['low', 'medium', 'high'], {
    errorMap: () => ({ message: 'Risk tolerance must be low, medium, or high' })
  })
});

// Response schema for recommendation
export const recommendationResponseSchema = z.object({
  recommendation: z.string(),
  explanation: z.string()
});

// Type definitions derived from schemas
export type RecommendationInput = z.infer<typeof recommendationInputSchema>;
export type RecommendationResponse = z.infer<typeof recommendationResponseSchema>; 