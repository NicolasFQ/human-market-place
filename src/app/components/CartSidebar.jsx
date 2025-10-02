"use client";
import React from "react";
import Image from "next/image";
import styles from "@/app/styles/CartSidebar.module.css";
import { useCart } from "./CartContext";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
  const {
    cartItems,
    isCartSidebarOpen,
    removeFromCart,
    closeCart,
    addTip
  } = useCart();
  
  const router = useRouter();

  const calculateTotal = () => {
    return cartItems
     .reduce((total, skin) => {
        const price = parseFloat(skin.price.replace(/[^\d,]/g, "").replace(",", "."));
        return total + price;
      }, 0)
     .toFixed(2);
  };

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <div
      className={`${styles.sidebarOverlay} ${isCartSidebarOpen? styles.active : ""}`}
      onClick={closeCart}
    >
      {addTip && <div className={styles.addTip}>{addTip}</div>}

      <div
        className={styles.sidebarContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.sidebarHeader}>
          <div className={styles.headerActions}>
            <button className={styles.closeButton} onClick={closeCart}>
              <Image
                    src="/images/backbtn.png"
                    alt="botão voltar"
                    width={17}
                    height={15}
                    objectFit="cover"
              />
            </button>
          </div>
          <h2>Meu Carrinho</h2>
        </div>

        <div className={styles.cartItemsContainer}>
          {cartItems.length === 0? (
            <div className={styles.emptyCartWrap}>
              <p className={styles.emptyCartMessage}>
                Seu carrinho está vazio no momento<br />
                Adicione produtos para começar suas compras!
              </p>
            </div>
          ) : (
            cartItems.map((skin) => (
              <div key={skin.id} className={styles.cartItem}>
                <div className={styles.itemImageContainer}>
                  <Image
                    src={skin.mainImage}
                    alt={skin.name}
                    width={80}
                    height={80}
                    objectFit="cover"
                  />
                </div>

                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>
                    {skin.name}
                    {skin.game && <span className={styles.gameTag}>{skin.game}</span>}
                  </h3>
                  <p className={styles.itemPrice}>{skin.price}</p>
                  {skin.rarity && (
                    <span className={`${styles.rarityTag} ${styles[`rarity-${skin.rarity}`]}`}>
                      {skin.rarity}
                    </span>
                  )}
                </div>

                <button
                  className={styles.removeButton}
                  onClick={() => removeFromCart(skin.id)}
                  aria-label={`移除 ${skin.name}`}
                >
                  <Image
                    src="/images/trashIcon.png"
                    alt="botão voltar"
                    width={17}
                    height={18}
                    objectFit="cover"
                  />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className={styles.cartSummary}>
            <div className={styles.totalContainer}>
              <span>Total ({cartItems.length} Itens)</span>
              <span className={styles.totalPrice}>
                R$ {calculateTotal().replace(".", ",")}
              </span>
            </div>
            <button 
              className={styles.checkoutButton}
              onClick={handleCheckout}
            >
              Finalizar compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
}