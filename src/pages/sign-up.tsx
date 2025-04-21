import { SignUp } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { motion } from "framer-motion";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <SignUp 
          appearance={{
            baseTheme: dark,
            elements: {
              rootBox: "mx-auto",
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
            variables: {
              colorPrimary: "#3b82f6",
              colorBackground: "#1f2937",
              colorText: "#f3f4f6",
              colorTextSecondary: "#9ca3af",
              colorInputBackground: "#374151",
              colorInputText: "#f3f4f6",
            },
          }}
          redirectUrl="/login"
          afterSignUpUrl="/login"
        />
      </motion.div>
    </div>
  );
} 