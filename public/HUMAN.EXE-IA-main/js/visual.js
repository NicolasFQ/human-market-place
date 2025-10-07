document.addEventListener("DOMContentLoaded", () => {
  const selectedName = document.getElementById("selected-name");
  const chatLog = document.getElementById("chat");
  const input = document.querySelector(".chat-input");
  const sendBtn = document.querySelector(".chat-send");
  const backBtn = document.getElementById("back-btn");
  const confirmModal = document.getElementById("confirm-modal");
  const closeModal = document.getElementById("close-modal");
  const imageModal = document.getElementById("image-modal");
  const imageModalImg = document.getElementById("image-modal-img");

  let awaitingAction = false;
  const name = localStorage.getItem("personagemSelecionado") || "Nenhum";
  selectedName.textContent = name;

  const N8N_WEBHOOK_URL = "https://vxtinxx.app.n8n.cloud/webhook/9725b93f-b5ef-4535-8b43-8789e67dbb7f";

  const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power2.out" } });
  tl.from(".visual-icon img", { scale: 0, rotate: -30, opacity: 0 })
    .from(".subtitle", { y: 30, opacity: 0 })
    .from(".text", { opacity: 0, y: 40, stagger: 0.3 })
    .from(".chat-bar", { y: 100, opacity: 0 });

  function buildUrl(baseUrl, promptText, characterName) {
    try {
      const url = new URL(baseUrl);
      url.searchParams.set("text", promptText);
      url.searchParams.set("personagem", characterName);
      return url.toString();
    } catch (_) {
      return baseUrl;
    }
  }

  function variantUrl(url) {
    if (url.includes("/webhook-test/")) return url.replace("/webhook-test/", "/webhook/");
    if (url.includes("/webhook/")) return url.replace("/webhook/", "/webhook-test/");
    return url;
  }

  function appendMessage(text, who = "me") {
    const div = document.createElement("div");
    div.className = `msg ${who}`;
    div.textContent = text;
    chatLog.appendChild(div);
    chatLog.scrollTop = chatLog.scrollHeight;
    gsap.from(div, { opacity: 0, y: 10, duration: 0.35, ease: "power2.out" });
    return div;
  }

  function appendImage(url) {
    const div = document.createElement("div");
    div.className = "msg ai";
    const img = document.createElement("img");
    img.className = "generated";
    img.src = url;
    img.alt = "imagem gerada";
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openImageModal(url));
    div.appendChild(img);
    chatLog.appendChild(div);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function appendResultInChat(text, url) {
    const wrap = document.createElement("div");
    wrap.className = "msg ai";
    
    if (text) {
      const p = document.createElement("p");
      p.textContent = text;
      p.style.marginBottom = "8px";
      wrap.appendChild(p);
    }
    
    const img = document.createElement("img");
    img.className = "generated";
    img.src = url;
    img.alt = "imagem gerada";
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openImageModal(url));
    wrap.appendChild(img);

    chatLog.appendChild(wrap);
    chatLog.scrollTop = chatLog.scrollHeight;

    const actionsRow = document.createElement("div");
    actionsRow.className = "chat-actions";
    const redoBtnRow = document.createElement("button");
    redoBtnRow.className = "btn secondary";
    redoBtnRow.textContent = "Refazer";
    const confirmBtnRow = document.createElement("button");
    confirmBtnRow.className = "btn primary";
    confirmBtnRow.textContent = "Confirmar";
    actionsRow.appendChild(redoBtnRow);
    actionsRow.appendChild(confirmBtnRow);
    chatLog.appendChild(actionsRow);
    chatLog.scrollTop = chatLog.scrollHeight;

    awaitingAction = true;
    input.placeholder = "Clique em Refazer/Confirmar ou digite REINICIAR";

    redoBtnRow.addEventListener("click", () => {
      awaitingAction = false;
      input.placeholder = "Descreva sua visão...";
      redoBtnRow.disabled = true;
      confirmBtnRow.disabled = true;
      const note = appendMessage("Ok, descreva novamente para eu gerar outra imagem.", "ai");
      gsap.from(note, { opacity: 0, y: 8, duration: 0.25 });
    });

    confirmBtnRow.addEventListener("click", () => {
      confirmModal.classList.remove("hidden");
      gsap.fromTo(".modal-card", { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" });
    });
  }

  function showTyping() {
    const wrap = document.createElement("div");
    wrap.className = "msg ai";
    const typing = document.createElement("div");
    typing.className = "typing";
    typing.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    wrap.appendChild(typing);
    chatLog.appendChild(wrap);
    chatLog.scrollTop = chatLog.scrollHeight;
    return wrap;
  }

  function openImageModal(url) {
    if (!url) return;
    imageModalImg.src = url;
    imageModal.classList.remove("hidden");
    gsap.fromTo(imageModalImg, { scale: 0.98, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2 });
  }

  async function sendPrompt() {
    const prompt = input.value.trim();
    if (!prompt) return;

    if (awaitingAction && prompt.toLowerCase() !== "reiniciar") {
      return;
    }

    if (prompt.toLowerCase() === "reiniciar") {
      window.location.href = "index.html";
      return;
    }

    appendMessage(prompt, "me");
    input.value = "";
    sendBtn.disabled = true;
    const intro = appendMessage("Entendi... sua visão para criar é muito impressionante! Vou preparar algo assim em meus componentes tecnológicos!", "ai");
    const thinking = showTyping();

    try {
      const firstUrl = buildUrl(N8N_WEBHOOK_URL, prompt, name);
      console.log("POST n8n:", firstUrl);
      let res = await fetch(firstUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json, text/plain, */*" },
        body: JSON.stringify({
          personagem: name,
          prompt
        })
      });

      if (!res.ok && (res.status === 404 || res.status === 405)) {
        const altUrl = buildUrl(variantUrl(N8N_WEBHOOK_URL), prompt, name);
        console.log("Retry variant:", altUrl);
        res = await fetch(altUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json, text/plain, */*" },
          body: JSON.stringify({ personagem: name, prompt })
        });
      }

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const contentType = res.headers.get("content-type") || "";

      if (contentType.startsWith("image/")) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        thinking.remove();
        appendResultInChat("AQUI ESTÁ SUA IMAGEM!", url);
        return;
      }

      if (contentType.includes("text/")) {
        const txt = await res.text();
        let parsed = null;
        try { parsed = JSON.parse(txt); } catch (_) {}
        if (!parsed) {
          thinking.remove();
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
      thinking.remove();

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

      if (normalized.message && normalized.message !== intro.textContent) {}

      if (!normalized.image_url && !normalized.image_base64 && !normalized.message) {
        console.log("n8n payload:", data);
      }
    } catch (err) {
      thinking.remove();
      appendMessage("Erro ao conectar com a IA. Tente novamente.", "ai");
      console.error(err);
    } finally {
      sendBtn.disabled = false;
    }
  }

  sendBtn.addEventListener("click", sendPrompt);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendPrompt();
    }
  });

  backBtn?.addEventListener("click", () => {
    if (history.length > 1) {
      history.back();
    } else {
      window.location.href = "index.html";
    }
  });

  function closeModalFn() {
    confirmModal.classList.add("hidden");
  }
  
  closeModal?.addEventListener("click", closeModalFn);
  confirmModal?.addEventListener("click", (e) => {
    if (e.target === confirmModal) closeModalFn();
  });
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !confirmModal.classList.contains("hidden")) closeModalFn();
  });

  imageModal?.addEventListener("click", (e) => {
    if (e.target === imageModal || e.target === imageModalImg) {
      imageModal.classList.add("hidden");
    }
  });
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && imageModal && !imageModal.classList.contains("hidden")) {
      imageModal.classList.add("hidden");
    }
  });
});