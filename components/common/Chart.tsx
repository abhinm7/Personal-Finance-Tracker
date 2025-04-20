'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Transaction {
  date: string;
  amount: number;
}

interface ChartData {
  name: string;
  amount: number;
}

export default function Chart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [containerWidth, setContainerWidth] = useState<string>('60%');

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setContainerWidth(window.innerWidth <= 720 ? '90%' : '60%');
    };

    // Set initial width
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Fetch transactions from the API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transactions');
        const data = await response.json();

        if (data.transactions) {
          // Group transactions by month and calculate total amount
          const monthlyData = data.transactions.reduce((acc: Record<string, number>, transaction: Transaction) => {
            const date = new Date(transaction.date);
            const monthYear = date.toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            });

            if (!acc[monthYear]) {
              acc[monthYear] = 0;
            }
            acc[monthYear] += transaction.amount;

            return acc;
          }, {});

          // Convert to array and sort by date
          const transformedData = Object.keys(monthlyData)
            .map(month => ({
              name: month,
              amount: monthlyData[month],
            }))
            .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());

          setChartData(transformedData);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <ResponsiveContainer width={containerWidth} height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value: number) => `$${value.toFixed(2)}`}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Legend />
        <Bar
          dataKey="amount"
          fill="#8884d8"
          name="Monthly Amount"
          barSize={35}
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}