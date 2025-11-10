// app/layout.tsx
import TopNavBar from "./components/molecules/TopNavBar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      {/* html gets height */}
      <body className="h-full min-h-screen flex flex-col">
        {/* body gets height + column */}
        <TopNavBar /> {/* stays in normal flow; use sticky/fixed as you like */}
        <main className="flex-1 min-h-0">
          {/* fills remaining height */}
          {children}
        </main>
      </body>
    </html>
  );
}
