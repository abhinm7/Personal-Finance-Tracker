'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const TableList = () => {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions from the API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transactions'); // Adjust the endpoint URL if needed
        const data = await response.json();

        if (data.transactions) {
          // Transform the data to match the table's expected format
          const transformedData = data.transactions.map((transaction: any) => ({
            date: new Date(transaction.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }), // Format as "YYYY-MM-DD"
            category: transaction.title, // Use title as category
            amount: `₹${transaction.amount.toFixed(2)}`, // Format amount with currency
          }));
          setTransactions(transformedData);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-blue-700">Date</TableHead>
            <TableHead className="text-blue-700">Category</TableHead>
            <TableHead className="text-blue-700">Amount</TableHead>
            <TableHead className="text-blue-700 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((item: any, idx: number) => (
            <TableRow key={idx} className="hover:bg-blue-50">
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell className="text-right text-blue-600 cursor-pointer hover:underline">
                Edit
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableList;