"use client";
import React from "react";
import Image from "next/image";
import { useCart } from "@/app/components/CartContext";
import { useRouter } from "next/navigation";
import styles from "../styles/Checkout.module.css";

export default function CheckoutPage() {
  const { cartItems, clearCart, closeCart } = useCart();
  const router = useRouter();

  const calculateOriginalPrice = () => {
  return cartItems
   .reduce((total, skin) => {
      const originalPrice = skin.originalPrice || skin.price || "0";
      const price = parseFloat(originalPrice.replace(/[^\d,]/g, "").replace(",", "."));
      return total + price;
    }, 0)
   .toFixed(2);
};

  const calculateDiscount = () => {
    const originalTotal = parseFloat(calculateOriginalPrice());
    const currentTotal = parseFloat(
      cartItems
       .reduce((total, skin) => {
          const price = parseFloat(skin.price.replace(/[^\d,]/g, "").replace(",", "."));
          return total + price;
        }, 0)
       .toFixed(2)
    );
    return (originalTotal - currentTotal).toFixed(2);
  };

  const calculateTotal = () => {
    return cartItems
     .reduce((total, skin) => {
        const price = parseFloat(skin.price.replace(/[^\d,]/g, "").replace(",", "."));
        return total + price;
      }, 0)
     .toFixed(2);
  };

  const handlePaymentSuccess = () => {
  console.log("结算页-当前购物车商品:", cartItems); 
  localStorage.setItem("purchasedItems", JSON.stringify(cartItems));
  const savedItems = localStorage.getItem("purchasedItems");
  console.log("结算页-存到localStorage的数据:", savedItems ? JSON.parse(savedItems) : "没存进去");
  
  clearCart(); 
  closeCart();
  router.push("/payment-success");
};


  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCheckout}>
        <h2 className={styles.emptyTitle}>Finalizando pagamento...</h2>
       
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>

      <div className={styles.container}>
        <button
            className={styles.backBtn}
            onClick={() => router.back()}
        >
            <Image
                src="/images/backbtn.png"
                alt="botão voltar"
                width={17}
                height={15}
                objectFit="cover"
            />
            <h1 className={styles.pageTitle}>COMPRAR</h1>
        </button>

        <div className={styles.contentGrid}>
          <div className={styles.skinList}>
            {cartItems.map((skin) => (
              <div
                key={skin.id}
                className={styles.skinItem}
              >
                <div className={styles.skinInfo}>
                  <Image
                    src={skin.mainImage}
                    alt={skin.name}
                    width={80}
                    height={80}
                    className={styles.skinImage}
                  />
                  <div className={styles.skinText}>
                    <h3 className={styles.skinName}>{skin.name}</h3>
                    <p className={styles.skinCreator}>criado por {skin.creator}</p>
                  </div>
                </div>
                <div className={styles.skinPriceWrap}>
                  {skin.originalPrice && skin.originalPrice!== skin.price? (
                    <div>
                      <span className={styles.originalPrice}>{skin.originalPrice}</span>
                      <span className={styles.discountedPrice}>{skin.price}</span>
                    </div>
                  ) : (
                    <span className={styles.normalPrice}>{skin.price}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.paymentSidebar}>
            <h2 className={styles.sectionTitle}>FORMA DE PAGAMENTO</h2>

            <div className={styles.paymentOptions}>
              <label className={styles.paymentOption}>
                <input type="radio" name="payment" className={styles.paymentRadio} />
                <span className={styles.paymentOptionText}>
                  <Image
                      src="/images/payment1.png"
                      alt="botão voltar"
                      width={38}
                      height={23}
                      objectFit="cover"
                  />
                  Card Pay ---1234
                </span>
              </label>

              <label className={styles.paymentOption}>
                <input type="radio" name="payment" className={styles.paymentRadio} />
                <span className={styles.paymentOptionText}>
                  <Image
                      src="/images/payment2.png"
                      alt="botão voltar"
                      width={38}
                      height={23}
                      objectFit="cover"
                  />
                  Card Pay ---1234
                </span>
              </label>

              <label className={styles.paymentOption}>
                <input type="radio" name="payment" className={styles.paymentRadio} />
                <span className={styles.paymentOptionText}>
                  <Image
                      src="/images/payment3.png"
                      alt="botão voltar"
                      width={36}
                      height={23}
                      objectFit="cover"
                  />
                  PIX
                </span>
              </label>

              <button className={styles.addPaymentBtn}>
                + Adicionar forma de pagamento
              </button>
            </div>

            <h2 className={styles.sectionTitle}>PEDIDO</h2>

            <div className={styles.orderSummary}>
              <div className={styles.orderItem}>
                <span>Preço Original</span>
                <span>R$ {calculateOriginalPrice().replace(".", ",")}</span>
              </div>
              <div className={styles.orderItem + " " + styles.discountItem}>
                <span>Desconto</span>
                <span>- R$ {calculateDiscount().replace(".", ",")}</span>
              </div>
              <hr className={styles.divider} />
              <div className={styles.orderItem + " " + styles.totalItem}>
                <span>TOTAL</span>
                <span>R$ {calculateTotal().replace(".", ",")}</span>
              </div>
            </div>

            <button
              className={styles.checkoutBtn}
              onClick={handlePaymentSuccess}
            >
              FINALIZAR COMPRA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}