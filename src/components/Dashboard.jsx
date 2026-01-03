import React from 'react';
import { Plus } from 'lucide-react';
import StatsCard from './StatsCard';
import TransactionList from './TransactionList';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// 🔴 CHANGE 1: add onDeleteTransaction here
const Dashboard = ({
  transactions,
  totalIncome,
  totalExpense,
  balance,
  onAddTransaction,
  onDeleteTransaction
}) => {
  const categoryData = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      categoryData[t.category] =
        (categoryData[t.category] || 0) + t.amount;
    });

  const pieData = Object.entries(categoryData).map(
    ([name, value]) => ({ name, value })
  );

  const COLORS = [
    '#8b5cf6',
    '#ec4899',
    '#f59e0b',
    '#10b981',
    '#3b82f6',
    '#ef4444'
  ];

  const last7Days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const trendData = last7Days.map(date => {
    const dayExpenses = transactions
      .filter(t => t.date === date && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const dayIncome = transactions
      .filter(t => t.date === date && t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      date: date.slice(5),
      expense: dayExpenses,
      income: dayIncome
    };
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h2>
        <button
          onClick={onAddTransaction}
          className="flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition"
        >
          <Plus className="w-5 h-5" />
          <span>Add Transaction</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard title="Total Income" amount={totalIncome} type="income" />
        <StatsCard title="Total Expenses" amount={totalExpense} type="expense" />
        <StatsCard title="Balance" amount={balance} type="balance" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Expense by Category
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            7-Day Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#10b981"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔴 CHANGE 2: pass delete function */}
      <TransactionList
        transactions={transactions.slice(0, 5)}
        onDeleteTransaction={onDeleteTransaction}
      />
    </div>
  );
};

export default Dashboard;
