import React, { useState } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import AddTransactionModal from './components/AddTransactionModal';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [transactions, setTransactions] = useState([]);

  // totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  // LOGIN
  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);

    const savedTransactions =
      JSON.parse(localStorage.getItem(`transactions_${userData.username}`)) || [];

    setTransactions(savedTransactions);
  };

  // LOGOUT
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setTransactions([]);
    setCurrentView('dashboard');
  };

  // ADD TRANSACTION
  const handleAddTransaction = (newTransaction) => {
    const transaction = {
      id: Date.now(),
      ...newTransaction,
      amount: parseFloat(newTransaction.amount)
    };

    const updatedTransactions = [transaction, ...transactions];
    setTransactions(updatedTransactions);

    localStorage.setItem(
      `transactions_${user.username}`,
      JSON.stringify(updatedTransactions)
    );

    setShowAddTransaction(false);
  };

  // DELETE TRANSACTION
  const handleDeleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);

    localStorage.setItem(
      `transactions_${user.username}`,
      JSON.stringify(updatedTransactions)
    );
  };

  // LOGIN PAGE
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
        onLogout={handleLogout}
      />

      <div className="flex-1 p-8 overflow-auto">
        {currentView === 'dashboard' ? (
          <Dashboard
            transactions={transactions}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            balance={balance}
            onAddTransaction={() => setShowAddTransaction(true)}
            onDeleteTransaction={handleDeleteTransaction}
          />
        ) : (
          <Profile user={user} transactions={transactions} />
        )}

        {showAddTransaction && (
          <AddTransactionModal
            onClose={() => setShowAddTransaction(false)}
            onAdd={handleAddTransaction}
          />
        )}
      </div>
    </div>
  );
};

export default App;
