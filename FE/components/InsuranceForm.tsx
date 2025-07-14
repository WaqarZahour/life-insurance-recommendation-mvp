import React, { useState } from 'react';
import { FormData, RiskTolerance } from '../types';

interface InsuranceFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const inputBase =
  'block w-full px-4 pt-6 pb-2 text-base bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition placeholder-transparent';
const labelBase =
  'absolute left-4 top-2 text-gray-500 text-sm pointer-events-none transition-all duration-200 origin-left';

const InsuranceForm: React.FC<InsuranceFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<FormData>({
    age: 0,
    income: 0,
    dependents: 0,
    riskTolerance: 'medium',
  });

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Age Input */}
        <div className="relative">
          <input
            type="number"
            id="age"
            min="18"
            max="80"
            required
            value={formData.age || ''}
            onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
            className={inputBase}
            placeholder="Age"
          />
          <label htmlFor="age" className={`${labelBase} ${formData.age ? 'scale-90 -translate-y-2' : ''}`}>Age</label>
        </div>

        {/* Annual Income Input */}
        <div className="relative">
          <input
            type="number"
            id="income"
            min="0"
            required
            value={formData.income || ''}
            onChange={(e) => handleInputChange('income', parseInt(e.target.value) || 0)}
            className={inputBase}
            placeholder="Annual Income"
          />
          <label htmlFor="income" className={`${labelBase} ${formData.income ? 'scale-90 -translate-y-2' : ''}`}>Annual Income ($)</label>
        </div>

        {/* Number of Dependents Input */}
        <div className="relative">
          <input
            type="number"
            id="dependents"
            min="0"
            max="10"
            required
            value={formData.dependents || ''}
            onChange={(e) => handleInputChange('dependents', parseInt(e.target.value) || 0)}
            className={inputBase}
            placeholder="Number of Dependents"
          />
          <label htmlFor="dependents" className={`${labelBase} ${formData.dependents ? 'scale-90 -translate-y-2' : ''}`}>Number of Dependents</label>
        </div>
      </div>

      {/* Risk Tolerance Select */}
      <div className="relative w-full md:w-1/2">
        <select
          id="riskTolerance"
          required
          value={formData.riskTolerance}
          onChange={(e) => handleInputChange('riskTolerance', e.target.value as RiskTolerance)}
          className={inputBase + ' pr-8'}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <label htmlFor="riskTolerance" className={`${labelBase} scale-90 -translate-y-2`}>Risk Tolerance</label>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-10 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-lg"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          ) : null}
          {isLoading ? 'Getting Recommendation...' : 'Get Recommendation'}
        </button>
      </div>
    </form>
  );
};

export default InsuranceForm; 