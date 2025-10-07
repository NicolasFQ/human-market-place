import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Landing.module.css';

import { Press_Start_2P, Inter } from 'next/font/google';

const pressStart2P = Press_Start_2P({
  subsets: ['latin'],
  weight: '400'
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '400', '700'],
});

export default function Intro() {
  return (
    <div className={`${styles.bg} landingPage`}>
      <div className={styles.containerBody}>
        <div className={styles.leftInfo}>
          <h1 className={pressStart2P.className}>a</h1>
          <h1 className={pressStart2P.className}>HUMANIDADE</h1>
          <h1 className={pressStart2P.className}>IMPORTA</h1>
          <h3 className={inter.className}>Crie, personalize e compartilhe seus visuais únicos em um mundo cyberpunk. Seu estilo, suas regras!</h3>
          <Link href="/home" className={styles.lojabtn}>
            <Image src="/images/lojaButon.png" className={styles.btn} alt="Loja Botão" width={230} height={70} />
          </Link>
        </div>
        <div className={styles.rightInfo}>
          <Link href="/plans">
            <Image src="/images/planCard.png" className={styles.plan} alt='plano de dinheiro' width={1000} height={1000} />
            <Image src="/images/characters.png" className={styles.characters} alt='personagens do jogo' width={1000} height={1000} />
          </Link>
        </div>
      </div>
    </div>
  );
}
