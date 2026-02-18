import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import Navbar from "@/components/common/navbar";
import { ReactProviders } from "@/providers/react-query-provider";

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Leplit",
  description: "Your custom ide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider>
        <ReactProviders>
          <body className={`${space.variable} ${space.variable} antialiased`}>
            <Navbar />
            <div className="mt-10">{children}</div>
          </body>
        </ReactProviders>
      </ThemeProvider>
    </html>
  );
}
