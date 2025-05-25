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

const categoryColors = {
  verde: "#4CAF50",
  rojo: "#F44336",
  amarillo: "#FFC107",
  azul: "#2196F3",
  naranja: "#FF9800"
};

const categoryNames = {
  verde: "Lugares, objetos y partes del cuerpo",
  rojo: "Personas, personajes y personalidades",
  amarillo: "Situación difícil",
  azul: "Verbos, actos y acciones",
  naranja: "De todo un poco"
};

let usedCards = {
  verde: [], rojo: [], amarillo: [], azul: [], naranja: []
};

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
    const remaining = list.filter(card => !usedCards[color].includes(card));
    if (remaining.length === 0) continue;
    const random = remaining[Math.floor(Math.random() * remaining.length)];
    const btn = document.createElement("button");
    btn.innerHTML = `<div style="margin-bottom: 8px;"><small style="display:block; margin-bottom: 6px; color: gray; font-size: 0.85em;">${categoryNames[color]}</small><span style="color:${categoryColors[color]}; font-size: 1.2em;">●</span> ${random}</div>`;
    btn.onclick = () => selectCard(color, random);
    cardOptions.appendChild(btn);
  }
  resetBtn.classList.remove("hidden");
  continueBtn.classList.add("hidden");
  startBtn.classList.add("hidden");
}

function selectCard(color, word) {
  usedCards[color].push(word);

  const categoria = categoryNames[color];
  const colorHex = categoryColors[color];
  const cantidadPalabras = word.trim().split(/\s+/).length;

  selectedCard.innerHTML = `
    <div style="margin-bottom: 12px;">
      <div style="color: ${colorHex}; font-weight: bold; margin-bottom: 10px;">
        ${categoria}
      </div>
      <div id="palabraSecreta" style="font-size: 1.8em; margin-bottom: 10px;">
        ${word}
      </div>
      <div style="color: gray; font-size: 0.9em;">
        ${cantidadPalabras} palabra${cantidadPalabras > 1 ? 's' : ''}
      </div>
    </div>
  `;

  cardSelector.classList.add("hidden");
  timerSection.classList.remove("hidden");

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