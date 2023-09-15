"use client";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { GlobalStyle } from "../../styles/global";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalStyle />
      <Header />
      {children}
      <Footer />
    </>
  );
}
