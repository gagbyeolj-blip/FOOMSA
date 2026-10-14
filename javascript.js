
"use strict";

const arena = document.getElementById("arena");
const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");
const bestText = document.getElementById("best");
const notice = document.getElementById("notice");
const feedback = document.getElementById("feedback");
const startBtn = document.getElementById("start");


const words = [
    // 동사 60개
    { word: "먹다", type: "verb" },
    { word: "마시다", type: "verb" },
    { word: "달리다", type: "verb" },
    { word: "걷다", type: "verb" },
    { word: "뛰다", type: "verb" },
    { word: "웃다", type: "verb" },
    { word: "울다", type: "verb" },
    { word: "읽다", type: "verb" },
    { word: "쓰다", type: "verb" },
    { word: "듣다", type: "verb" },
    { word: "보다", type: "verb" },
    { word: "말하다", type: "verb" },
    { word: "공부하다", type: "verb" },
    { word: "놀다", type: "verb" },
    { word: "자다", type: "verb" },
    { word: "일어나다", type: "verb" },
    { word: "씻다", type: "verb" },
    { word: "입다", type: "verb" },
    { word: "벗다", type: "verb" },
    { word: "열다", type: "verb" },
    { word: "닫다", type: "verb" },
    { word: "만들다", type: "verb" },
    { word: "그리다", type: "verb" },
    { word: "부르다", type: "verb" },
    { word: "춤추다", type: "verb" },
    { word: "노래하다", type: "verb" },
    { word: "요리하다", type: "verb" },
    { word: "청소하다", type: "verb" },
    { word: "정리하다", type: "verb" },
    { word: "기다리다", type: "verb" },
    { word: "만나다", type: "verb" },
    { word: "헤어지다", type: "verb" },
    { word: "사다", type: "verb" },
    { word: "팔다", type: "verb" },
    { word: "주다", type: "verb" },
    { word: "받다", type: "verb" },
    { word: "보내다", type: "verb" },
    { word: "가다", type: "verb" },
    { word: "오다", type: "verb" },
    { word: "들어가다", type: "verb" },
    { word: "나오다", type: "verb" },
    { word: "올라가다", type: "verb" },
    { word: "내려오다", type: "verb" },
    { word: "던지다", type: "verb" },
    { word: "잡다", type: "verb" },
    { word: "놓다", type: "verb" },
    { word: "찾다", type: "verb" },
    { word: "잃다", type: "verb" },
    { word: "배우다", type: "verb" },
    { word: "가르치다", type: "verb" },
    { word: "질문하다", type: "verb" },
    { word: "대답하다", type: "verb" },
    { word: "생각하다", type: "verb" },
    { word: "기억하다", type: "verb" },
    { word: "잊다", type: "verb" },
    { word: "선택하다", type: "verb" },
    { word: "시작하다", type: "verb" },
    { word: "끝나다", type: "verb" },
    { word: "움직이다", type: "verb" },
    { word: "멈추다", type: "verb" },

    // 형용사 60개
    { word: "예쁘다", type: "adjective" },
    { word: "아름답다", type: "adjective" },
    { word: "귀엽다", type: "adjective" },
    { word: "잘생기다", type: "adjective" },
    { word: "멋있다", type: "adjective" },
    { word: "크다", type: "adjective" },
    { word: "작다", type: "adjective" },
    { word: "높다", type: "adjective" },
    { word: "낮다", type: "adjective" },
    { word: "길다", type: "adjective" },
    { word: "짧다", type: "adjective" },
    { word: "넓다", type: "adjective" },
    { word: "좁다", type: "adjective" },
    { word: "깊다", type: "adjective" },
    { word: "얕다", type: "adjective" },
    { word: "두껍다", type: "adjective" },
    { word: "얇다", type: "adjective" },
    { word: "무겁다", type: "adjective" },
    { word: "가볍다", type: "adjective" },
    { word: "빠르다", type: "adjective" },
    { word: "느리다", type: "adjective" },
    { word: "쉽다", type: "adjective" },
    { word: "어렵다", type: "adjective" },
    { word: "좋다", type: "adjective" },
    { word: "나쁘다", type: "adjective" },
    { word: "행복하다", type: "adjective" },
    { word: "슬프다", type: "adjective" },``
    { word: "기쁘다", type: "adjective" },
    { word: "즐겁다", type: "adjective" },
    { word: "외롭다", type: "adjective" },
    { word: "심심하다", type: "adjective" },
    { word: "재미있다", type: "adjective" },
    { word: "재미없다", type: "adjective" },
    { word: "무섭다", type: "adjective" },
    { word: "부드럽다", type: "adjective" },
    { word: "따뜻하다", type: "adjective" },
    { word: "차갑다", type: "adjective" },
    { word: "뜨겁다", type: "adjective" },
    { word: "시원하다", type: "adjective" },
    { word: "춥다", type: "adjective" },
    { word: "덥다", type: "adjective" },
    { word: "배고프다", type: "adjective" },
    { word: "배부르다", type: "adjective" },
    { word: "아프다", type: "adjective" },
    { word: "건강하다", type: "adjective" },
    { word: "피곤하다", type: "adjective" },
    { word: "졸리다", type: "adjective" },
    { word: "조용하다", type: "adjective" },
    { word: "시끄럽다", type: "adjective" },
    { word: "깨끗하다", type: "adjective" },
    { word: "더럽다", type: "adjective" },
    { word: "친절하다", type: "adjective" },
    { word: "불친절하다", type: "adjective" },
    { word: "착하다", type: "adjective" },
    { word: "똑똑하다", type: "adjective" },
    { word: "현명하다", type: "adjective" },
    { word: "부지런하다", type: "adjective" },
    { word: "게으르다", type: "adjective" },
    { word: "비슷하다", type: "adjective" },
    { word: "다르다", type: "adjective" },
    { word: "필요하다", type: "adjective" }
];
xz

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
