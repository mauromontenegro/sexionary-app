const startBtn = document.getElementById("startBtn");
const cardSelector = document.getElementById("cardSelector");
const cardOptions = document.getElementById("cardOptions");
const timerSection = document.getElementById("timerSection");
const selectedCard = document.getElementById("selectedCard");
const startTimerBtn = document.getElementById("startTimer");
const stopTimerBtn = document.getElementById("stopTimer");
const countdown = document.getElementById("countdown");
const turnEnd = document.getElementById("turnEnd");

let partidaIniciada = false;

const categoryColors = {
  verde: "#4CAF50",    // verde
  rojo: "#F44336",     // rojo
  amarillo: "#FFC107", // amarillo
  azul: "#2196F3",     // azul
  naranja: "#FF9800"   // naranja
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

let timer;
let timeLeft = 60;

startBtn.addEventListener("click", () => {
  partidaIniciada = true;
  startBtn.innerText = "Reiniciar";
  cardSelector.classList.remove("hidden");
  timerSection.classList.add("hidden");
  turnEnd.classList.add("hidden");
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
    <div style="font-size: 1.8em; margin-bottom: 10px;">
      ${word}
    </div>
    <div style="color: gray; font-size: 0.9em;">
      ${cantidadPalabras} palabra${cantidadPalabras > 1 ? 's' : ''}
    </div>
  </div>
`;


  cardSelector.classList.add("hidden");
  timerSection.classList.remove("hidden");
}


startTimerBtn.addEventListener("click", () => {
  timeLeft = 60;
  updateCountdownDisplay();
  timer = setInterval(() => {
    timeLeft--;
    updateCountdownDisplay();
    if (timeLeft <= 0) {
      endTurn();
    }
  }, 1000);
});


stopTimerBtn.addEventListener("click", () => {
  endTurn();
});

function endTurn() {
  clearInterval(timer);
  timerSection.classList.add("hidden");
  startBtn.innerText = "Continuar";
  startBtn.classList.remove("hidden");
  turnEnd.classList.remove("hidden");
  setTimeout(() => {
    turnEnd.classList.add("hidden");
    cardSelector.classList.remove("hidden");
    showRandomCards();
  }, 3000);
  timeLeft = 60;
  updateCountdownDisplay();
}

function updateCountdownDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  countdown.innerText = `${minutes}:${seconds}`;
}

