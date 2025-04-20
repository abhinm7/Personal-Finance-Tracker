import mongoose from 'mongoose';

// Transaction interface
export interface ITransaction {
  title: string;
  amount: number;
  date: Date;
  createdAt?: Date;
}       

// Transaction schema
const TransactionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Get existing model or create new one
const Transaction = mongoose.models.Transaction || 
                   mongoose.model('Transaction', TransactionSchema);

export default Transaction;