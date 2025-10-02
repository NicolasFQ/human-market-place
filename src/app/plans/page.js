"use client";
import Image from 'next/image';
import styles from '../styles/Plans.module.css';

export default function PlansPage() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className={styles.container}>
      <div className={styles.backSection}>
        <button
            className={styles.backButton}
            onClick={() => window.history.back()}
          >
            <Image
                src="/images/backbtn.png"
                alt="botão voltar"
                width={17}
                height={15}
                objectFit="cover"
            />
          <span>VOLTAR</span>
          </button>
      </div>

      <div className={styles.headerText}>
        <h1>Seja exclusivo!</h1>
        <p>
          Sua compra valoriza a criatividade humana e abre portas para conteúdos exclusivos
        </p>
      </div>

      <div className={styles.cardsContainer}>
        <div className={`${styles.card} ${styles.commonPlan}`}>
          <h2>PLANO COMUM</h2>
          <div className={styles.price}>
            <span className={styles.currencySymbol}>R$</span>
            <span className={styles.amount}>0</span>
          </div>
          <div className={styles.currentPlanLabel}>SEU PLANO ATUAL</div>
          <ul className={styles.featuresList}>
            <li>Exploração de produtos básicos da comunidade</li>
            <li>Possibilidade de comprar itens simples</li>
            <li>Alertas de promoções gerais</li>
          </ul>
          <Image
            src="/images/Vitor_icon.png"
            alt="Personagem Plano Comum"
            width={220}
            height={480}
            objectFit="contain"
            className={styles.leftCharacter}
          />
        </div>

        <div className={`${styles.card} ${styles.exclusivePlan}`}>
          <h2>PLANO <span className={styles.exclusive}>EXCLUSIVO</span></h2>
          <div className={styles.price}>
            <span className={styles.currencySymbol}>R$</span>
            <span className={styles.amount}>15</span>
        </div>
          <button className={styles.ctaButton}>SER EXCLUSIVO</button>
          <ul className={styles.featuresList}>
            <li>IA Criadora de Produtos</li>
            <li>Descontos exclusivos em produtos premium</li>
            <li>Produtos e coleções limitadas antes de serem liberados no grátis</li>
            <li>Ferramenta de personalização avançada</li>
            <li>Geração de itens personalizados</li>
          </ul>
        </div>

        <div className={`${styles.card} ${styles.exclusivePlan2}`}>
          <h2>PLANO <span className={styles.exclusive}>EXCLUSIVO 2.0</span></h2>
          <div className={styles.price}>
            <span className={styles.currencySymbol}>R$</span>
            <span className={styles.amount}>30</span>
          </div>
          <button className={styles.ctaButton}>SER EXCLUSIVO</button>
          <ul className={styles.featuresList}>
            <li>IA Criadora de Produtos</li>
            <li>Descontos exclusivos em produtos premium</li>
            <li>Produtos e coleções limitadas antes de serem liberados no grátis</li>
            <li>Ferramenta de personalização avançada</li>
            <li>Geração de itens personalizados</li>
          </ul>
          <Image
            src="/images/Nicolas_icon.png"
            alt="Personagem Plano Exclusivo 2.0"
            width={280}
            height={460}
            objectFit="contain"
            className={styles.rightCharacter}
          />
        </div>
      </div>
    </div>
  );
}
    