"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/PaymentSuccess.module.css";

export default function PaymentSuccessPage() {
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem("purchasedItems");
        if (saved) {
          setPurchasedItems(JSON.parse(saved) || []);
        }
      }
    } catch (err) {
      setError("Ocorreu um problema ao carregar os dados da compra");
      console.error("Erro ao ler localStorage:", err);
    }
  }, []);

  useEffect(() => {
    if (purchasedItems.length === 0 || error) return;

    const fetchDetails = async () => {
      try {
        const updatedItems = await Promise.all(
          purchasedItems.map(async (item) => {
            if (!item.id) return item;
            
            const res = await fetch(`/api/products/${item.id}`);
            if (!res.ok) return item;
            
            const latestData = await res.json();
            return { ...item, ...latestData };
          })
        );
        setPurchasedItems(updatedItems);
      } catch (err) {
        console.error("Erro ao atualizar produtos:", err);
      }
    };

    fetchDetails();
  }, [purchasedItems, error]);

  const calculateTotal = () => {
    if (!purchasedItems.length) return "0,00";
    
    return purchasedItems
     .reduce((total, item) => {
        if (!item.price) return total;

        const cleanPrice = item.price.replace(/[^\d,]/g, "").replace(",", ".");
        const price = parseFloat(cleanPrice) || 0;
        return total + price;
      }, 0)
     .toFixed(2)
     .replace(".", ",");
  };

  if (error) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successHeader}>
          <h1 className={styles.successTitle}>Compra finalizada!</h1>
          <div className={styles.horizontalLine}></div>
        </div>
        
        <div className={styles.errorMessage}>{error}</div>
        
        <div className={styles.actionButtons}>
          <Link href="/home" className={styles.backHomeBtn}>
            Continuar Comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.successContainer}>
      <div className={styles.successHeader}>
        <h1 className={styles.successTitle}>Compra finalizada!</h1>
        <div className={styles.horizontalLine}></div>
      </div>

      <div className={styles.purchasedItemsSection}>
        <h2 className={styles.itemsTitle}>Resumo</h2>
        <div className={styles.itemsList}>
          {purchasedItems.length > 0? (
            purchasedItems.map((item) => (
              <div key={item.id || `item-${Date.now()}-${Math.random()}`} className={styles.itemCard}>
                <Image
                  src={item.mainImage || "/images/placeholder.png"}
                  alt={item.name || "Produto"}
                  width={60}
                  height={60}
                  objectFit="cover"
                  className={styles.itemImage}
                  onError={(e) => e.target.src = "/images/placeholder.png"}
                />
                <div className={styles.itemInfo}>
                  <div className={styles.productInfo}>
                    <h3 className={styles.itemName}>{item.name || "Nome do produto"}</h3>
                    {item.creator && (
                        <p className={styles.itemCreator}>por {item.creator}</p>
                    )}
                  </div>
                  <p className={styles.itemPrice}>{item.price || "R$ 0,00"}</p>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <p>Nenhum item na compra</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.orderTotalSection}>
        <span className={styles.totalLabel}>Total:</span>
        <span className={styles.totalValue}>R$ {calculateTotal()}</span>
      </div>

      <div className={styles.actionButtons}>
        <Link href="/home" className={styles.backHomeBtn}>
          Continuar Comprando
        </Link>
      </div>
    </div>
  );
}
    