import React, { useState } from 'react';
import "@fontsource/ubuntu";
import styles from './IncomeForm.module.css';

const IncomeForm = ({ addIncome }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) {
      alert('Amount field is required');
      return;
    }
    addIncome(parseFloat(amount));
    setAmount('');
  };

  return (
    <div className={styles.incomeForm}>
      <h2>Add Income</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
        <button type="submit">Add Income</button>
      </form>
    </div>
  );
};

export default IncomeForm;
