import React from 'react';
import { ChartBarIcon, UserGroupIcon, CurrencyDollarIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import { RecommendationStats } from '../types';

interface StatsDisplayProps {
  stats: RecommendationStats | null;
  loading: boolean;
  error: string | null;
}

const iconClass = 'h-7 w-7 text-white';
const cardClass = 'flex flex-col justify-between bg-gradient-to-tr from-blue-400 to-indigo-500 rounded-xl shadow-lg p-4 min-w-[180px] min-h-[110px]';

const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats, loading, error }) => {
  if (loading) {
    return <div className="text-gray-500">Loading stats...</div>;
  }
  if (error) {
    return <div className="text-red-600">{error}</div>;
  }
  if (!stats) {
    return null;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
      <div className={cardClass}>
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-blue-600 rounded-full p-2"><ChartBarIcon className={iconClass} /></span>
          <div className="text-xs text-blue-100 font-medium">Total Recommendations</div>
        </div>
        <div className="text-2xl font-bold text-white whitespace-nowrap">{stats.totalRecommendations}</div>
      </div>
      <div className={cardClass}>
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-indigo-600 rounded-full p-2"><UserGroupIcon className={iconClass} /></span>
          <div className="text-xs text-blue-100 font-medium">Average Age</div>
        </div>
        <div className="text-2xl font-bold text-white whitespace-nowrap">
          {Number(stats.averageAge).toFixed(1)}
        </div>
      </div>
      <div className={cardClass}>
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-blue-600 rounded-full p-2"><CurrencyDollarIcon className={iconClass} /></span>
          <div className="text-xs text-blue-100 font-medium">Average Income</div>
        </div>
        <div className="text-2xl font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis">
          ${Number(stats.averageIncome).toLocaleString()}
        </div>
      </div>
      <div className={cardClass}>
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-indigo-600 rounded-full p-2"><AdjustmentsHorizontalIcon className={iconClass} /></span>
          <div className="text-xs text-blue-100 font-medium">Risk Tolerance</div>
        </div>
        <ul className="text-sm text-white leading-tight">
          {Object.entries(stats.riskToleranceDistribution).map(([risk, count]) => (
            <li key={risk} className="capitalize whitespace-nowrap">{risk}: {count}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StatsDisplay; 