"use client";
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Category from '../components/Category';
import Banner from '../components/Banner';
import ProductSection from '../components/ProductSection';
import CartSidebar from '../components/CartSidebar';
import '../globals.css';

const MarketplacePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Falha ao carregar produtos');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message || 'Ocorreu um erro inesperado');
        console.error('获取商品失败:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem', gap: '1rem' }}>
        <p style={{ color: 'red' }}>Erro: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div>
      <Category />
      <Banner />
      <ProductSection products={products} />
      <CartSidebar />
    </div>
  );
};

export default MarketplacePage;
