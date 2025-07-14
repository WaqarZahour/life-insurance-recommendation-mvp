import { RecommendationService } from '../services/recommendationService';
import { RecommendationInput } from '../validations/recommendationSchema';

// Mock the Recommendation model
jest.mock('../models/Recommendation', () => ({
  Recommendation: {
    create: jest.fn(),
    findAll: jest.fn()
  }
}));

describe('RecommendationService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateRecommendation', () => {
    it('should generate term life recommendation for young person with high risk tolerance', async () => {
      const input: RecommendationInput = {
        age: 35,
        income: 60000,
        dependents: 1,
        riskTolerance: 'high'
      };

      const result = await RecommendationService.generateRecommendation(input);

      expect(result.recommendation).toBe('Term Life – $500,000 for 20 years');
      expect(result.explanation).toBe('You\'re under 40 with high risk tolerance, so a term life policy fits.');
    });

    it('should generate whole life recommendation for older person with low risk tolerance', async () => {
      const input: RecommendationInput = {
        age: 55,
        income: 80000,
        dependents: 0,
        riskTolerance: 'low'
      };

      const result = await RecommendationService.generateRecommendation(input);

      expect(result.recommendation).toBe('Whole Life – $250,000');
      expect(result.explanation).toBe('You\'re over 50 with low risk tolerance, so a whole life policy provides permanent coverage.');
    });

    it('should generate high coverage term life for high income with many dependents', async () => {
      const input: RecommendationInput = {
        age: 40,
        income: 120000,
        dependents: 3,
        riskTolerance: 'medium'
      };

      const result = await RecommendationService.generateRecommendation(input);

      expect(result.recommendation).toBe('Term Life – $1,000,000 for 30 years');
      expect(result.explanation).toBe('High income with multiple dependents requires substantial coverage for long-term protection.');
    });

    it('should generate balanced term life for medium risk with moderate income', async () => {
      const input: RecommendationInput = {
        age: 45,
        income: 75000,
        dependents: 2,
        riskTolerance: 'medium'
      };

      const result = await RecommendationService.generateRecommendation(input);

      expect(result.recommendation).toBe('Term Life – $750,000 for 25 years');
      expect(result.explanation).toBe('Medium risk tolerance with moderate income suggests a balanced term life approach.');
    });

    it('should generate affordable term life for low income with dependents', async () => {
      const input: RecommendationInput = {
        age: 30,
        income: 40000,
        dependents: 1,
        riskTolerance: 'low'
      };

      const result = await RecommendationService.generateRecommendation(input);

      expect(result.recommendation).toBe('Term Life – $300,000 for 15 years');
      expect(result.explanation).toBe('Lower income with dependents needs affordable coverage for immediate family protection.');
    });

    it('should generate universal life for high income with low risk tolerance', async () => {
      const input: RecommendationInput = {
        age: 50,
        income: 200000,
        dependents: 2,
        riskTolerance: 'low'
      };

      const result = await RecommendationService.generateRecommendation(input);

      expect(result.recommendation).toBe('Universal Life – $2,000,000');
      expect(result.explanation).toBe('High income with low risk tolerance benefits from flexible universal life coverage.');
    });

    it('should generate default recommendation for other combinations', async () => {
      const input: RecommendationInput = {
        age: 25,
        income: 50000,
        dependents: 0,
        riskTolerance: 'medium'
      };

      const result = await RecommendationService.generateRecommendation(input);

      expect(result.recommendation).toBe('Term Life – $400,000 for 20 years');
      expect(result.explanation).toBe('Standard term life policy providing solid coverage for most situations.');
    });
  });

  describe('getAllRecommendations', () => {
    it('should return all recommendations ordered by creation date', async () => {
      const mockRecommendations = [
        { id: 1, age: 30, income: 60000, dependents: 1, riskTolerance: 'high' },
        { id: 2, age: 45, income: 80000, dependents: 2, riskTolerance: 'medium' }
      ];

      const { Recommendation } = require('../models/Recommendation');
      Recommendation.findAll.mockResolvedValue(mockRecommendations);

      const result = await RecommendationService.getAllRecommendations();

      expect(Recommendation.findAll).toHaveBeenCalledWith({
        order: [['createdAt', 'DESC']]
      });
      expect(result).toEqual(mockRecommendations);
    });
  });

  describe('getRecommendationStats', () => {
    it('should return correct statistics', async () => {
      const mockRecommendations = [
        { age: 30, income: 60000, riskTolerance: 'high' },
        { age: 45, income: 80000, riskTolerance: 'medium' },
        { age: 35, income: 70000, riskTolerance: 'low' }
      ];

      const { Recommendation } = require('../models/Recommendation');
      Recommendation.findAll.mockResolvedValue(mockRecommendations);

      const result = await RecommendationService.getRecommendationStats();

      expect(result.totalRecommendations).toBe(3);
      expect(result.averageAge).toBe(36.67);
      expect(result.averageIncome).toBe(70000);
      expect(result.riskToleranceDistribution).toEqual({
        high: 1,
        medium: 1,
        low: 1
      });
    });

    it('should handle empty recommendations list', async () => {
      const { Recommendation } = require('../models/Recommendation');
      Recommendation.findAll.mockResolvedValue([]);

      const result = await RecommendationService.getRecommendationStats();

      expect(result.totalRecommendations).toBe(0);
      expect(result.averageAge).toBe(0);
      expect(result.averageIncome).toBe(0);
      expect(result.riskToleranceDistribution).toEqual({});
    });
  });
}); 