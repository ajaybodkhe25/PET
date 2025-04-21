import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDaysInMonth } from 'date-fns';
import { Expense, Budget, ExpenseCategory } from '@/types';

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  editExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  budget: Budget;
  setBudget: (budget: Budget) => void;
  resetMonth: () => void;
  categories: ExpenseCategory[];
  currentMonthExpenses: Expense[];
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [budget, setBudgetState] = useState<Budget>(() => {
    const saved = localStorage.getItem('budget');
    if (saved) {
      return JSON.parse(saved);
    }
    const defaultMonthly = 0;
    const daysInMonth = getDaysInMonth(new Date());
    return {
      monthly: defaultMonthly,
      weekly: (defaultMonthly * 12) / 52,
      daily: defaultMonthly / daysInMonth
    };
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('budget', JSON.stringify(budget));
  }, [budget]);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = {
      ...expense,
      id: crypto.randomUUID()
    };
    setExpenses(prev => [...prev, newExpense]);
  };

  const editExpense = (expense: Expense) => {
    setExpenses(prev => prev.map(e => e.id === expense.id ? expense : e));
  };

  const removeExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const setBudget = (newBudget: Budget) => {
    setBudgetState(newBudget);
  };

  const resetMonth = () => {
    const currentDate = new Date();
    setExpenses(prev => 
      prev.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() !== currentDate.getMonth() ||
               expenseDate.getFullYear() !== currentDate.getFullYear();
      })
    );
  };

  const categories: ExpenseCategory[] = [
    'food',
    'housing',
    'transportation',
    'utilities',
    'entertainment',
    'healthcare',
    'personal',
    'education',
    'other'
  ];

  const currentMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const currentDate = new Date();
    return expenseDate.getMonth() === currentDate.getMonth() &&
           expenseDate.getFullYear() === currentDate.getFullYear();
  });

  return (
    <ExpenseContext.Provider value={{
      expenses,
      addExpense,
      editExpense,
      removeExpense,
      budget,
      setBudget,
      resetMonth,
      categories,
      currentMonthExpenses
    }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
}
