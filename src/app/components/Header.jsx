"use client";
import React from'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Header.module.css'; 
import { useCart } from "./CartContext";

export default function Header() {
  const { toggleCart, itemCount, badgeRef } = useCart();
  
  return (
    <header className={styles.header}>
      <Link href="/home" className={styles.logoLink}>
        <div className={styles.logoContainer}>
          <Image
            src="/images/logo_human.png"
            alt="HUMAN.EXE Logo"
            width={150}
            height={40}
            priority
            className={styles.logo}
            style={{ objectFit: 'contain' }}
          />
        </div>
      </Link>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Procurar skins, acessórios, passes..."
        />
        <button className={styles.searchBtn}>
          <Image
            src="/images/search.png"
            alt="ícone de pesquisa"
            width={20}
            height={20}
          />
        </button>
      </div>
      
      <div className={styles.icons}>
        <Link 
          href="/ai-chat"  
          className={`${styles.iconItem} ${styles.chatLink}`}  
          style={{ cursor: 'pointer' }}
        >
          <Image
            src="/images/chat.png"
            alt="Chat com IA"
            width={30}
            height={30}
          />
        </Link>

        <span 
          className={`${styles.iconItem} ${styles.cartIcon}`} 
          onClick={toggleCart}
          style={{ cursor: 'pointer' }}
        >
          <Image
            src="/images/carrinho.png"
            alt="Carrinho"
            width={30}
            height={30}
          />
          {itemCount > 0 && (
            <span 
              className={styles.cartCount}
              ref={badgeRef}
            >
              {itemCount}
            </span>
          )}
        </span>

        <Link href="/plans" className={styles.iconItem}>
          <Image
            src="/images/exclusivo_icon.png"
            alt="Plano exclusivo"
            width={30}
            height={30}
          />
        </Link>

        <div className={styles.authdiv}>
          <button className={styles.authButton}>Login</button>
          <span style={{ margin: '0 5px', color: '#666' }}>|</span>
          <button className={styles.authButton}>Sign Up</button>
        </div>
      </div>
    </header>
  );
}