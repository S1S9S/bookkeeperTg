import { rubik } from "../ui/fonts"
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <html>
        <body className={`${rubik.className} antialiased`}>
          <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
        </body>
      </html>
    );
  }