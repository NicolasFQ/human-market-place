"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '../styles/AIChatCreation.module.css';

export default function AIChatPage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.backButton}>
          <button
            className={styles.backButton}
            onClick={handleGoBack}
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
      </div>

      <div className={styles.card}>
        <h1>PRIMEIRA VEZ CRIANDO SEU PERSONAGEM?</h1>

        <div className={`${styles.group} ${styles.group1}`}>
          <img
            src="/images/ia_description1.png"
            alt="Personagem feminino com cabelo azul e roupa futurista"
            width={90}
          />
          <p>
            Selecione o personagem que você deseja criar um visual único. Ele vai ser a base para a sua criação.
          </p>
        </div>

        <div className={`${styles.group} ${styles.group2}`}>
          <p>
            Envie referências de como você imagina sua ideia, ou descreva para a nossa IA
          </p>
          <img
            src="/images/ia_description2.png"
            alt="Design de roupa com esboços e maçã verde"
          />
        </div>

        <div className={`${styles.group} ${styles.group3}`}>
          <img
            src="/images/ia_description3.png"
            alt="Acessório de cabeça com detalhes rosa e branco"
            width={200}
          />
          <p>
            Nossa IA vai criar um rascunho de acordo com suas referências
          </p>
        </div>

        <div className={`${styles.group} ${styles.group4}`}>
          <p>
            Após um processo de avaliação da nossa equipe, iremos transformar esse rascunho em uma Skin no jogo exclusivamente para você!
          </p>
          <img
            src="/images/ia_description4.png"
            alt="Personagem com vestuário elegante e detalhes místicos"
            width={150}
          />
        </div>

        <div className={styles.buttonContainer}>
          <button>
            <Image
              src="/images/confirmbtn.png"
              alt="botão confirmar"
              width={180}
              height={50}
              objectFit="cover"
            />
          </button>
        </div>
      </div>
    </div>
  );
}