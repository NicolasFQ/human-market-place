import React from'react';
import ProductCard from './ProductCard';
import styles from '../styles/ProductSection.module.css';

const ProductSection = ({ products, title = 'Populares' }) => {
  return (
    <section className={styles.productSection}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
          />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;