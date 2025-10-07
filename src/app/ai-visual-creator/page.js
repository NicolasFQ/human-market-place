"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../ai-global.css';
import styles from './VisualCreator.module.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function VisualCreatorPage() {
  const router = useRouter();
  const [selectedName, setSelectedName] = useState('Nenhum');
  const [chatMessages, setChatMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [awaitingAction, setAwaitingAction] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageModalSrc, setImageModalSrc] = useState('');
  const chatLogRef = useRef(null);
  const inputRef = useRef(null);
  const sendBtnRef = useRef(null);

  const N8N_WEBHOOK_URL = "https://vxtinxx.app.n8n.cloud/webhook/9725b93f-b5ef-4535-8b43-8789e67dbb7f";

  useEffect(() => {
    const name = localStorage.getItem("personagemSelecionado") || "Nenhum";
    setSelectedName(name);

    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      // GSAP animations
      const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power2.out" } });
      
      // Check if elements exist before animating
      const visualIconImg = document.querySelector(`.${styles.visualIcon} img`);
      const subtitle = document.querySelector(`.${styles.subtitle}`);
      const textElements = document.querySelectorAll(`.${styles.text}`);
      const chatBar = document.querySelector(`.${styles.chatBar}`);

      if (visualIconImg) {
        tl.from(visualIconImg, { scale: 0, rotate: -30, opacity: 0 });
      }
      
      if (subtitle) {
        tl.from(subtitle, { y: 30, opacity: 0 });
      }
      
      if (textElements.length > 0) {
        tl.from(textElements, { opacity: 0, y: 40, stagger: 0.3 });
      }
      
      if (chatBar) {
        tl.from(chatBar, { y: 100, opacity: 0 });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const buildUrl = (baseUrl, promptText, characterName) => {
    try {
      const url = new URL(baseUrl);
      url.searchParams.set("text", promptText);
      url.searchParams.set("personagem", characterName);
      return url.toString();
    } catch (_) {
      return baseUrl;
    }
  };

  const variantUrl = (url) => {
    if (url.includes("/webhook-test/")) return url.replace("/webhook-test/", "/webhook/");
    if (url.includes("/webhook/")) return url.replace("/webhook/", "/webhook-test/");
    return url;
  };

  const appendMessage = (text, who = "me") => {
    const newMessage = { text, who, id: Date.now() };
    setChatMessages(prev => [...prev, newMessage]);
    setTimeout(() => {
      if (chatLogRef.current) {
        chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
      }
    }, 100);
    return newMessage;
  };

  const appendImage = (url) => {
    const newMessage = { 
      text: '', 
      who: 'ai', 
      imageUrl: url, 
      id: Date.now() 
    };
    setChatMessages(prev => [...prev, newMessage]);
    setTimeout(() => {
      if (chatLogRef.current) {
        chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
      }
    }, 100);
  };

  const appendResultInChat = (text, url) => {
    const newMessage = { 
      text, 
      who: 'ai', 
      imageUrl: url, 
      id: Date.now(),
      hasActions: true
    };
    setChatMessages(prev => [...prev, newMessage]);
    setAwaitingAction(true);
    setTimeout(() => {
      if (chatLogRef.current) {
        chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
      }
    }, 100);
  };

  const openImageModal = (url) => {
    setImageModalSrc(url);
    setShowImageModal(true);
  };

  const handleRedo = () => {
    setAwaitingAction(false);
    appendMessage("Ok, descreva novamente para eu gerar outra imagem.", "ai");
  };

  const handleConfirm = () => {
    setShowConfirmModal(true);
  };

  const sendPrompt = async () => {
    const prompt = inputValue.trim();
    if (!prompt) return;

    if (awaitingAction && prompt.toLowerCase() !== "reiniciar") {
      return;
    }

    if (prompt.toLowerCase() === "reiniciar") {
      router.push('/ai-character-selection');
      return;
    }

    appendMessage(prompt, "me");
    setInputValue('');
    if (sendBtnRef.current) sendBtnRef.current.disabled = true;
    
    const intro = appendMessage("Entendi... sua visão para criar é muito impressionante! Vou preparar algo assim em meus componentes tecnológicos!", "ai");
    
    // Show typing indicator
    const typingMessage = { text: '', who: 'ai', isTyping: true, id: Date.now() };
    setChatMessages(prev => [...prev, typingMessage]);

    try {
      const firstUrl = buildUrl(N8N_WEBHOOK_URL, prompt, selectedName);
      console.log("POST n8n:", firstUrl);
      let res = await fetch(firstUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json, text/plain, */*" },
        body: JSON.stringify({
          personagem: selectedName,
          prompt
        })
      });

      if (!res.ok && (res.status === 404 || res.status === 405)) {
        const altUrl = buildUrl(variantUrl(N8N_WEBHOOK_URL), prompt, selectedName);
        console.log("Retry variant:", altUrl);
        res = await fetch(altUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json, text/plain, */*" },
          body: JSON.stringify({ personagem: selectedName, prompt })
        });
      }

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const contentType = res.headers.get("content-type") || "";

      if (contentType.startsWith("image/")) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setChatMessages(prev => prev.filter(msg => msg.id !== typingMessage.id));
        appendResultInChat("AQUI ESTÁ SUA IMAGEM!", url);
        return;
      }

      if (contentType.includes("text/")) {
        const txt = await res.text();
        let parsed = null;
        try { parsed = JSON.parse(txt); } catch (_) {}
        if (!parsed) {
          setChatMessages(prev => prev.filter(msg => msg.id !== typingMessage.id));
          console.log("n8n text:", txt);
          return;
        }
        res = {
          ok: true,
          headers: new Map([["content-type","application/json"]]),
          json: async () => parsed
        };
      }

      const data = await res.json().catch(() => ({}));
      setChatMessages(prev => prev.filter(msg => msg.id !== typingMessage.id));

      function normalize(payload) {
        if (!payload) return {};
        const mapImageKey = (obj) => {
          if (obj && obj.imageUrl && !obj.image_url) obj.image_url = obj.imageUrl;
          return obj;
        };
        if (payload.message || payload.image_url || payload.imageUrl) return mapImageKey(payload);
        if (Array.isArray(payload) && payload.length) {
          const first = payload[0];
          if (first && typeof first === "object") {
            if (first.json) return normalize(mapImageKey(first.json));
            return normalize(mapImageKey(first));
          }
        }
        if (payload.data) return normalize(mapImageKey(payload.data));
        if (payload.body) return normalize(mapImageKey(payload.body));
        if (payload.output) return normalize(mapImageKey(payload.output));
        return mapImageKey(payload);
      }

      const normalized = normalize(data);

      if (normalized.image_base64) {
        const mime = normalized.mimeType || "image/png";
        const dataUrl = `data:${mime};base64,${normalized.image_base64}`;
        appendResultInChat(normalized.message || "AQUI ESTÁ SUA IMAGEM!", dataUrl);
      }

      if (normalized.image_url) {
        const url = String(normalized.image_url);
        appendResultInChat(normalized.message || "AQUI ESTÁ SUA IMAGEM!", url);
      }

      if (!normalized.image_url && !normalized.image_base64 && !normalized.message) {
        console.log("n8n payload:", data);
      }
    } catch (err) {
      setChatMessages(prev => prev.filter(msg => msg.id !== typingMessage.id));
      appendMessage("Erro ao conectar com a IA. Tente novamente.", "ai");
      console.error(err);
    } finally {
      if (sendBtnRef.current) sendBtnRef.current.disabled = false;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendPrompt();
    }
  };

  const handleBack = () => {
    router.push('/ai-character-selection');
  };

  const closeModal = () => {
    setShowConfirmModal(false);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
  };

  return (
    <div className={styles.body}>
     

      <main className={styles.content}>
        <div id="back-btn" className={styles.back} onClick={handleBack}>
          <span><Image src="/HUMAN.EXE-IA-main/assets/seta.png" alt="Voltar" width={20} height={20} />VOLTAR</span>
        </div>
        <div className={styles.limit}>USOS RESTANTES: 2</div>

        <div className={styles.visualIcon}>
          <Image 
            src="/HUMAN.EXE-IA-main/assets/robo.png" 
            alt="Item visual" 
            width={150} 
            height={150}
          />
        </div>

        <h2 className={styles.subtitle}>
          PERSONAGEM SELECIONADO: <span id="selected-name">{selectedName}</span>
        </h2>

        <h2 className={styles.text}>
          AGORA ME DIGA SUA VISÃO, E EU LHE DAREI UM VISLUMBRE DO QUE IMAGINA.
        </h2>

        <h2 className={styles.text}>
          A QUALQUER MOMENTO DIGITE REINICIAR CASO QUEIRA RECOMEÇAR DO ZERO.
        </h2>

        <div id="chat" className={styles.chatLog} ref={chatLogRef}>
          {chatMessages.map((message) => (
            <div key={message.id} className={`${styles.msg} ${styles[message.who]}`}>
              {message.isTyping ? (
                <div className={styles.typing}>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                </div>
              ) : (
                <>
                  {message.text && <p>{message.text}</p>}
                  {message.imageUrl && (
                    <img 
                      src={message.imageUrl} 
                      alt="imagem gerada" 
                      className={styles.generated}
                      onClick={() => openImageModal(message.imageUrl)}
                    />
                  )}
                  {message.hasActions && (
                    <div className={styles.chatActions}>
                      <button className={`${styles.btn} ${styles.secondary}`} onClick={handleRedo}>
                        Refazer
                      </button>
                      <button className={`${styles.btn} ${styles.primary}`} onClick={handleConfirm}>
                        Confirmar
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
        
        <div id="confirm-modal" className={`${styles.modal} ${showConfirmModal ? '' : styles.hidden}`} role="dialog" aria-modal="true">
          <div className={styles.modalCard}>
            <button id="close-modal" className={styles.modalClose} onClick={closeModal} aria-label="Fechar">×</button>
            <div className={styles.modalContent}>
              <div className={styles.modalLeft}>
                <h3 className={styles.modalTitle}>SUA CRIAÇÃO ESTÁ SENDO PREPARADA!</h3>
                <Image src="/HUMAN.EXE-IA-main/assets/AnaC.png" alt="personagem" className={styles.modalIllustration} width={300} height={400} />
              </div>
              <div className={styles.modalRight}>
                <div className={styles.modalTextContent}>
                  <p className={styles.modalText}>Aguarde pela próxima semana e entraremos em retorno. Sua skin estará na aba de criações no seu perfil.</p> 
                  <p className={styles.modalText}>Se sua conta na nossa plataforma for vinculada à Steam, sua skin será instalada em seu jogo automaticamente.</p>
                  <p className={styles.modalThanks}>OBRIGADO!</p>
                </div>
                <div className={styles.modalFooterNote}>
                  Em caso de não receber sua skin ou qualquer outro problema acontecer entre em contato com a nossa equipe.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="image-modal" className={`${styles.modal} ${showImageModal ? '' : styles.hidden}`} role="dialog" aria-modal="true">
          <div className={styles.imageBox}>
            <img id="image-modal-img" src={imageModalSrc} alt="visualização" onClick={closeImageModal} />
          </div>
        </div>

        <div className={styles.chatBar}>
          <input 
            type="text" 
            placeholder={awaitingAction ? "Clique em Refazer/Confirmar ou digite REINICIAR" : "Escrever..."} 
            className={styles.chatInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
          <button className={styles.chatSend} onClick={sendPrompt} ref={sendBtnRef}>➤</button>
        </div>
      </main>
    </div>
  );
}
