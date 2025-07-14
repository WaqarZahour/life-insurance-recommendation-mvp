import React from 'react';
import { RecommendationResponse } from '../types';

interface RecommendationDisplayProps {
  recommendation: RecommendationResponse | null;
  error: string | null;
}

const RecommendationDisplay: React.FC<RecommendationDisplayProps> = ({ recommendation, error }) => {
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!recommendation) {
    return null;
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-lg font-medium text-green-800 mb-4">Your Insurance Recommendation</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-green-700 mb-2">Recommended Policy</h4>
              <p className="text-lg font-semibold text-green-900">{recommendation.recommendedPolicy}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-green-700 mb-2">Explanation</h4>
              <p className="text-sm text-green-800 leading-relaxed">{recommendation.explanation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationDisplay; 