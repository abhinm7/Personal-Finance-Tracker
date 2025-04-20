'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Chart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transactions');
        const data = await response.json();
        
        if (data.transactions) {
          // Group transactions by month and calculate total amount per month
          const monthlyData = data.transactions.reduce((acc: any, transaction: any) => {
            const date = new Date(transaction.date);
            const monthYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }); // e.g., "Jan 2024"
            
            if (!acc[monthYear]) {
              acc[monthYear] = 0;
            }
            acc[monthYear] += transaction.amount;
            
            return acc;
          }, {});

          // Convert to array format for Recharts
          const transformedData = Object.keys(monthlyData).map(month => ({
            name: month,
            amount: monthlyData[month],
          }));

          setChartData(transformedData);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <ResponsiveContainer width="60%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar 
          dataKey="amount" 
          fill="#8884d8" 
          name="Monthly Transactions" 
          barSize={30} // Adjust bar width
        />
      </BarChart>
    </ResponsiveContainer>
  );
}