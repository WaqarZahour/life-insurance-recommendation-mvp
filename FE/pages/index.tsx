import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { SparklesIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import InsuranceForm from '../components/InsuranceForm';
import RecommendationDisplay from '../components/RecommendationDisplay';
import StatsDisplay from '../components/StatsDisplay';
import RecommendationHistory from '../components/RecommendationHistory';
import { FormData, RecommendationResponse, RecommendationStats, RecommendationHistoryItem } from '../types';

export default function Home() {
  const [recommendation, setRecommendation] = useState<RecommendationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Stats
  const [stats, setStats] = useState<RecommendationStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState<string | null>(null);

  // History
  const [history, setHistory] = useState<RecommendationHistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);

  // Fetch stats
  const fetchStats = async () => {
    setStatsLoading(true);
    setStatsError(null);
    try {
      const res = await axios.get('http://localhost:8000/api/recommendations/stats');
      if (res.data.success) {
        setStats(res.data.data);
      } else {
        setStatsError('Failed to load stats.');
      }
    } catch (err) {
      setStatsError('Failed to load stats.');
    } finally {
      setStatsLoading(false);
    }
  };

  // Fetch history
  const fetchHistory = async () => {
    setHistoryLoading(true);
    setHistoryError(null);
    try {
      const res = await axios.get('http://localhost:8000/api/recommendations');
      if (res.data.success) {
        setHistory(res.data.data);
      } else {
        setHistoryError('Failed to load history.');
      }
    } catch (err) {
      setHistoryError('Failed to load history.');
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchHistory();
  }, []);

  const handleFormSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    setRecommendation(null);
    try {
      const response = await axios.post('http://localhost:8000/api/recommendation', formData, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
      });
      if (response.data.success) {
        setRecommendation({
          recommendedPolicy: response.data.data.recommendation,
          explanation: response.data.data.explanation,
        });
        // Refresh stats and history after new recommendation
        fetchStats();
        fetchHistory();
      } else {
        setError(response.data.message || 'Failed to get recommendation.');
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred while getting recommendation.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Life Insurance Recommendation</title>
        <meta name="description" content="Get personalized life insurance recommendations based on your profile" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 p-3 shadow-lg">
                <SparklesIcon className="h-8 w-8 text-white" />
              </span>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm">
                Life Insurance Recommendation
              </h1>
            </div>
            <p className="text-lg text-gray-600 text-center max-w-2xl">
              Get personalized insurance recommendations based on your profile. Modern, secure, and easy to use.
            </p>
          </div>

          {/* Stats Section */}
          <StatsDisplay stats={stats} loading={statsLoading} error={statsError} />

          {/* Main Content */}
          <div className="bg-white/90 rounded-2xl shadow-2xl p-8 md:p-12 mb-10 border border-gray-100 backdrop-blur-sm">
            {/* Form Section */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                Tell us about yourself
              </h2>
              <InsuranceForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>

            {/* Results Section */}
            {(recommendation || error) && (
              <div className="border-t border-gray-200 pt-8 mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Your Recommendation
                </h2>
                <RecommendationDisplay recommendation={recommendation} error={error} />
              </div>
            )}
          </div>

          {/* History Section */}
          <RecommendationHistory history={history} loading={historyLoading} error={historyError} />

          {/* Footer */}
          <div className="text-center mt-12 text-sm text-gray-400">
            <p>
              This tool provides general recommendations. Please consult with a licensed insurance professional for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </>
  );
} 