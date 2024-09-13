import { rubik } from "../ui/fonts"
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={`${rubik.className} antialiased`}>
          <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="flex-grow md:overflow-y-auto">{children}</div>
        </div>
        </div>
    );
  }