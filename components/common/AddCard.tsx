// src/components/AddCard.tsx
'use client'

import { useState, ChangeEvent, FormEvent } from "react";
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface FormData {
    title: string;
    amount: string;
    date: string;
}

const AddCard = () => {
    const [formData, setFormData] = useState<FormData>({
        title: "",
        amount: "",
        date: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.title || !formData.amount || !formData.date) {
            alert("All fields are required!");
            return;
        }
        
        try {
            // Send data to API endpoint
            const response = await fetch('/api/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                // Clear form on success
                setFormData({ title: "", amount: "", date: "" });
                alert("Transaction added successfully!");
            } else {
                throw new Error("Failed to add transaction");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <CardHeader className="w-full space-y-1">
                <CardTitle className="text-gray-800 text-xl">Add a Transaction</CardTitle>
                <CardDescription className="text-gray-600 text-sm">
                    Keep your finances up to date by logging your expenses.
                </CardDescription>
            </CardHeader>

            <CardContent className="w-full space-y-4">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="text-left mt-4">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="e.g. Electricity bill"
                                className="w-full sm:w-[800px] mt-2"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="sm:col-span-2 grid grid-cols-2 gap-4">
                            <div className="text-left">
                                <Label htmlFor="amount">Amount</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    placeholder="e.g. 2500"
                                    className="mt-2"
                                    value={formData.amount}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="text-left">
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    className="mt-2"
                                    value={formData.date}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <CardFooter className="flex justify-center mt-4">
                        <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-900 text-white font-medium py-2 px-6 w-full max-w-[200px] rounded-lg transition-colors duration-200 shadow-md"
                        >
                            Add
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </div>
    );
};

export default AddCard;