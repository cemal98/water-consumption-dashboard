"use client";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { FC, useState, useEffect } from "react";
import { Inter } from "next/font/google";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-inter",
});

const queryClient = new QueryClient();

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>WaterDashboard</title>
      </Head>
      <main className={`${inter.variable} font-inter`}>
        <div className="flex h-screen">
          <div className="h-full w-full overflow-auto">
            <Component {...pageProps} />
          </div>
        </div>
      </main>
    </QueryClientProvider>
  );
};

export default App;
