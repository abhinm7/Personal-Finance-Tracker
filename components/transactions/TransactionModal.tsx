'use client';

interface Transaction {
  _id: string;
  date: string;
  title: string;
  amount: number;
  rawAmount: number;
  rawDate: string;
  category: string;
}

interface TransactionModalProps {
  isOpen: boolean;
  transaction: Transaction | null;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TransactionModal = ({
  isOpen,
  transaction,
  onClose,
  onSubmit,
  onChange,
}: TransactionModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm">
        <h3 className="text-lg font-bold mb-4">Edit Transaction</h3>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Title</label>
            <input
              type="text"
              name="title"
              value={transaction?.title || ''}
              onChange={onChange}
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
              value={transaction?.amount || ''}
              onChange={onChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Date</label>
            <input
              type="date"
              name="date"
              value={transaction?.date || ''}
              onChange={onChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
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
  );
};