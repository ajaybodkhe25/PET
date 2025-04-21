import { useExpense } from '@/contexts/ExpenseContext';
import { calculateTotalExpenses, calculateBudgetPercentage, getBudgetStatus } from '@/lib/expense-utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ExpenseCategory } from '@/types';
import { BarChart3, AlertTriangle, Wallet, TrendingUp, TrendingDown, Calendar, DollarSign, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, getDaysInMonth } from 'date-fns';

export default function ExpenseDashboard() {
  const { budget, currentMonthExpenses, categories } = useExpense();
  
  const totalExpenses = calculateTotalExpenses(currentMonthExpenses);
  const remainingBudget = budget.monthly - totalExpenses;
  const percentageUsed = calculateBudgetPercentage(currentMonthExpenses, budget.monthly);
  const budgetStatus = getBudgetStatus(percentageUsed);
  
  // Calculate daily budget based on current month's days
  const currentDate = new Date();
  const daysInCurrentMonth = getDaysInMonth(currentDate);
  const dailyBudget = budget.monthly / daysInCurrentMonth;
  
  // Calculate category data for pie chart
  const categoryData = categories.map(category => {
    const categoryExpenses = currentMonthExpenses.filter(e => e.category === category);
    const amount = calculateTotalExpenses(categoryExpenses);
    return {
      name: category,
      value: amount
    };
  }).filter(item => item.value > 0);

  // Calculate daily expenses for bar chart
  const dailyExpenses = Array.from({ length: daysInCurrentMonth }, (_, i) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1);
    const dayExpenses = currentMonthExpenses.filter(
      expense => new Date(expense.date).getDate() === i + 1
    );
    return {
      date: format(date, 'MMM d'),
      amount: calculateTotalExpenses(dayExpenses)
    };
  });
  
  // Colors for charts
  const COLORS = ['#475569', '#64748b', '#94a3b8', '#cbd5e1', '#e2e8f0', '#f1f5f9', '#f8fafc'];
  
  // Check if user is overspending
  const isOverspending = totalExpenses > budget.monthly * 0.8;
  const isOnTrack = totalExpenses <= budget.monthly * 0.5;

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-black min-h-screen">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="col-span-full"
          whileHover={{ scale: 1.01 }}
        >
          <Card className="border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                Budget Overview
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Your budget usage for {format(currentDate, 'MMMM yyyy')}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300">Used: ₹{totalExpenses.toLocaleString()}</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Remaining: ₹{remainingBudget.toLocaleString()}
                  </span>
                </div>
                
                <Progress 
                  value={percentageUsed} 
                  className="h-2.5 bg-gray-200 dark:bg-gray-700"
                  style={{
                    background: percentageUsed > 80 ? 'rgb(239 68 68)' : 
                              percentageUsed > 60 ? 'rgb(234 179 8)' : 
                              'rgb(59 130 246)'
                  }}
                />
                
                <div className={`flex items-center gap-2 text-sm ${
                  budgetStatus === 'danger' ? 'text-red-500' : 
                  budgetStatus === 'warning' ? 'text-yellow-500' : 
                  'text-blue-500'
                }`}>
                  {isOverspending ? (
                    <>
                      <AlertTriangle className="h-4 w-4" />
                      <span>You are overspending based on your monthly budget</span>
                    </>
                  ) : isOnTrack ? (
                    <>
                      <TrendingUp className="h-4 w-4" />
                      <span>Great job! You're on track with your budget</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-4 w-4" />
                      <span>You're spending more than usual</span>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-base font-medium text-gray-900 dark:text-gray-100">Monthly Budget</CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-400">Total budget for this month</CardDescription>
              </div>
              <Wallet className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">₹{budget.monthly.toLocaleString()}</div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-base font-medium text-gray-900 dark:text-gray-100">Total Expenses</CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-400">Money spent this month</CardDescription>
              </div>
              <DollarSign className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">₹{totalExpenses.toLocaleString()}</div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-base font-medium text-gray-900 dark:text-gray-100">Daily Limit</CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-400">Budget per day ({daysInCurrentMonth} days)</CardDescription>
              </div>
              <Calculator className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">₹{Math.round(dailyBudget).toLocaleString()}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Based on {format(currentDate, 'MMMM')} having {daysInCurrentMonth} days
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {categoryData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            whileHover={{ scale: 1.01 }}
          >
            <Card className="border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 h-[400px] bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-900 dark:text-gray-100">Expense Breakdown</CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-400">Spending by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => `₹${Number(value).toLocaleString()}`}
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '1px solid #374151',
                          borderRadius: '6px',
                          padding: '8px',
                          color: '#f3f4f6'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          whileHover={{ scale: 1.01 }}
        >
          <Card className="border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 h-[400px] bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-base font-medium text-gray-900 dark:text-gray-100">Daily Expenses</CardTitle>
              <CardDescription className="text-sm text-gray-600 dark:text-gray-400">Spending trend this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyExpenses}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#9ca3af" 
                      fontSize={12}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#9ca3af" 
                      fontSize={12}
                      tickLine={false}
                      tickFormatter={(value) => `₹${value}`}
                    />
                    <Tooltip 
                      formatter={(value) => `₹${Number(value).toLocaleString()}`}
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '6px',
                        padding: '8px',
                        color: '#f3f4f6'
                      }}
                    />
                    <Bar 
                      dataKey="amount" 
                      fill="#475569"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
