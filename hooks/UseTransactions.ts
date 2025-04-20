'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export interface Transaction {
  _id: string;
  date: string;
  title: string;
  amount: number;
  rawAmount: number;
  rawDate: string;
  category: string;
}

interface ApiResponse {
  transactions?: Transaction[];
  error?: string;
  message?: string;
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/transactions');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.transactions) {
        console.warn('No transactions found in response');
        setTransactions([]);
        return;
      }

      setTransactions(
        data.transactions.map((t) => ({
          _id: t._id,
          date: new Date(t.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }),
          title: t.title,
          amount: t.amount,
          rawAmount: t.amount,
          rawDate: t.date,
          category: t.category || t.title,
        }))
      );
    } catch (err) {
      console.error('Error fetching transactions:', err);
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      toast.error(`Failed to fetch transactions: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;
    return 'An unknown error occurred';
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleEditClick = (transaction: Transaction) => {
    setEditTransaction({
      ...transaction,
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

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await fetchTransactions();
      toast.success('Transaction deleted successfully!', { id: deleteToast });
    } catch (err) {
      console.error('Error deleting transaction:', err);
      const errorMessage = getErrorMessage(err);
      toast.error(`Failed to delete transaction: ${errorMessage}`, { id: deleteToast });
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

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await fetchTransactions();
      toast.success('Transaction updated successfully!', { id: updateToast });
      setIsModalOpen(false);
      setEditTransaction(null);
    } catch (err) {
      console.error('Error updating transaction:', err);
      const errorMessage = getErrorMessage(err);
      toast.error(`Failed to update transaction: ${errorMessage}`, { id: updateToast });
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
    isLoading,
    error,
    refetch: fetchTransactions,
  };
};