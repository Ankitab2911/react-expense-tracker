import React from 'react';
import { Trash2 } from 'lucide-react';

const TransactionList = ({ transactions, onDeleteTransaction }) => {
  if (transactions.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">
        No transactions yet
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map(transaction => (
        <div
          key={transaction.id}
          className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm"
        >
          <div>
            <h4 className="font-semibold text-gray-800">
              {transaction.category}
            </h4>
            <p className="text-sm text-gray-500">
              {transaction.description}
            </p>
            <p className="text-xs text-gray-400">
              {transaction.date}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span
              className={`font-bold ${
                transaction.type === 'income'
                  ? 'text-green-600'
                  : 'text-red-500'
              }`}
            >
              ₹{transaction.amount}
            </span>

            <button
              onClick={() => onDeleteTransaction(transaction.id)}
              className="text-red-500 hover:text-red-700"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
