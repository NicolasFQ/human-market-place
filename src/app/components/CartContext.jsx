"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart 必须在 CartProvider 内使用");
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [addTip, setAddTip] = useState("");

  useEffect(() => {
    const savedSkins = localStorage.getItem("gameSkinCart");
    if (savedSkins) setCartItems(JSON.parse(savedSkins));
  }, []);

  useEffect(() => {
    localStorage.setItem("gameSkinCart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (addTip) {
      const timer = setTimeout(() => setAddTip(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [addTip]);

  const addToCart = (skin, shouldOpenSidebar = true) => {
    const isAlreadyInCart = cartItems.some((item) => item.id === skin.id);
    if (isAlreadyInCart) {
      if (shouldOpenSidebar) setIsCartSidebarOpen(true);
      return;
    }
    setCartItems((prev) => [...prev, { ...skin }]);
    if (shouldOpenSidebar) setIsCartSidebarOpen(true);
  };

  const removeFromCart = (skinId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== skinId));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("gameSkinCart");
  };

  const toggleCart = () => setIsCartSidebarOpen((prev) => !prev);
  const closeCart = () => setIsCartSidebarOpen(false);

  const skinCount = cartItems.length;
  const itemCount = skinCount;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartSidebarOpen,
        addToCart,
        removeFromCart,
        clearCart,
        toggleCart,
        closeCart,
        skinCount,
        itemCount,
        addTip,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
