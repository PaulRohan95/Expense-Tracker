import React, { useState, useEffect } from 'react';
import "@fontsource/ubuntu";
import ExpenseForm from './components/ExpenseForm/ExpenseForm';
import ExpenseList from './components/ExpenseList/ExpenseList';
import './App.css'; 

function App() {
  const [expenses, setExpenses] = useState([]);
  const [walletBalance, setWalletBalance] = useState(5000);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState('');

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(storedExpenses);

    const storedWalletBalance = JSON.parse(localStorage.getItem('walletBalance'));
    if (storedWalletBalance !== null) {
      setWalletBalance(storedWalletBalance);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('walletBalance', JSON.stringify(walletBalance));
  }, [walletBalance]);

  const addExpense = (expense) => {
    if (expense.amount > walletBalance) {
      alert("You cannot spend more than your available wallet balance.");
      return;
    }
    setExpenses([...expenses, expense]);
    setWalletBalance(walletBalance - expense.amount);
    setShowExpenseForm(false);
  };

  const addIncome = () => {
    if (!incomeAmount || isNaN(incomeAmount)) {
      alert('Please enter a valid amount');
      return;
    }
    setWalletBalance(walletBalance + parseFloat(incomeAmount));
    setIncomeAmount('');
    setShowIncomeForm(false);
  };

  const deleteExpense = (id) => {
    const expenseToDelete = expenses.find(expense => expense.id === id);
    setExpenses(expenses.filter(expense => expense.id !== id));
    setWalletBalance(walletBalance + expenseToDelete.amount);
  };

  const updateExpense = (id, updatedExpense) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === id ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
  };

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <div className='container'>
      <div className="wallet-balance">
        <h2 className='texth2'>Wallet Balance: <span className='amount'>₹{walletBalance}</span></h2>
        <button className='add-income' onClick={() => setShowIncomeForm(true)}>+ Add Income</button>
      </div>
      <div className="total-expenses">
        <h2 className="expenseh2">Expenses: <span className='amountExpense'>₹{calculateTotalExpenses()}</span></h2>
      <button className='add-expense' onClick={() => setShowExpenseForm(true)}>+ Add Expense</button>
      </div>
      {showIncomeForm && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="modal-header">Add Balance</h2>
            <input
              type="number"
              value={incomeAmount}
              onChange={(e) => setIncomeAmount(e.target.value)}
              placeholder="Income Amount"
              required
            />
            <button className="add" onClick={addIncome}>Add Balance</button>
            <button className="cancel" onClick={() => setShowIncomeForm(false)}>Cancel</button>
          </div>
        </div>
      )}
      {showExpenseForm && (
        <div className="modal-expense">
          <div className="modal-content-expense">
            <ExpenseForm addExpense={addExpense} walletBalance={walletBalance} />
            <button className="btn-cancel" onClick={() => setShowExpenseForm(false)}>Cancel</button>
          </div>
        </div>
      )}
      </div>
      <ExpenseList expenses={expenses} deleteExpense={deleteExpense} updateExpense={updateExpense} />
    </div>
  );
}

export default App;
