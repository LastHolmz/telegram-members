import Header from "../components/header/header";
import { MobileNavigationBar } from "../components/bottom-navigation-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen w-full bg-secondary">
      <Header />
      <div className="flex-1">{children}</div>

      <MobileNavigationBar />
    </div>
  );
}
