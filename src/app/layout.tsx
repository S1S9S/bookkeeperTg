import type { Metadata } from "next";
import { rubik } from "./ui/fonts";
import "./ui/globals.css";
import Navbar from "./ui/navigation/navbar";


export const metadata: Metadata = {
  title: "BookKeeper",
  description: "Best bookkeeping app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="RU">
      <body className="min-h-screen bg-[#19191a] text-[#E6E8E6]">
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">{children}</div>
          <Navbar />
        </div>
      </body>
    </html>
  );
}
