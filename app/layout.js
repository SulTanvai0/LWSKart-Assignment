import { Inter } from "next/font/google";

import { Toaster } from "@/components/reactToast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LWSKart",
  description: "LWSKart A E-Commerce app",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
