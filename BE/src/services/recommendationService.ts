import { Recommendation } from '../models/Recommendation';
import { RecommendationInput, RecommendationResponse } from '../validations/recommendationSchema';

export class RecommendationService {
  /**
   * Generate life insurance recommendation based on user input
   * Uses rules-based logic that can be easily extended for ML integration
   */
  static async generateRecommendation(input: RecommendationInput): Promise<RecommendationResponse> {
    const { age, income, dependents, riskTolerance } = input;

    // Rules-based recommendation logic
    let recommendation: string;
    let explanation: string;

    // Rule 1: Young person with high risk tolerance
    if (age < 40 && riskTolerance === 'high') {
      recommendation = 'Term Life – $500,000 for 20 years';
      explanation = 'You\'re under 40 with high risk tolerance, so a term life policy fits.';
    }
    // Rule 2: Older person with low risk tolerance
    else if (age > 50 && riskTolerance === 'low') {
      recommendation = 'Whole Life – $250,000';
      explanation = 'You\'re over 50 with low risk tolerance, so a whole life policy provides permanent coverage.';
    }
    // Rule 3: High income with many dependents
    else if (income > 100000 && dependents > 2) {
      recommendation = 'Term Life – $1,000,000 for 30 years';
      explanation = 'High income with multiple dependents requires substantial coverage for long-term protection.';
    }
    // Rule 4: Medium risk tolerance with moderate income
    else if (riskTolerance === 'medium' && income >= 50000 && income <= 100000) {
      recommendation = 'Term Life – $750,000 for 25 years';
      explanation = 'Medium risk tolerance with moderate income suggests a balanced term life approach.';
    }
    // Rule 5: Low income with dependents
    else if (income < 50000 && dependents > 0) {
      recommendation = 'Term Life – $300,000 for 15 years';
      explanation = 'Lower income with dependents needs affordable coverage for immediate family protection.';
    }
    // Rule 6: High income, low risk tolerance
    else if (income > 150000 && riskTolerance === 'low') {
      recommendation = 'Universal Life – $2,000,000';
      explanation = 'High income with low risk tolerance benefits from flexible universal life coverage.';
    }
    // Default rule for other combinations
    else {
      recommendation = 'Term Life – $400,000 for 20 years';
      explanation = 'Standard term life policy providing solid coverage for most situations.';
    }

    // Store the recommendation in database
    await Recommendation.create({
      age,
      income,
      dependents,
      riskTolerance,
      recommendation,
      explanation
    });

    return {
      recommendation,
      explanation
    };
  }

  /**
   * Get all recommendations from database
   * Useful for analytics and ML training data
   */
  static async getAllRecommendations(): Promise<Recommendation[]> {
    return await Recommendation.findAll({
      order: [['createdAt', 'DESC']]
    });
  }

  /**
   * Get recommendation statistics
   * Useful for business intelligence
   */
  static async getRecommendationStats(): Promise<{
    totalRecommendations: number;
    averageAge: number;
    averageIncome: number;
    riskToleranceDistribution: Record<string, number>;
  }> {
    const recommendations = await Recommendation.findAll();
    
    const totalRecommendations = recommendations.length;
    const averageAge = recommendations.reduce((sum, rec) => sum + rec.age, 0) / totalRecommendations || 0;
    const averageIncome = recommendations.reduce((sum, rec) => sum + Number(rec.income), 0) / totalRecommendations || 0;
    
    const riskToleranceDistribution = recommendations.reduce((acc, rec) => {
      acc[rec.riskTolerance] = (acc[rec.riskTolerance] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalRecommendations,
      averageAge,
      averageIncome,
      riskToleranceDistribution
    };
  }
} 