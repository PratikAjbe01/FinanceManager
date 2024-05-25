import React, { useState, useEffect } from 'react';

function TransactionData() {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5665/all');
        const data = await response.json();
        setTransactions(data.transactions);
        setTotalIncome(data.totalincome);
        setTotalExpense(data.totalexpense);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        // Handle the error (e.g., display an error message)
      }
    };
    fetchData();
  }, []);
  

  return (
    <div>
      <h2>Transactions</h2>
      {transactions.length > 0 ? (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.title}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found.</p>
      )}

      <div className="summary">
        <p>Total Income: {totalIncome}</p>
        <p>Total Expense: {totalExpense}</p>
      </div>
    </div>
  );
}

export default TransactionData;
