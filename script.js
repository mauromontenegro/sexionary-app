const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const continueBtn = document.getElementById("continueBtn");
const cardSelector = document.getElementById("cardSelector");
const cardOptions = document.getElementById("cardOptions");
const timerSection = document.getElementById("timerSection");
const selectedCard = document.getElementById("selectedCard");
const startTimerBtn = document.getElementById("startTimer");
const stopTimerBtn = document.getElementById("stopTimer");
const countdown = document.getElementById("countdown");
const turnEnd = document.getElementById("turnEnd");

const beepSound = new Audio("beep.wav");
const beepFinal = new Audio("beep-largo.wav");

let partidaIniciada = false;
let timer;
let preTimer;
let timeLeft = 60;
let palabraActual = "";
let categoriaActual = "";
let colorActual = "";

const categoryColors = {
  verde: "#4CAF50",
  rojo: "#F44336",
  amarillo: "#FFC107",
  azul: "#2196F3",
  naranja: "#FF8C00"
};

const categoryNames = {
  verde: "Partes del cuerpo, objetos y lugares",
  rojo: "Personas, personajes y personalidades",
  amarillo: "Situación difícil",
  azul: "Verbos, actos y acciones",
  naranja: "De todo un poco"
};

let usedCards = [];

const savedCards = localStorage.getItem("sexionary_usedCards");
const hasSavedGame = savedCards !== null;

const btnContainer = document.createElement("div");
btnContainer.style.marginBottom = "20px";

if (hasSavedGame) {
  startBtn.classList.add("hidden");
  const nuevoBtn = document.createElement("button");
  nuevoBtn.innerText = "Iniciar partida nueva";
  nuevoBtn.onclick = () => {
    localStorage.removeItem("sexionary_usedCards");
    usedCards = [];
    partidaIniciada = true;
    btnContainer.remove();
    cardSelector.classList.remove("hidden");
    showRandomCards();
  };

  const continuarBtn = document.createElement("button");
  continuarBtn.innerText = "Continuar partida";
  continuarBtn.onclick = () => {
    usedCards = Array.isArray(JSON.parse(savedCards)) ? JSON.parse(savedCards) : [];
    if (usedCards.length === 0) {
      historyBtn.classList.add("hidden");
    }
    partidaIniciada = true;
    btnContainer.remove();
    cardSelector.classList.remove("hidden");
    showRandomCards();
  };

  btnContainer.appendChild(nuevoBtn);
  btnContainer.appendChild(continuarBtn);

  document.querySelector(".container").insertBefore(btnContainer, cardSelector);
} else {
  // Mostrar botón “Iniciar partida” si no hay partida guardada
  startBtn.classList.remove("hidden");
}

// Botón INICIAR partida
startBtn.addEventListener("click", () => {
  partidaIniciada = true;
  startBtn.classList.add("hidden");
  resetBtn.classList.add("hidden");
  cardSelector.classList.remove("hidden");
  showRandomCards();
});

// Botón REINICIAR partida
resetBtn.addEventListener("click", () => {
  if (partidaIniciada) {
    beepFinal.currentTime = 0;
    beepFinal.play();
  }

  cardSelector.classList.remove("hidden");
  timerSection.classList.add("hidden");
  turnEnd.classList.add("hidden");

  resetBtn.classList.add("hidden");
  continueBtn.classList.add("hidden");

  showRandomCards();
});

// Botón CONTINUAR
continueBtn.addEventListener("click", () => {
  continueBtn.classList.add("hidden");
  resetBtn.classList.add("hidden");
  turnEnd.classList.add("hidden");
  cardSelector.classList.remove("hidden");
  showRandomCards();
});

function showRandomCards() {
  cardOptions.innerHTML = "";
  for (let [color, list] of Object.entries(cards)) {
    const playedWords = usedCards.filter(c => c.color === color).map(c => c.word);
    const remaining = list.filter(card => !playedWords.includes(card));
    if (remaining.length === 0) continue;
    const random = remaining[Math.floor(Math.random() * remaining.length)];
    const btn = document.createElement("button");
    btn.innerHTML = `<div style="margin-bottom: 8px; padding: 8px;"><small style="display:block; font-weight: bold; margin-bottom: 10px; color:${categoryColors[color]};">${categoryNames[color]}</small>${random}</div>`;
    btn.onclick = () => selectCard(color, random);
    cardOptions.appendChild(btn);
  }
  resetBtn.classList.remove("hidden");
  continueBtn.classList.add("hidden");
  startBtn.classList.add("hidden");
}

function selectCard(color, word) {
  palabraActual = word;
  categoriaActual = categoryNames[color];
  colorActual = color;
  usedCards.unshift({ word, color });
  localStorage.setItem("sexionary_usedCards", JSON.stringify(usedCards));

  const categoria = categoryNames[color];
  const colorHex = categoryColors[color];
  const cantidadPalabras = word.trim().split(/\s+/).length;

  selectedCard.innerHTML = `
    <div class="card" style="margin-bottom: 12px;">
      <div style="color: ${colorHex}; font-weight: bold; margin-bottom: 10px;">
        ${categoria}
      </div>
      <div id="palabraSecreta" style="margin-bottom: 10px;">
        ${word}
      </div>
      <small style="font-size: 0.9em;">
        ${cantidadPalabras} palabra${cantidadPalabras > 1 ? 's' : ''}
      </small>
    </div>
  `;

  cardSelector.classList.add("hidden");
  timerSection.classList.remove("hidden");
  resetBtn.classList.add("hidden");

  // Mostrar botón de iniciar turno
  startTimerBtn.classList.remove("hidden");
  startTimerBtn.disabled = false;
  stopTimerBtn.classList.add("hidden");

  // Limpiar botón toggle si existía
  const oldToggle = document.getElementById("toggleVisibilityBtn");
  if (oldToggle) oldToggle.remove();
}


