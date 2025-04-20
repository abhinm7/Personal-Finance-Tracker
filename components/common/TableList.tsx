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
import toast, { Toaster } from 'react-hot-toast';

const TableList = () => {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState(null); // Track transaction being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility

  // Fetch transactions
  useEffect(() => {
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
    fetchTransactions();
  }, []);

  // Open edit modal
  const handleEditClick = (transaction: any) => {
    setEditTransaction({
      _id: transaction._id,
      title: transaction.category,
      amount: transaction.rawAmount,
      date: new Date(transaction.rawDate).toISOString().split('T')[0],
    });
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditTransaction((prev: any) => ({ ...prev, [name]: value }));
  };

  // Submit updated transaction
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updateToast = toast.loading('Updating transaction...');
    try {
      const response = await fetch('/api/transactions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editTransaction),
      });
      if (response.ok) {
        // Refresh transactions
        const updatedData = await fetch('/api/transactions').then((res) => res.json());
        setTransactions(
          updatedData.transactions.map((t: any) => ({
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

  // Delete transaction
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
        // Refresh transactions
        const updatedData = await fetch('/api/transactions').then((res) => res.json());
        setTransactions(
          updatedData.transactions.map((t: any) => ({
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
        toast.success('Transaction deleted!', { id: deleteToast });
      } else {
        toast.error('Failed to delete transaction', { id: deleteToast });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error deleting transaction', { id: deleteToast });
    }
  };

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
            <TableRow key={item._id || idx} className="hover:bg-blue-50">
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell className="text-right space-x-2">
                <button
                  onClick={() => handleEditClick(item)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(item._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Simple Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Edit Transaction</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-sm text-gray-600">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editTransaction?.title || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-600">Amount</label>
                <input
                  type="number"
                  name="amount"
                  step="0.01"
                  value={editTransaction?.amount || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-600">Date</label>
                <input
                  type="date"
                  name="date"
                  value={editTransaction?.date || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableList;