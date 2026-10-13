
"use strict";

const arena = document.getElementById("arena");
const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");
const bestText = document.getElementById("best");
const notice = document.getElementById("notice");
const feedback = document.getElementById("feedback");
const startBtn = document.getElementById("start");

const words = [
    { word: "먹었다", base: "먹다", type: "verb" },
    { word: "예쁜", base: "예쁘다", type: "adjective" },
    { word: "달리고", base: "달리다", type: "verb" },
    { word: "길다", base: "길다", type: "adjective" },
    { word: "웃으며", base: "웃다", type: "verb" },
    { word: "조용하다", base: "조용하다", type: "adjective" },
    { word: "읽는다", base: "읽다", type: "verb" },
    { word: "높아서", base: "높다", type: "adjective" },
    { word: "뛰었다", base: "뛰다", type: "verb" },
    { word: "따뜻한", base: "따뜻하다", type: "adjective" },
    { word: "만들고", base: "만들다", type: "verb" },
    { word: "무겁다", base: "무겁다", type: "adjective" },
    { word: "노래했다", base: "노래하다", type: "verb" },
    { word: "작아서", base: "작다", type: "adjective" },
    { word: "빠르다", base: "빠르다", type: "adjective" },
    { word: "자고", base: "자다", type: "verb" },
    { word: "달렸다", base: "달리다", type: "verb" },
    { word: "먹으며", base: "먹다", type: "verb" },
    { word: "던졌다", base: "던지다", type: "verb" },
    { word: "웃는다", base: "웃다", type: "verb" },
    { word: "씻고", base: "씻다", type: "verb" },
    { word: "배웠다", base: "배우다", type: "verb" },
    { word: "그리며", base: "그리다", type: "verb" },
    { word: "걸었다", base: "걷다", type: "verb" },
    { word: "아름답다", base: "아름답다", type: "adjective" },
    { word: "차가운", base: "차갑다", type: "adjective" },
    { word: "길어서", base: "길다", type: "adjective" },
    { word: "귀엽다", base: "귀엽다", type: "adjective" },
    { word: "밝은", base: "밝다", type: "adjective" },
    { word: "슬프다", base: "슬프다", type: "adjective" },
    { word: "무서운", base: "무섭다", type: "adjective" },
    { word: "깨끗하다", base: "깨끗하다", type: "adjective" }
];

let score = 0;
let lives = 3;
let best = Number(localStorage.getItem("pastelBest")) || 0;

let playing = false;
let fallTimer = null;
let spawnTimer = null;
let drag = null;

let startTime = 0;
let lastSpawnTime = 0;
let lastWord = "";
let spawnTimes = [];

bestText.textContent = best;

function updateStats() {
    scoreText.textContent = score;
    livesText.textContent =
        "❤️".repeat(lives) + "🖤".repeat(3 - lives);
}

function startGame() {
    clearInterval(fallTimer);
    clearInterval(spawnTimer);

    arena.querySelectorAll(".word").forEach(el => el.remove());

    score = 0;
    lives = 3;
    playing = true;
    drag = null;

    startTime = Date.now();
    lastSpawnTime = 0;
    lastWord = "";
    spawnTimes = [];

    updateStats();

    notice.style.display = "none";
    feedback.textContent = "단어를 잡아서 알맞은 상자에 넣어 봐!";
    startBtn.disabled = true;
    startBtn.textContent = "게임 진행 중...";

    createWord();

    fallTimer = setInterval(moveWords, 30);

    // 생성 간격을 계속 확인
    spawnTimer = setInterval(() => {
        if (!playing) return;

        const elapsed = (Date.now() - startTime) / 1000;

        // 시작 1.8초 → 점점 빨라져 최소 0.5초
        const interval = Math.max(500, 1800 - elapsed * 15);

        if (Date.now() - lastSpawnTime >= interval) {
            createWord();
        }
    }, 100);
}

