export type RiskTolerance = 'low' | 'medium' | 'high';

export interface FormData {
  age: number;
  income: number;
  dependents: number;
  riskTolerance: RiskTolerance;
}

export interface RecommendationResponse {
  recommendedPolicy: string;
  explanation: string;
}

export interface ApiError {
  message: string;
}

export interface RecommendationStats {
  totalRecommendations: number;
  averageAge: number;
  averageIncome: number;
  riskToleranceDistribution: Record<string, number>;
}

export interface RecommendationHistoryItem {
  id: number;
  age: number;
  income: string;
  dependents: number;
  riskTolerance: string;
  recommendation: string;
  explanation: string;
  createdAt: string;
  updatedAt: string;
} 