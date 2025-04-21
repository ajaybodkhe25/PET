import { useState, useEffect } from 'react';
import { ExpenseProvider } from '@/contexts/ExpenseContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import AppHeader from '@/components/AppHeader';
import ExpenseDashboard from '@/components/ExpenseDashboard';
import BudgetSetupForm from '@/components/BudgetSetupForm';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseHistory from '@/components/ExpenseHistory';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Set light mode as default
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, []);
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <ExpenseDashboard />;
      case 'budget':
        return <BudgetSetupForm />;
      case 'expense':
        return <ExpenseForm />;
      case 'history':
        return <ExpenseHistory />;
      default:
        return <ExpenseDashboard />;
    }
  };

  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-white dark:bg-black">
        <SidebarProvider>
          <div className="min-h-screen flex flex-col w-full">
            <AppHeader />
            <div className="flex flex-1 mt-16">
              <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
              <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto bg-white dark:bg-black">
                <div className="container max-w-6xl mx-auto">
                  <motion.div 
                    className="mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {activeTab === 'dashboard' && 'Dashboard Overview'}
                      {activeTab === 'budget' && 'Budget Management'}
                      {activeTab === 'expense' && 'Add New Expense'}
                      {activeTab === 'history' && 'Expense History'}
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {activeTab === 'dashboard' && 'Track your spending and budget at a glance'}
                      {activeTab === 'budget' && 'Set and manage your monthly budget'}
                      {activeTab === 'expense' && 'Record your daily expenses'}
                      {activeTab === 'history' && 'View and analyze your past expenses'}
                    </p>
                  </motion.div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="shadow-lg rounded-lg bg-white dark:bg-gray-900"
                    >
                      {renderTabContent()}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </ExpenseProvider>
  );
};

export default Index;
