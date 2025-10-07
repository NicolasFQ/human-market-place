"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../ai-global.css';
import styles from './CharacterSelection.module.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function AICharacterSelectionPage() {
  const router = useRouter();
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleGoBack = () => {
    router.push('/home');
  };

  const handleCharacterSelect = (characterName) => {
    setSelectedCharacter(characterName);
    localStorage.setItem("personagemSelecionado", characterName.toLowerCase());
  };

  const handleContinue = () => {
    if (selectedCharacter) {
      router.push('/ai-visual-creator');
    }
  };

  const characters = [
    { name: 'Ana Clara', image: '/HUMAN.EXE-IA-main/assets/ana.png', dataName: 'Ana Clara' },
    { name: 'Winny', image: '/HUMAN.EXE-IA-main/assets/winny.png', dataName: 'Winny' },
    { name: 'Yasmin', image: '/HUMAN.EXE-IA-main/assets/yas.png', dataName: 'Yasmin' },
    { name: 'Vitor', image: '/HUMAN.EXE-IA-main/assets/vitor.png', dataName: 'Vitor' },
    { name: 'Nicolas', image: '/HUMAN.EXE-IA-main/assets/nicolas.png', dataName: 'Nicolas' }
  ];

  const characterColors = {
    "ana clara": "#ff299c",
    "nicolas": "#3cee8c",
    "yasmin": "#35f2df",
    "winny": "#6e00f5",
    "vitor": "#003ba9"
  };

  useEffect(() => {
    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      // GSAP animations
      const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power2.out" } });
      
      // Check if elements exist before animating
      const visualIconImg = document.querySelector(`.${styles.visualIcon} img`);
      const subtitle = document.querySelector(`.${styles.subtitle}`);
      const charElements = document.querySelectorAll(`.${styles.char}`);
      const continueBtn = document.getElementById("continue-btn");

      if (visualIconImg) {
        tl.from(visualIconImg, { scale: 0, rotate: 45, opacity: 0 });
      }
      
      if (subtitle) {
        tl.from(subtitle, { opacity: 0, y: 40 });
      }
      
      if (charElements.length > 0) {
        tl.from(charElements, { opacity: 0, scale: 1.0, stagger: 0.2 });
      }

      // Character hover animations
      charElements.forEach(char => {
        char.addEventListener("mouseenter", () => {
          gsap.to(char, { scale: 1.15, duration: 0.3, ease: "back.out(2)" });
        });
        
        char.addEventListener("mouseleave", () => {
          if (!char.classList.contains(styles.selected)) {
            gsap.to(char, { scale: 1, duration: 0.3, ease: "power2.out" });
          }
        });
      });

      // Continue button animation
      if (continueBtn) {
        gsap.from(continueBtn, {
          scrollTrigger: {
            trigger: continueBtn,
            start: "top 90%",
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out"
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.body}>

      <main className={styles.content}>
        <div className={styles.back} onClick={handleGoBack}>
          <span><Image src="/HUMAN.EXE-IA-main/assets/seta.png" alt="Voltar" width={20} height={20} />VOLTAR</span>
        </div>
        <div className={styles.limit}>USOS RESTANTES: 3</div>

        <div className={styles.visualIcon}>
          <Image 
            src="/HUMAN.EXE-IA-main/assets/robo.png" 
            alt="Item visual" 
            width={150} 
            height={150}
          />
        </div>

        <h2 className={styles.subtitle}>
          SELECIONE O PERSONAGEM QUE VOCÊ DESEJA CRIAR UM VISUAL ÚNICO
        </h2>

        <div className={styles.characters}>
          {characters.map((char) => (
            <div
              key={char.dataName}
              className={`${styles.char} ${selectedCharacter === char.dataName ? styles.selected : ''}`}
              onClick={() => handleCharacterSelect(char.dataName)}
              data-name={char.dataName}
            >
              <Image
                src={char.image}
                alt={char.name}
                width={90}
                height={90}
                style={{
                  borderColor: selectedCharacter === char.dataName ? characterColors[char.dataName.toLowerCase()] : '',
                  filter: selectedCharacter === char.dataName ? `drop-shadow(0 0 2px ${characterColors[char.dataName.toLowerCase()]}) drop-shadow(0 0 4px ${characterColors[char.dataName.toLowerCase()]})` : ''
                }}
              />
              <p>{char.name.toUpperCase()}</p>
            </div>
          ))}
        </div>

        <div id="continue-btn" className={`${styles.continue} ${selectedCharacter ? '' : styles.hidden}`}>
          <button onClick={handleContinue}>
            <Image
              src="/HUMAN.EXE-IA-main/assets/continuar.png"
              alt="Continuar"
              width={180}
              height={50}
            />
          </button>
        </div>
      </main>
    </div>
  );
}
