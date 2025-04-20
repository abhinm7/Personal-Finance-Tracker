'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTransactions } from '@/hooks/UseTransaction';
import { TransactionModal } from './TransactionModal';
import { TransactionRow } from './TransactionRow';

export const TransactionTable = () => {
  const {
    transactions,
    editTransaction,
    isModalOpen,
    setIsModalOpen,
    setEditTransaction,
    handleEditClick,
    handleDeleteClick,
    handleEditSubmit,
  } = useTransactions();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditTransaction((prev: any) => ({ ...prev, [name]: value }));
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
          {transactions.map((transaction, idx) => (
            <TransactionRow
              key={transaction._id || idx}
              transaction={transaction}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </TableBody>
      </Table>

      <TransactionModal
        isOpen={isModalOpen}
        transaction={editTransaction}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleEditSubmit}
        onChange={handleInputChange}
      />
    </div>
  );
};