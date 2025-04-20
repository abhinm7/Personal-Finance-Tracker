import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Transaction from '@/models/Transaction';

// POST handler - Create new transaction
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();
    
    if (!data.title || !data.amount || !data.date) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const transaction = await Transaction.create({
      title: data.title,
      amount: parseFloat(data.amount),
      date: new Date(data.date)
    });
    
    return NextResponse.json(
      { success: true, transaction },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save transaction' },
      { status: 500 }
    );
  }
}

// GET handler - Fetch all transactions
export async function GET() {
  try {
    await connectDB();
    const transactions = await Transaction.find().sort({ date: -1 });
    return NextResponse.json({ transactions });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch transactions', error: err },
      { status: 500 }
    );
  }
}

// PUT handler - Update a transaction
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();

    if (!data._id || !data.title || !data.amount || !data.date) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const transaction = await Transaction.findByIdAndUpdate(
      data._id,
      {
        title: data.title,
        amount: parseFloat(data.amount),
        date: new Date(data.date),
      },
      { new: true }
    );

    if (!transaction) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, transaction });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Failed to update transaction' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();

    if (!data._id) {
      return NextResponse.json({ message: 'Missing _id' }, { status: 400 });
    }

    const transaction = await Transaction.findByIdAndDelete(data._id);

    if (!transaction) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Transaction deleted' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Failed to delete transaction', error: "error" }, { status: 500 });
  }
}