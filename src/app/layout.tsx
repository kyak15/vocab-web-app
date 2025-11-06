import TopNavBar from "./components/molecules/TopNavBar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        <TopNavBar/>
        {children}
      </body>
    </html>
  );
}
