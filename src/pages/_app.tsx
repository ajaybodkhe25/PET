import { ClerkProvider } from '@clerk/nextjs';
import type { AppProps } from 'next/app';
import { dark } from '@clerk/themes';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
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
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp; 