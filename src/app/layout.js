"use client";
import React from'react';
import { Inter, Press_Start_2P, Silkscreen } from 'next/font/google';
import Header from './components/Header';
import './globals.css';
import { CartProvider } from "./components/CartContext";
import CartSidebar from "./components/CartSidebar";
import { usePathname } from 'next/navigation';

const inter = Inter({
  weight: ['300', '400', '600', '800'],
  subsets: ['latin'],
  variable: '--font-inter'
});

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start'
});

const silkscreen = Silkscreen({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-silkscreen'
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="pt-br">
      <body className={`${inter.className} ${inter.variable} ${pressStart2P.variable} ${silkscreen.variable}`}>
        <CartProvider>
          {pathname !== '/landing' && <Header />}
          
          {children}
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}