import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "./globals.css";
import AuthProvider from "./auth/provider";
import ClientLayout from "./ClientLayout"; // Import the ClientLayout

const epilogue = Epilogue({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job List",
  description: "This is web App where job opportunities are shared.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="light" lang="en">
      <body className={epilogue.className}>
        <AuthProvider>
          <ClientLayout> 
            {children}
          </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