startTimerBtn.addEventListener("click", () => {
  startTimerBtn.disabled = true;
  stopTimerBtn.classList.remove("hidden");
  startTimerBtn.classList.add("hidden");

  // Cuenta regresiva previa
  let preCountdown = 5;
  countdown.innerText = `00:0${preCountdown}`;
  countdown.style.color = "lightgreen";

  preTimer = setInterval(() => {
    preCountdown--;
    beepSound.currentTime = 0;
    beepSound.play();
    countdown.innerText = `00:0${preCountdown}`;

    if (preCountdown === 0) {
      clearInterval(preTimer);
      beepFinal.currentTime = 0;
      beepFinal.play();
      countdown.style.color = "";
      const palabraSecreta = document.getElementById("palabraSecreta");

      if (palabraSecreta) {
        palabraSecreta.classList.add("oculta-palabra");

        // Crear botón toggle
        const toggleBtn = document.createElement("button");
        toggleBtn.id = "toggleVisibilityBtn";
        toggleBtn.innerText = "Mostrar";
        toggleBtn.style.marginTop = "10px";

        palabraSecreta.insertAdjacentElement("afterend", toggleBtn);

        toggleBtn.addEventListener("click", () => {
          const isHidden = palabraSecreta.classList.toggle("oculta-palabra");
          toggleBtn.innerText = isHidden ? "Mostrar" : "Ocultar";
        });
      }

      iniciarTemporizadorPrincipal();
    }
  }, 1000);
});

stopTimerBtn.addEventListener("click", () => {
  endTurn();
});

function endTurn() {
  if (preTimer) {
    clearInterval(preTimer);
    preTimer = null;
  }
  clearInterval(timer);
  timerSection.classList.add("hidden");
  turnEnd.classList.remove("hidden");
  const colorHex = categoryColors[colorActual];
  turnEnd.innerHTML = `
  <div style="margin-top: 20px;">
    <p style="font-size: 1.4em; color: var(--color-accent);">¡Turno finalizado!</p>
    <div class="card" style="margin-bottom: 12px;">
      <div style="font-weight: bold; margin-bottom: 10px; color:${colorHex}">${categoriaActual}</div>
      <div><strong style="margin-bottom: 10px;">${palabraActual}</strong></div>
    </div>
  </div>
`;

  selectedCard.innerHTML = `
    
  `;

  resetBtn.classList.add("hidden");
  continueBtn.classList.remove("hidden");

  timeLeft = 60;
  updateCountdownDisplay();
  const toggleBtn = document.getElementById("toggleVisibilityBtn");
  if (toggleBtn) toggleBtn.remove();
}

function updateCountdownDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  countdown.innerText = `${minutes}:${seconds}`;

  if (timeLeft <= 10) {
    countdown.classList.add("countdown-urgente");
  } else {
    countdown.classList.remove("countdown-urgente");
  }
}

function iniciarTemporizadorPrincipal() {
  timeLeft = 60;
  updateCountdownDisplay();

  timer = setInterval(() => {
    timeLeft--;
    updateCountdownDisplay();

    if (timeLeft <= 10 && timeLeft > 0) {
      beepSound.currentTime = 0;
      beepSound.play();
    }

    if (timeLeft <= 0) {
      clearInterval(timer); // ← aseguramos que no siga contando
      beepFinal.currentTime = 0;
      beepFinal.play();
      endTurn();
    }
  }, 1000);
}

const fontSizeSelector = document.getElementById("fontSizeSelector");
fontSizeSelector.addEventListener("change", (e) => {
  const value = e.target.value;
  document.documentElement.classList.remove("font-normal", "font-grande", "font-muy-grande");
  document.documentElement.classList.add(`font-${value}`);
});
document.documentElement.classList.add("font-normal");

const historyBtn = document.getElementById("historyBtn");
const historyModal = document.getElementById("historyModal");
const historyList = document.getElementById("historyList");
const closeModal = document.getElementById("closeModal");

historyBtn.addEventListener("click", () => {
  historyList.innerHTML = "";

  if (usedCards.length === 0) {
    historyList.innerHTML = "<p>No hay palabras jugadas aún.</p>";
  } else {
    usedCards.forEach(({ word, color }) => {
      const div = document.createElement("div");
      div.classList.add('card');
      div.innerHTML = `<small style="display:block; display:block; font-weight: bold; margin-bottom: 10px; color:${categoryColors[color]};">${categoryNames[color]}</small>${word}`;
      historyList.appendChild(div);
    });
  }

  historyModal.classList.remove("hidden");
});


closeModal.addEventListener("click", () => {
  historyModal.classList.add("hidden");
});
