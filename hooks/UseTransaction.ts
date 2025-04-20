'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Transaction {
  _id: string;
  date: string;
  title: string;
  amount: number;
  rawAmount: number;
  rawDate: string;
  category: string;
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      if (data.transactions) {
        setTransactions(
          data.transactions.map((t: any) => ({
            _id: t._id,
            date: new Date(t.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }),
            category: t.title,
            amount: `₹${t.amount.toFixed(2)}`,
            rawAmount: t.amount,
            rawDate: t.date,
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleEditClick = (transaction: Transaction) => {
    setEditTransaction({
      _id: transaction._id,
      title: transaction.category,
      amount: transaction.rawAmount,
      date: new Date(transaction.rawDate).toISOString().split('T')[0],
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (transactionId: string) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) {
      return;
    }
    const deleteToast = toast.loading('Deleting transaction...');
    try {
      const response = await fetch('/api/transactions', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: transactionId }),
      });
      if (response.ok) {
        await fetchTransactions();
        toast.success('Transaction deleted!', { id: deleteToast });
      } else {
        toast.error('Failed to delete transaction', { id: deleteToast });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error deleting transaction', { id: deleteToast });
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTransaction) return;
    
    const updateToast = toast.loading('Updating transaction...');
    try {
      const response = await fetch('/api/transactions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editTransaction),
      });
      if (response.ok) {
        await fetchTransactions();
        toast.success('Transaction updated!', { id: updateToast });
        setIsModalOpen(false);
        setEditTransaction(null);
      } else {
        toast.error('Failed to update transaction', { id: updateToast });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error updating transaction', { id: updateToast });
    }
  };

  return {
    transactions,
    editTransaction,
    isModalOpen,
    setIsModalOpen,
    setEditTransaction,
    handleEditClick,
    handleDeleteClick,
    handleEditSubmit,
  };
};