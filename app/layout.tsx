import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import ProviderLayout from "./Provider";

const inter = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Forms by Solve It Out",
  description: "Create Forms by Solve It Out - A google form Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderLayout>{children}</ProviderLayout>
      </body>
    </html>
  );
}
