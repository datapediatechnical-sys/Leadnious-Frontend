import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LeadGenius Login",
  description: "Secure sign-in for the LeadGenius intelligence platform",
};

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const silenceStrings = [
                  'platform-telemetry', 
                  'li/apfcDf', 
                  'MutationObserver', 
                  'visitor.publishDestinations', 
                  'WebGL context', 
                  'WebGL contexts', 
                  'preloaded using link preload',
                  'link rel=preload',
                  'ERR_BLOCKED_BY_CLIENT',
                  'Failed to load resource',
                  'parameter 1 is not of type \'Node\'',
                  'unload is not allowed',
                  'Permissions policy violation',
                  'Self-XSS',
                  'attackers to impersonate you',
                  'Do not enter or paste code',
                  'permissions policy',
                  'violation'
                ];
                
                function shouldSilence(args) {
                  try {
                    return args.some(arg => {
                      if (!arg) return false;
                      const str = String(arg).toLowerCase();
                      return silenceStrings.some(s => str.includes(s.toLowerCase()));
                    });
                  } catch (e) { return false; }
                }

                ['log', 'warn', 'error', 'info', 'debug', 'dir', 'table', 'trace'].forEach(method => {
                  const orig = console[method];
                  if (typeof orig === 'function') {
                    console[method] = function(...args) {
                      if (shouldSilence(args)) return;
                      orig.apply(console, args);
                    };
                  }
                });

                setTimeout(() => console.clear(), 100);
                setTimeout(() => console.clear(), 500);

                // Catch uncaught exceptions
                window.addEventListener('error', function(e) {
                  if (shouldSilence([e.message, e.filename, e.error])) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                  }
                }, true);

                // Catch uncaught promise rejections
                window.addEventListener('unhandledrejection', function(e) {
                  if (shouldSilence([e.reason])) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                  }
                }, true);
              })();
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
