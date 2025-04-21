import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/sign-up";
import NotFound from "./pages/NotFound";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

const queryClient = new QueryClient();

const App = () => (
  <ClerkProvider 
    publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
    appearance={{
      baseTheme: dark,
      variables: {
        colorPrimary: "#3b82f6",
        colorBackground: "#1f2937",
        colorText: "#f3f4f6",
        colorTextSecondary: "#9ca3af",
        colorInputBackground: "#374151",
        colorInputText: "#f3f4f6",
      },
      elements: {
        card: "bg-gray-800 border-gray-700",
        headerTitle: "text-gray-100",
        headerSubtitle: "text-gray-400",
        socialButtonsBlockButton: "bg-gray-700 border-gray-600 hover:bg-gray-600",
        socialButtonsBlockButtonText: "text-gray-100",
        formFieldLabel: "text-gray-300",
        formFieldInput: "bg-gray-700 border-gray-600 text-gray-100",
        formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
        footerActionLink: "text-blue-400 hover:text-blue-300",
        dividerLine: "bg-gray-700",
        dividerText: "text-gray-400",
      },
    }}
  >
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </ClerkProvider>
);

export default App;
