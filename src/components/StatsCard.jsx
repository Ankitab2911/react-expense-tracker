import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const StatsCard = ({ title, amount, type }) => {
  const getCardStyle = () => {
    switch (type) {
      case 'income':
        return 'bg-gradient-to-br from-green-400 to-green-600';
      case 'expense':
        return 'bg-gradient-to-br from-red-400 to-red-600';
      case 'balance':
        return 'bg-gradient-to-br from-violet-400 to-purple-600';
      default:
        return 'bg-gradient-to-br from-gray-400 to-gray-600';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'income':
        return <TrendingUp className="w-8 h-8" />;
      case 'expense':
        return <TrendingDown className="w-8 h-8" />;
      case 'balance':
        return <Wallet className="w-8 h-8" />;
      default:
        return <DollarSign className="w-8 h-8" />;
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'income':
        return 'text-green-100';
      case 'expense':
        return 'text-red-100';
      case 'balance':
        return 'text-purple-100';
      default:
        return 'text-gray-100';
    }
  };

  return (
    <div className={`${getCardStyle()} rounded-2xl p-6 text-white shadow-lg card-hover`}>
      <div className="flex items-center justify-between mb-4">
        {getIcon()}
        <div className="p-2 bg-white/20 rounded-lg">
          <DollarSign className="w-5 h-5" />
        </div>
      </div>
      <p className={`${getTextColor()} text-sm font-medium`}>{title}</p>
      <p className="text-3xl font-bold mt-1">${amount.toLocaleString()}</p>
    </div>
  );
};

export default StatsCard;