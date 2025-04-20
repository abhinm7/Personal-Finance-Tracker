'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Chart() {
  const [chartData, setChartData] = useState([]);

  // Fetch transactions from the API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transactions'); // Adjust the endpoint URL if needed
        const data = await response.json();
        
        if (data.transactions) {
          // Transform the data for the chart
          const transformedData = data.transactions.map((transaction: any) => ({
            name: new Date(transaction.date).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
            }), // Format as "Jan 05"
            amount: transaction.amount, // Use amount for the line
          }));
          
          setChartData(transformedData);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []); // Empty dependency array to run once on mount

  return (
    <ResponsiveContainer width="60%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="amount" stroke="#8884d8" name="Transaction Amount" />
      </LineChart>
    </ResponsiveContainer>
  );
}