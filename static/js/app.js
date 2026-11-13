const wordDisplay = document.getElementById("word-display");
const hiddenInput = document.getElementById("hidden-input");
const typingBox = document.getElementById("typing-box");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const highScoreEl = document.getElementById("high-score");
const restartBtn = document.getElementById("restart-btn");

const timePills = document.querySelectorAll("#time-toggles .pill");
const diffPills = document.querySelectorAll("#difficulty-toggles .pill");

let testDuration = 60;
let timeLeft = testDuration;
let currentDifficulty = "medium";
let timerInterval = null;
let isRunning = false;
let targetText = "";

// Generate unique storage key based on difficulty and duration
function getStorageKey() {
    return `typeflow_pb_${currentDifficulty}_${testDuration}s`;
}

function loadHighScore() {
    const key = getStorageKey();
    const bestWpm = localStorage.getItem(key) || 0;
    highScoreEl.textContent = `${bestWpm} WPM`;
}

async function loadWords() {
    wordDisplay.textContent = "Fetching words...";
    try {
        const res = await fetch(`/api/words?difficulty=${currentDifficulty}&count=50`);
        const data = await res.json();
        targetText = data.words.join(" ");
        renderText();
    } catch (err) {
        wordDisplay.textContent = "Failed to load words. Click Restart.";
    }
}

function renderText() {
    wordDisplay.innerHTML = "";
    targetText.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.classList.add("char");
        if (index === 0) span.classList.add("current");
        wordDisplay.appendChild(span);
    });
}

function startTimer() {
    isRunning = true;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `${timeLeft}s`;
        updateStats();

        if (timeLeft <= 0) {
            finishTest();
        }
    }, 1000);
}

function updateStats() {
    const typed = hiddenInput.value;
    const elapsedSeconds = testDuration - timeLeft;

    let currentWpm = 0;
    if (elapsedSeconds > 0) {
        currentWpm = Math.round((typed.length / 5) / (elapsedSeconds / 60));
        wpmEl.textContent = currentWpm;
    }

    const chars = wordDisplay.querySelectorAll(".char");
    let correctCount = 0;

    chars.forEach((span, idx) => {
        span.classList.remove("correct", "incorrect", "current");
        if (idx < typed.length) {
            if (typed[idx] === targetText[idx]) {
                span.classList.add("correct");
                correctCount++;
            } else {
                span.classList.add("incorrect");
            }
        } else if (idx === typed.length) {
            span.classList.add("current");
        }
    });

    const accuracy = typed.length > 0
        ? Math.round((correctCount / typed.length) * 100)
        : 100;
    accuracyEl.textContent = `${accuracy}%`;
}

function finishTest() {
    clearInterval(timerInterval);
    isRunning = false;
    hiddenInput.disabled = true;
    updateStats();

    // Check and update LocalStorage High Score
    const finalWpm = parseInt(wpmEl.textContent);
    const key = getStorageKey();
    const currentBest = parseInt(localStorage.getItem(key) || 0);

    if (finalWpm > currentBest) {
        localStorage.setItem(key, finalWpm);
        highScoreEl.textContent = `${finalWpm} WPM`;
    }
}

function resetTest() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = testDuration;
    timerEl.textContent = `${testDuration}s`;
    wpmEl.textContent = "0";
    accuracyEl.textContent = "100%";
    hiddenInput.disabled = false;
    hiddenInput.value = "";
    loadHighScore();
    loadWords().then(() => hiddenInput.focus());
}

// Event Listeners for Time Toggles
timePills.forEach(pill => {
    pill.addEventListener("click", () => {
        if (isRunning) return;
        timePills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        testDuration = parseInt(pill.dataset.time);
        resetTest();
    });
});

// Event Listeners for Difficulty Toggles
diffPills.forEach(pill => {
    pill.addEventListener("click", () => {
        if (isRunning) return;
        diffPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        currentDifficulty = pill.dataset.difficulty;
        resetTest();
    });
});

typingBox.addEventListener("click", () => hiddenInput.focus());

hiddenInput.addEventListener("input", () => {
    if (!isRunning && timeLeft > 0) {
        startTimer();
    }
    updateStats();

    if (hiddenInput.value.length >= targetText.length) {
        finishTest();
    }
});

restartBtn.addEventListener("click", resetTest);

// Initialize on page load
resetTest();