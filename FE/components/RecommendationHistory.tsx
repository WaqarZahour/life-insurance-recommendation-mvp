import React from 'react';
import { ClockIcon } from '@heroicons/react/24/solid';
import { RecommendationHistoryItem } from '../types';

interface RecommendationHistoryProps {
  history: RecommendationHistoryItem[];
  loading: boolean;
  error: string | null;
}

const RecommendationHistory: React.FC<RecommendationHistoryProps> = ({ history, loading, error }) => {
  if (loading) {
    return <div className="text-gray-500">Loading history...</div>;
  }
  if (error) {
    return <div className="text-red-600">{error}</div>;
  }
  if (!history.length) {
    return <div className="text-gray-500">No recommendations yet.</div>;
  }
  return (
    <div className="bg-white/90 border border-gray-100 rounded-2xl shadow-xl p-6 mt-12 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <ClockIcon className="h-6 w-6 text-indigo-500" />
        <h3 className="text-lg font-bold text-gray-800">Recommendation History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gradient-to-r from-blue-50 to-indigo-100">
            <tr>
              <th className="px-3 py-2 text-left font-semibold text-gray-600 uppercase">Age</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-600 uppercase">Income</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-600 uppercase">Dependents</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-600 uppercase">Risk</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-600 uppercase">Recommendation</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-600 uppercase">Explanation</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-600 uppercase">Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, idx) => (
              <tr
                key={item.id}
                className={
                  `transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'} hover:bg-indigo-50`
                }
              >
                <td className="px-3 py-2 whitespace-nowrap font-medium text-gray-900">{item.age}</td>
                <td className="px-3 py-2 whitespace-nowrap text-blue-700 font-semibold">${parseFloat(item.income).toLocaleString()}</td>
                <td className="px-3 py-2 whitespace-nowrap text-gray-700">{item.dependents}</td>
                <td className="px-3 py-2 whitespace-nowrap capitalize text-indigo-600 font-semibold">{item.riskTolerance}</td>
                <td className="px-3 py-2 whitespace-nowrap text-green-700 font-semibold">{item.recommendation}</td>
                <td className="px-3 py-2 whitespace-nowrap text-gray-600">{item.explanation}</td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-400">{new Date(item.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecommendationHistory; 