import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; 
import styles from '../styles/ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { id, vip, mainImage, name, price, discount } = product;

  const cardClasses = vip 
    ? `${styles.productCard} ${styles.vipProduct}`
    : styles.productCard;

  const detailPageUrl = `/product/${id}`;

  return (
    <div className={cardClasses}>
      <div className={styles.labelContainer}>
        {discount > 0 && (
          <span className={styles.discountLabel}>-{discount}%</span>
        )}
        {vip && (
          <div className={styles.vipWrapper}>
            <span className={styles.vipLabel}>VIP</span>
          </div>
        )}
      </div>
      
      <div className={styles.cardContent}>
        <h3 className={styles.productName}>{name}</h3>

        <div className={styles.productImageContainer}>
          <Image
            src={mainImage}
            alt={name}
            fill
            objectFit="contain"
            className={styles.productImage}
          />
        </div>

        <p className={styles.productPrice}>{price}</p>
       
        <Link href={detailPageUrl} className={styles.buyLink}>
          <button 
            className={styles.buyButton} 
            aria-label={`Ir para página do produto: ${name}`}
          >
            <Image
              src="/images/btnBuy.png"
              alt="Botão de compra"
              width={120}
              height={40}
              objectFit="contain"
            />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;