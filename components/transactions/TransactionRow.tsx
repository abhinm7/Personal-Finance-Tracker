'use client';

import { Transaction } from './useTransactions';

interface TransactionRowProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export const TransactionRow = ({ transaction, onEdit, onDelete }: TransactionRowProps) => {
  return (
    <tr className="hover:bg-blue-50">
      <td>{transaction.date}</td>
      <td>{transaction.category}</td>
      <td>{transaction.amount}</td>
      <td className="text-right space-x-2">
        <button
          onClick={() => onEdit(transaction)}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(transaction._id)}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};