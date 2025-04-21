import { useExpense } from '@/contexts/ExpenseContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { getDaysInMonth } from 'date-fns';

export default function BudgetSetupForm() {
  const { budget, setBudget } = useExpense();
  const [monthlyBudget, setMonthlyBudget] = useState(budget.monthly.toString());
  const [weeklyBudget, setWeeklyBudget] = useState('0');
  const [dailyBudget, setDailyBudget] = useState('0');

  useEffect(() => {
    const monthly = parseFloat(monthlyBudget) || 0;
    const daysInMonth = getDaysInMonth(new Date());
    const daily = monthly / daysInMonth;
    const weekly = (monthly * 12) / 52; // Convert monthly to weekly (52 weeks in a year)

    setWeeklyBudget(weekly.toFixed(2));
    setDailyBudget(daily.toFixed(2));
  }, [monthlyBudget]);

  const handleSave = () => {
    const monthly = parseFloat(monthlyBudget) || 0;
    const daysInMonth = getDaysInMonth(new Date());
    setBudget({
      monthly: monthly,
      weekly: parseFloat(weeklyBudget),
      daily: monthly / daysInMonth
    });
  };

  return (
    <Card className="border-gray-700 bg-gray-800 shadow-lg">
      <CardHeader>
        <CardTitle className="text-gray-100">Budget Setup</CardTitle>
        <CardDescription className="text-gray-400">
          Set your monthly budget and we'll calculate the rest
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Monthly Budget</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
            <Input
              type="number"
              min="0"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              className="pl-7 bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400"
              placeholder="Enter your monthly budget"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Weekly Budget</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
              <Input
                type="text"
                value={weeklyBudget}
                readOnly
                className="pl-7 bg-gray-700 border-gray-600 text-gray-100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Daily Budget</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
              <Input
                type="text"
                value={dailyBudget}
                readOnly
                className="pl-7 bg-gray-700 border-gray-600 text-gray-100"
              />
            </div>
          </div>
        </div>

        <Button 
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Save Budget
        </Button>

        <p className="text-sm text-gray-400">
          Current monthly budget: ₹{budget.monthly.toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}
