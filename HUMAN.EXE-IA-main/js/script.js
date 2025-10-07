const chars = document.querySelectorAll(".char");
const continueBtn = document.getElementById("continue-btn");

const coresPersonagem = {
  "ana clara": "#ff299c",
  "nicolas": "#3cee8c",
  "yasmin": "#35f2df",
  "winny": "#6e00f5",
  "vitor": "#003ba9"
};

chars.forEach(char => {
  char.addEventListener("click", () => {
    chars.forEach(c => {
      c.classList.remove("selected");
      const img = c.querySelector("img");
      img.style.filter = "";
      img.style.borderColor = "";
    });

    char.classList.add("selected");

    const name = char.dataset.name.toLowerCase();
    localStorage.setItem("personagemSelecionado", name);

    const cor = coresPersonagem[name] || "#fff";
    const img = char.querySelector("img");
    img.style.borderColor = cor;
    img.style.filter = `drop-shadow(0 0 2px ${cor}) drop-shadow(0 0 4px ${cor})`;

    continueBtn.classList.remove("hidden");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power2.out" } });

  tl.from(".visual-icon img", { scale: 0, rotate: 45, opacity: 0 })
    .from(".subtitle", { opacity: 0, y: 40 })
    .from(".char", { opacity: 0, scale: 1.0, stagger: 0.2 });

  document.querySelectorAll(".char").forEach(char => {
    char.addEventListener("mouseenter", () => {
      gsap.to(char, { scale: 1.15, duration: 0.3, ease: "back.out(2)" });
    });
    
    char.addEventListener("mouseleave", () => {
      if (!char.classList.contains("selected")) {
        gsap.to(char, { scale: 1, duration: 0.3, ease: "power2.out" });
      }
    });
  });

  gsap.from("#continue-btn", {
    scrollTrigger: {
      trigger: "#continue-btn",
      start: "top 90%",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out"
  });
});