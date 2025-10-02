"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import styles from "@/app/styles/ProductDetail.module.css";
import { useCart } from "@/app/components/CartContext";
import ProductSection from "@/app/components/ProductSection";

export default function ProductDetailPage({ params }) {
  const { id } = React.use(params);
  const productId = parseInt(id); 
  
  const [product, setProduct] = useState(null);
  const [currentMainImage, setCurrentMainImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [moreProducts, setMoreProducts] = useState([]);
  
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      
      try {

        if (isNaN(productId)) throw new Error("ID do produto inválido");
        
        const response = await fetch(`/api/products/${productId}`, {
          cache: "force-cache",
          next: { revalidate: 3600 },
        });
        
        if (response.status === 404) throw new Error("Produto não encontrado");
        if (!response.ok) throw new Error("Falha ao carregar produto");
        
        const productData = await response.json();
        setProduct(productData);
        const defaultImage = productData.mainImage 
          ? productData.mainImage 
          : productData.thumbnailImages?.[0] || "/images/placeholder.png";
        setCurrentMainImage(defaultImage);
        
        console.log("Dados do produto carregados:", productData);
        console.log("Imagem principal definida:", defaultImage);
        
      } catch (error) {
        console.error("Erro ao carregar produto:", error.message);
        setError(error.message);
        if (error.message === "Produto não encontrado") notFound();
        
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Falha ao carregar produtos');
        const data = await res.json();
        setMoreProducts(data);
      } catch (err) {
        console.error('Erro ao carregar produtos relacionados:', err);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <main className={styles.detailContainer}>
        <div className={styles.loadingState}>
          <div className={styles.imageSkeleton}></div>
          <p>Carregando produto...</p>
        </div>
      </main>
    );
  }

  if (error && error !== "Produto não encontrado") {
    return (
      <main className={styles.detailContainer}>
        <div className={styles.errorState}>
          <p className={styles.errorText}>❌ {error}</p>
          <button 
            className={styles.retryButton} 
            onClick={() => window.location.reload()}
          >
            Tentar novamente
          </button>
          <button 
            className={styles.backButton} 
            onClick={() => window.history.back()}
            style={{ marginTop: "0.5rem" }}
          >
            Voltar para a página anterior
          </button>
        </div>
      </main>
    );
  }

  if (!product) return null;

  const handleThumbnailClick = (thumbnail) => {
    setCurrentMainImage(thumbnail || "/images/placeholder.png");
  };

  const handleBuy = () => {
    if (!product) return;
    addToCart(product, false);
    router.push("/checkout");
  };

  return (
    <main className={styles.detailContainer}>
      <div>
        <div className={styles.backButtonContainer}>
          <button
            className={styles.backButton}
            onClick={() => window.history.back()}
            aria-label="Voltar para a página anterior"
          >
            <Image
              src="/images/backbtn.png"
              alt="Ícone voltar"
              width={17}
              height={15}
              objectFit="cover"
              onError={(e) => e.target.src = "/images/placeholder.png"}
            />
            <span>VOLTAR</span>
          </button>
        </div>

        <div className={styles.productContainer}>
          <div className={styles.imagesContainer}>
            <div className={styles.thumbnailsContainer}>
              {product.thumbnailImages?.length > 0 ? (
                product.thumbnailImages.map((thumbnail, idx) => (
                  <div
                    key={idx}
                    className={styles.thumbnailItem}
                    onClick={() => handleThumbnailClick(thumbnail)}
                    aria-label={`Ver imagem ${idx + 1} de ${product.thumbnailImages.length}`}
                  >
                    <Image
                      src={thumbnail || "/images/placeholder.png"}
                      alt={`Thumbnail ${idx + 1} - ${product.name}`}
                      width={150}
                      height={150}
                      objectFit="cover"
                      onError={(e) => {
                        e.target.src = "/images/placeholder.png";
                        console.warn(`Thumbnail ${idx + 1} falhou ao carregar`);
                      }}
                    />
                  </div>
                ))
              ) : (
                <div className={styles.thumbnailItem}>
                  <Image
                    src={currentMainImage}
                    alt={`Thumbnail - ${product.name}`}
                    width={150}
                    height={150}
                    objectFit="cover"
                  />
                </div>
              )}
            </div>

            <div className={styles.mainImageContainer}>
              <Image
                src={currentMainImage}
                alt={product.name}
                width={500}
                height={500}
                objectFit="cover"
                onError={(e) => {
                  e.target.src = "/images/placeholder.png";
                  console.warn("Imagem principal falhou ao carregar");
                }}
              />
            </div>
          </div>

          <div className={styles.infoArea}>
            <h1 className={styles.productName}>{product.name || "Nome do produto"}</h1>

            <div className={styles.creatorContainer}>
              <Image
                src={product.profile || "/images/profile-default.png"}
                alt={`Avatar de ${product.creator || "Criador"}`}
                width={30}
                height={30}
                objectFit="cover"
                className={styles.creatorAvatar}
                onError={(e) => e.target.src = "/images/profile-default.png"}
              />
              <div className={styles.creatorInfo}>
                <span className={styles.creatorName}>{product.creator || "Criador desconhecido"}</span>
                <span className={styles.likesCount}>
                  {product.likes || 0}k
                  <svg
                    width="11"
                    height="10"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M2.16665 15.6252H2.95831V5.3335H2.16665C1.74672 5.3335 1.34399 5.50031 1.04706 5.79724C0.750128 6.09418 0.583313 6.4969 0.583313 6.91683V14.0418C0.583313 14.4618 0.750128 14.8645 1.04706 15.1614C1.34399 15.4583 1.74672 15.6252 2.16665 15.6252ZM14.8333 5.3335H9.29165L10.1799 2.66716C10.2592 2.4292 10.2807 2.17581 10.2429 1.92787C10.205 1.67993 10.1088 1.44452 9.96217 1.24105C9.81552 1.03758 9.62262 0.871854 9.39938 0.757533C9.17613 0.643211 8.92892 0.583561 8.6781 0.583496H8.49998L4.54165 4.88858V15.6252H13.25L16.347 8.82L16.4166 8.50016V6.91683C16.4166 6.4969 16.2498 6.09418 15.9529 5.79724C15.656 5.50031 15.2532 5.3335 14.8333 5.3335Z"
                      fill="white"
                      fillOpacity="0.85"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {product.vip && <span className={styles.vipBadge}>VIP</span>}
            
            <p className={styles.price}>{product.price || "R$ 0,00"}</p>

            <div className={styles.actionsContainer}>
              <button 
                className={styles.buyButton} 
                onClick={handleBuy}
                disabled={!product}
                aria-label="Comprar agora e ir para checkout"
              >
                <Image
                  src="/images/btnBuy.png"
                  alt="Botão comprar agora"
                  width={120}
                  height={40}
                  objectFit="contain"
                  onError={(e) => {
                    e.target.parentElement.textContent = "Comprar";
                    e.target.remove();
                  }}
                />
              </button>
              <button
                className={styles.addToCartButton}
                onClick={() => addToCart(product)}
                disabled={!product}
                aria-label="Adicionar ao carrinho"
              >
                <Image
                  src="/images/btnAddCart.png"
                  alt="Botão adicionar ao carrinho"
                  width={287}
                  height={40}
                  objectFit="contain"
                  onError={(e) => {
                    e.target.parentElement.textContent = "Adicionar ao Carrinho";
                    e.target.remove();
                  }}
                />
              </button>
            </div>

            <p className={styles.description}>
              {product.description || "Não há descrição disponível para este produto."}
            </p>
          </div>
        </div>
      </div>

      {moreProducts.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <ProductSection products={moreProducts} title="Você também pode gostar" />
        </div>
      )}
    </main>
  );
}