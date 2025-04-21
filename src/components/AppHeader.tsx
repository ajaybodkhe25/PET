import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function AppHeader() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="h-16 border-b border-gray-700 bg-black fixed top-0 left-0 right-0 z-50">
      <div className="h-full px-4 md:px-6 flex items-center justify-between max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="relative h-10 w-10">
            <img
              src="/PET.png"
              alt="PET Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-100">
              PET
            </span>
            <span className="text-xs text-gray-400 font-medium">
              PERSONAL EXPENSE TRACKER
            </span>
          </div>
        </motion.div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-gray-100 hover:bg-gray-800"
              onClick={logout}
            >
              Logout
            </Button>
          ) : (
            <>
              <Link to="/sign-up">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-gray-100 hover:bg-gray-800"
                >
                  Sign Up
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-gray-100 hover:bg-gray-800"
                >
                  Login
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
} 