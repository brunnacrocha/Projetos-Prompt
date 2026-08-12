const items = [
  '🍎', '🚗', '🐶', '⭐',
  '🏠', '⚽', '🌳', '🎸',
  '🐱', '🚲', '☀️', '🍕',
  '🌙', '🦋', '🎯', '🚀'
];

// 1 = tempo real. Use 0.02 para testar 1 minuto em ~1,2s.
const TIMER_SPEED = 1;
const BOARD_SIZE = 16;

const state = {
  selectedMinutes: 1,
  phase: 'idle',
  remainingSeconds: 60,
  board: [],
  targets: [],
  targetIndex: 0,
  correct: 0,
  wrong: 0,
  intervalId: null,
};

const $ = (selector) => document.querySelector(selector);

const homeScreen = $('#home-screen');
const gameScreen = $('#game-screen');
const resultScreen = $('#result-screen');
const boardEl = $('#board');
const timerEl = $('#timer');
const phaseLabel = $('#phase-label');
const gameTitle = $('#game-title');
const targetArea = $('#target-area');
const targetItem = $('#target-item');
const feedback = $('#feedback');

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
}

function renderBoard(hidden = false) {
  boardEl.innerHTML = '';
  state.board.forEach((item, index) => {
    const button = document.createElement('button');
    button.className = `card ${hidden ? 'hidden-card' : ''}`;
    button.dataset.index = index;
    button.textContent = hidden ? '?' : item;
    button.setAttribute('aria-label', hidden ? `Posição ${index + 1}` : `Posição ${index + 1}: ${item}`);
    button.addEventListener('click', () => handleCardClick(index));
    boardEl.appendChild(button);
  });
}

function setTimer(seconds) {
  state.remainingSeconds = seconds;
  timerEl.textContent = formatTime(seconds);
}

function startTimer(onFinish) {
  clearInterval(state.intervalId);
  state.intervalId = setInterval(() => {
    state.remainingSeconds -= TIMER_SPEED;
    timerEl.textContent = formatTime(Math.max(0, state.remainingSeconds));
    if (state.remainingSeconds <= 0) {
      clearInterval(state.intervalId);
      onFinish();
    }
  }, 1000);
}

function startGame() {
  state.phase = 'memorize';
  state.board = shuffle(items).slice(0, BOARD_SIZE);
  state.targets = shuffle(state.board);
  state.targetIndex = 0;
  state.correct = 0;
  state.wrong = 0;

  homeScreen.classList.add('hidden');
  resultScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  targetArea.classList.add('hidden');
  phaseLabel.textContent = 'MEMORIZE';
  gameTitle.textContent = 'Memorize as posições';
  feedback.textContent = '';
  renderBoard(false);
  setTimer(state.selectedMinutes * 60);
  startTimer(beginChallenge);
}

function beginChallenge() {
  state.phase = 'challenge';
  phaseLabel.textContent = 'DESAFIO';
  gameTitle.textContent = 'Encontre o elemento';
  targetArea.classList.remove('hidden');
  renderBoard(true);
  showNextTarget();
}

function showNextTarget() {
  if (state.targetIndex >= state.targets.length) {
    finishGame();
    return;
  }
  targetItem.textContent = state.targets[state.targetIndex];
  feedback.textContent = '';
}

function handleCardClick(index) {
  if (state.phase !== 'challenge') return;

  const buttons = [...boardEl.children];
  const button = buttons[index];
  const target = state.targets[state.targetIndex];

  if (state.board[index] === target) {
    state.correct += 1;
    button.classList.add('correct');
    button.textContent = target;
    feedback.textContent = '🎉 Acertou!';
    state.targetIndex += 1;
    setTimeout(showNextTarget, 350);
  } else {
    state.wrong += 1;
    button.classList.add('wrong');
    feedback.textContent = '❌ Não era aqui. Tente outra posição.';
    setTimeout(() => button.classList.remove('wrong'), 400);
  }
}

function finishGame() {
  clearInterval(state.intervalId);
  state.phase = 'finished';
  const score = Math.max(0, state.correct * 100 - state.wrong * 25);

  gameScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  $('#correct-score').textContent = state.correct;
  $('#wrong-score').textContent = state.wrong;
  $('#total-score').textContent = score;
}

document.querySelectorAll('.time-option').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.time-option').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    state.selectedMinutes = Number(button.dataset.minutes);
  });
});

$('#start-button').addEventListener('click', startGame);
$('#restart-button').addEventListener('click', () => {
  resultScreen.classList.add('hidden');
  homeScreen.classList.remove('hidden');
});
