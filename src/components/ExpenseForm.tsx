import { useState } from 'react';
import { useExpense } from '@/contexts/ExpenseContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatDateForInput } from '@/lib/expense-utils';
import { ExpenseCategory, Expense } from '@/types';
import { PlusCircle } from 'lucide-react';

interface ExpenseFormProps {
  editExpense?: Expense;
  onSubmit?: () => void;
}

export default function ExpenseForm({ editExpense, onSubmit }: ExpenseFormProps) {
  const { addExpense, editExpense: updateExpense, categories } = useExpense();
  
  const [name, setName] = useState<string>(editExpense?.name || '');
  const [amount, setAmount] = useState<string>(editExpense?.amount.toString() || '');
  const [date, setDate] = useState<string>(editExpense?.date || formatDateForInput());
  const [category, setCategory] = useState<ExpenseCategory | undefined>(editExpense?.category);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !amount || !date) {
      console.log('Missing required fields:', { name, amount, date });
      return;
    }
    
    const expenseData = {
      name,
      amount: parseFloat(amount),
      date,
      category
    };
    
    console.log('Submitting expense:', expenseData);
    
    if (editExpense) {
      console.log('Updating existing expense');
      updateExpense({ ...expenseData, id: editExpense.id });
    } else {
      console.log('Adding new expense');
      addExpense(expenseData);
    }
    
    // Reset form
    setName('');
    setAmount('');
    setDate(formatDateForInput());
    setCategory(undefined);
    
    console.log('Form reset complete');
    
    // Call onSubmit callback if provided
    if (onSubmit) onSubmit();
  };
  
  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">
          {editExpense ? 'Edit Expense' : 'Add New Expense'}
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          {editExpense 
            ? 'Update expense information' 
            : 'Enter the details of your expense'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Expense Name</Label>
            <Input
              id="name"
              placeholder="e.g., Groceries"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-gray-700 dark:text-gray-300">Amount</Label>
            <Input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date" className="text-gray-700 dark:text-gray-300">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category" className="text-gray-700 dark:text-gray-300">Category (Optional)</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as ExpenseCategory)}>
              <SelectTrigger className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {editExpense ? 'Update Expense' : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Expense
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
