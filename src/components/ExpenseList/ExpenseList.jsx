import React, { useState } from 'react';
import {ReactComponent as Logo} from '../../assets/Delete.svg';
import './ExpenseList.css';

const ExpenseList = ({ expenses, deleteExpense, updateExpense }) => {
  const [editingExpense, setEditingExpense] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedAmount, setUpdatedAmount] = useState('');

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setUpdatedTitle(expense.title);
    setUpdatedAmount(expense.amount);
  };

  const cancelEdit = () => {
    setEditingExpense(null);
    setUpdatedTitle('');
    setUpdatedAmount('');
  };

  const saveEdit = () => {
    const updatedExpense = { ...editingExpense, title: updatedTitle, amount: parseFloat(updatedAmount) };
    updateExpense(editingExpense.id, updatedExpense);
    setEditingExpense(null);
    setUpdatedTitle('');
    setUpdatedAmount('');
  };

  return (
    <div className="expense-list">
      <h2 className="recent-txns">Recent Transactions</h2>
      <div className="list-container">
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              {editingExpense && editingExpense.id === expense.id ? (
                <div>
                  <input
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                    placeholder="Title"
                    required
                  />
                  <input
                    type="number"
                    value={updatedAmount}
                    onChange={(e) => setUpdatedAmount(e.target.value)}
                    placeholder="Amount"
                    required
                  />
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </div>
              ) : (
                <div>
                  <span className="expenseItem">{expense.title}</span>
                  <span className="expenseAmount">₹{expense.amount}</span>
                  <button onClick={() => deleteExpense(expense.id)}>
                    <Logo className="logoDelete" /></button>
                  <button onClick={() => handleEdit(expense)}>Edit</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseList;
