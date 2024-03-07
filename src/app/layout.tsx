import Head from "next/head";
import type { Metadata } from "next";
import { inter } from "@/util/fonts";
import "./styling/globals.scss";

// Imports
import Header from "@/components/non-reusable/header/HeaderComponent";
import Footer from "@/components/non-reusable/FooterComponent";

export const metadata: Metadata = {
  title: "Blog App",
  description: "Created by Noah Nielsen",
};

export default function RootLayout({
  children,
  title = "Forside",
}: Readonly<{
  children: React.ReactNode;
  title?: string;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>{`${title} | Blog Side`}</title>
      </Head>
      <body className={(inter.className, "min-h-screen flex flex-col")}>
        <Header title={title} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
