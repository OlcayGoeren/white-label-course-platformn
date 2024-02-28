import { CounterContextProvider } from "@/context/sidenav.context";
import "./globals.css";
import Providers from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body>
          <CounterContextProvider>
            {children}
          </CounterContextProvider>
        </body>
      </Providers>
    </html>
  );
}