// 단어 생성
function createWord() {
    if (!playing) return;

    const now = Date.now();

    // 최근 5초간 생성된 단어 기록만 유지
    spawnTimes = spawnTimes.filter(time => now - time < 5000);

    // 5초 동안 최대 7개
    if (spawnTimes.length >= 7) return;

    // 직전 단어와 다른 단어 선택
    let choices = words.filter(item => item.word !== lastWord);

    // 단어가 하나뿐인 경우에도 오류가 나지 않게 처리
    if (choices.length === 0) choices = words;

    const item = choices[Math.floor(Math.random() * choices.length)];

    lastWord = item.word;
    lastSpawnTime = now;
    spawnTimes.push(now);

    const el = document.createElement("div");

    el.className = "word";
    el.textContent = item.word;
    el.dataset.type = item.type;
    el.dataset.base = item.base;
    el.dataset.word = item.word;

    const maxX = Math.max(0, arena.clientWidth - 90);
    el.style.left = Math.random() * maxX + "px";
    el.style.top = "-48px";

    // 드래그 시작
    el.addEventListener("pointerdown", event => {
        if (!playing || drag) return;

        event.preventDefault();

        drag = {
            element: el,
            startX: event.clientX,
            startY: event.clientY,
            startLeft: el.offsetLeft,
            startTop: el.offsetTop,
            moved: false
        };

        el.classList.add("dragging");
        el.setPointerCapture(event.pointerId);
    });

    // 드래그 중
    el.addEventListener("pointermove", event => {
        if (!drag || drag.element !== el) return;

        const dx = event.clientX - drag.startX;
        const dy = event.clientY - drag.startY;

        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
            drag.moved = true;
        }

        if (!drag.moved) return;

        el.style.left = Math.max(
            0,
            Math.min(
                arena.clientWidth - el.offsetWidth,
                drag.startLeft + dx
            )
        ) + "px";

        el.style.top = Math.max(
            0,
            drag.startTop + dy
        ) + "px";
    });

    // 드래그 종료
    el.addEventListener("pointerup", event => {
        if (!drag || drag.element !== el) return;

        const wasDragged = drag.moved;
        el.classList.remove("dragging");

        if (wasDragged) {
            const target = document.elementFromPoint(
                event.clientX,
                event.clientY
            );

            const basket = target?.closest(".basket");

            if (basket) {
                drag = null;
                sortWord(el, basket.dataset.type);
                return;
            }
        }

        drag = null;
    });

    el.addEventListener("pointercancel", () => {
        if (drag && drag.element === el) {
            drag = null;
            el.classList.remove("dragging");
        }
    });

    arena.appendChild(el);
}

// 정답 판정
function sortWord(el, chosenType) {
    if (!playing || !el.isConnected) return;

    const correct = el.dataset.type === chosenType;
    const word = el.dataset.word;
    const base = el.dataset.base;

    if (correct) {
        score += 3;
        feedback.textContent = `정답! ${word} → ${base} (+3점)`;

        if (score > best) {
            best = score;
            localStorage.setItem("pastelBest", best);
            bestText.textContent = best;
        }
    } else {
        feedback.textContent = `오답! ${word}의 기본형은 ${base}야.`;
        el.remove();
        loseLife();
        return;
    }

    el.remove();
    updateStats();
}

// 시간이 지날수록 낙하 속도 증가
function moveWords() {
    if (!playing) return;

    const elapsed = (Date.now() - startTime) / 1000;
    const speed = Math.min(1 + elapsed * 0.025, 3.5);

    arena.querySelectorAll(".word").forEach(el => {
        if (!playing) return;
        if (drag && drag.element === el) return;

        const top = parseFloat(el.style.top) || 0;
        el.style.top = top + speed + "px";

        if (top >= arena.clientHeight - el.offsetHeight) {
            el.remove();
            feedback.textContent = "단어를 놓쳤어! 하트가 줄었어.";
            loseLife();
        }
    });
}

function loseLife() {
    if (!playing) return;

    lives--;
    updateStats();

    if (lives <= 0) {
        gameOver();
    }
}

// 게임 종료
function gameOver() {
    playing = false;

    clearInterval(fallTimer);
    clearInterval(spawnTimer);

    drag = null;

    arena.querySelectorAll(".word").forEach(el => el.remove());

    notice.style.display = "flex";
    notice.innerHTML = `
        <h2>게임 오버!</h2>
        <p>최종 점수: ${score}점</p>
        <p>최고 점수: ${best}점</p>
    `;

    feedback.textContent = "다시 도전해 봐!";
    startBtn.disabled = false;
    startBtn.textContent = "다시 시작!";
}

startBtn.addEventListener("click", startGame);

updateStats();
