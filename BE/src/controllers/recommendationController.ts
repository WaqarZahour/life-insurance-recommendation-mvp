import { Request, Response } from 'express';
import { RecommendationService } from '../services/recommendationService';
import { recommendationInputSchema } from '../validations/recommendationSchema';

export class RecommendationController {
  /**
   * POST /recommendation
   * Generate life insurance recommendation based on user input
   */
  static async createRecommendation(req: Request, res: Response): Promise<void> {
    try {
      // Validate input using Zod schema
      const validationResult = recommendationInputSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: 'Invalid input data',
          errors: validationResult.error.errors
        });
        return;
      }

      const input = validationResult.data;

      // Generate recommendation using service
      const recommendation = await RecommendationService.generateRecommendation(input);

      res.status(201).json({
        success: true,
        data: recommendation
      });

    } catch (error) {
      console.error('Error creating recommendation:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }

  /**
   * GET /recommendations
   * Get all recommendations (for analytics/admin purposes)
   */
  static async getAllRecommendations(req: Request, res: Response): Promise<void> {
    try {
      const recommendations = await RecommendationService.getAllRecommendations();

      res.status(200).json({
        success: true,
        data: recommendations,
        count: recommendations.length
      });

    } catch (error) {
      console.error('Error fetching recommendations:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }

  /**
   * GET /recommendations/stats
   * Get recommendation statistics for business intelligence
   */
  static async getRecommendationStats(req: Request, res: Response): Promise<void> {
    try {
      const stats = await RecommendationService.getRecommendationStats();

      res.status(200).json({
        success: true,
        data: stats
      });

    } catch (error) {
      console.error('Error fetching recommendation stats:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }

  /**
   * GET /health
   * Health check endpoint
   */
  static async healthCheck(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      success: true,
      message: 'Life Insurance Recommendation API is running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  }
} 