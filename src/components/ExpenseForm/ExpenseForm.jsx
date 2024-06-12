import React, { useState } from 'react';
import "@fontsource/ubuntu";
import './ExpenseForm.css';

const ExpenseForm = ({ addExpense, walletBalance }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category || !date) {
      alert('All fields are required');
      return;
    }
    const newExpense = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      category,
      date
    };
    addExpense(newExpense);
    setTitle('');
    setAmount('');
    setCategory('');
    setDate('');
  };

  return (
    <div className="expense-form">
      <h2>Add Expenses</h2>
      <form onSubmit={handleSubmit}>
        <input className="expense-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <input className="expense-price" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Price" required />
        <input className="expense-category" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
        <input className="expense-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <button className="btn-submit" type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
