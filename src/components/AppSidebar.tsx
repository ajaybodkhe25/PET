import { useExpense } from '@/contexts/ExpenseContext';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Progress } from "@/components/ui/progress";
import ThemeModeToggle from './ThemeModeToggle';
import { Home, CreditCard, History, Settings, RefreshCcw, Download, BarChart2, PieChart, Bell, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface AppSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AppSidebar({ activeTab, setActiveTab }: AppSidebarProps) {
  const { budget, resetMonth, currentMonthExpenses } = useExpense();
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  
  const totalExpenses = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const budgetProgress = (totalExpenses / budget.monthly) * 100;
  
  const handleExport = () => {
    if (currentMonthExpenses.length === 0) {
      alert('No expenses to export');
      return;
    }
    
    const headers = ['Name', 'Amount', 'Date', 'Category'];
    const rows = currentMonthExpenses.map(expense => [
      expense.name,
      expense.amount.toString(),
      expense.date,
      expense.category || ''
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `expense-export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <>
      <Sidebar className="border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 w-72 shadow-lg">
        <SidebarContent className="py-6 bg-white dark:bg-slate-900">
          <SidebarGroup>
            <SidebarGroupLabel className="px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent className="mt-2">
              <SidebarMenu>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      className={`flex items-center w-full px-6 py-2.5 text-sm font-medium transition-all rounded-lg ${
                        activeTab === 'dashboard' 
                          ? 'text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 shadow-md' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow'
                      }`}
                      onClick={() => setActiveTab('dashboard')}
                    >
                      <Home className={`h-4 w-4 mr-3 ${
                        activeTab === 'dashboard' ? 'text-slate-800 dark:text-slate-200' : 'text-slate-600 dark:text-slate-400'
                      }`} />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      className={`flex items-center w-full px-6 py-2.5 text-sm font-medium transition-all rounded-lg ${
                        activeTab === 'budget' 
                          ? 'text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 shadow-md' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow'
                      }`}
                      onClick={() => setActiveTab('budget')}
                    >
                      <Settings className={`h-4 w-4 mr-3 ${
                        activeTab === 'budget' ? 'text-slate-800 dark:text-slate-200' : 'text-slate-600 dark:text-slate-400'
                      }`} />
                      <span>Budget Setup</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      className={`flex items-center w-full px-6 py-2.5 text-sm font-medium transition-all rounded-lg ${
                        activeTab === 'expense' 
                          ? 'text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 shadow-md' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow'
                      }`}
                      onClick={() => setActiveTab('expense')}
                    >
                      <CreditCard className={`h-4 w-4 mr-3 ${
                        activeTab === 'expense' ? 'text-slate-800 dark:text-slate-200' : 'text-slate-600 dark:text-slate-400'
                      }`} />
                      <span>Add Expense</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      className={`flex items-center w-full px-6 py-2.5 text-sm font-medium transition-all rounded-lg ${
                        activeTab === 'history' 
                          ? 'text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 shadow-md' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow'
                      }`}
                      onClick={() => setActiveTab('history')}
                    >
                      <History className={`h-4 w-4 mr-3 ${
                        activeTab === 'history' ? 'text-slate-800 dark:text-slate-200' : 'text-slate-600 dark:text-slate-400'
                      }`} />
                      <span>Expense History</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="mt-6">
            <SidebarGroupLabel className="px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Tools
            </SidebarGroupLabel>
            <SidebarGroupContent className="mt-2">
              <SidebarMenu>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <SidebarMenuItem>
                    <Button 
                      variant="ghost" 
                      className="w-full px-6 py-2.5 justify-start text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow rounded-lg transition-all"
                      onClick={handleExport}
                    >
                      <Download className="h-4 w-4 mr-3" />
                      <span>Export Data</span>
                    </Button>
                  </SidebarMenuItem>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <SidebarMenuItem>
                    <Button 
                      variant="ghost" 
                      className="w-full px-6 py-2.5 justify-start text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow rounded-lg transition-all"
                      onClick={() => setResetDialogOpen(true)}
                    >
                      <RefreshCcw className="h-4 w-4 mr-3" />
                      <span>Reset Month</span>
                    </Button>
                  </SidebarMenuItem>
                </motion.div>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="p-6 space-y-4">
            <motion.div 
              className="space-y-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-800 dark:text-slate-200">Monthly Budget</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">₹{budget.monthly}</span>
              </div>
              <Progress 
                value={budgetProgress} 
                className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
                style={{
                  background: budgetProgress > 80 ? 'rgb(239 68 68)' : 
                            budgetProgress > 60 ? 'rgb(234 179 8)' : 
                            'rgb(71 85 105)'
                }}
              />
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Spent: ₹{totalExpenses}</span>
                <span>Remaining: ₹{Math.max(0, budget.monthly - totalExpenses)}</span>
              </div>
            </motion.div>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <ThemeModeToggle />
                <Button variant="ghost" size="icon" className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-500">v1.0.0</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      
      <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <AlertDialogContent className="bg-white dark:bg-slate-900 shadow-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-800 dark:text-slate-200">Reset Month</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600 dark:text-slate-400">
              This will delete all expenses for the current month. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-slate-700 dark:text-slate-300">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              resetMonth();
              setResetDialogOpen(false);
            }}>
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
