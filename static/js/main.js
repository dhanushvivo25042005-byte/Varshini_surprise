// COUNTDOWN
const targetDate = new Date("Oct 16, 2026 00:00:00").getTime();

setInterval(function() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  if(document.getElementById("countdown"))
    document.getElementById("countdown").innerHTML =
      "Countdown to Our Special Day 💖: " + days + " Days";
}, 1000);


// LOVE CALCULATOR
function calculateLove() {
  const name1 = document.getElementById("name1").value.trim().toLowerCase();
  const name2 = document.getElementById("name2").value.trim().toLowerCase();

  if (
    (name1 === "Dhanush" && name2 === "Varshini") ||
    (name1 === "dhanush" && name2 === "varshini")
  ) {
    document.getElementById("result").innerHTML =
      "Your Love Score is 100000% 💖🔥 Infinite Love Detected!";
  } else {
    const loveScore = Math.floor(Math.random() * 21) + 80;
    document.getElementById("result").innerHTML =
      "Your Love Score is " + loveScore + "% 💕";
  }
}


// LETTERS
function showLetter(type) {

    const letters = {

        sad: `
        <h2>When You're Sad 😢</h2>
        <p>

        Aaina Nenu nitho unna niku enduku aa sad,
        <br>
        Vurike sad ga vundaku jolly ga vundu unnadi okate life,
        <br>
        <center>" Manushulu manchollu bujji, Manushulu ante ne Manchollu "<center>
        <br>
        Manam Gudhiki vellam anuko andaru okate anukuntam Devuda nannu baga chudu devuda nannu baga chudu Manam anandaga vunte ade manchidi.
        <br>
        So ee janame ke niku 32 teeth vuntundhi so eppude baga navvu.Malli eyy jantuvu laga pudutamo teliyadu
        <br>
        So badha padaku,
        <br>
        I love bujji,
        <br>
        Bye.

        </p>
        `,

        miss: `
        <h2>When You Miss Me 💕</h2>
        <p>
        Enduku Babe Missing Nenu nitho ne vunta eppatiki so happy ga vundu,
        <br>
        Aaina entha long vunna manam emm vidipomu,
        <br>
        Madayalo evaru vastaru ane thought avasaram ledhu manam kalisi vunte steel rod leka evarini care kuda cheyalsina avasaram ledhu,
        So nuvvu 90mm Steel rod lekka gattiga undu, Lets Make it Success.
        <br>
        Missing vuntundhi kani its a struggle for winning ante.
        <br>
        So be Happy stay chill.
        <br>
        I love you ma,
        <br>
        Bye.
        </p>
        `,

        angry: `
        <h2>When You're Angry 😘</h2>
        <p>
        Kopam ki emm takkuva ledhu vurike aruchukunta vuntav,
        <br>
        Kopam vaste Kopam taggichuko nannu tidite emm vastadi. So next time Kopam vaste remeber one thing,
        <br>
        <center>"Niku Kopam Vaste I will be the most effected Person"<center>
        <br>
        Rember this Inka poye Final surprise chudu po malli mokam marchaku navvu koncham.
        </p>
        `
    };

    const songs = {
        sad: "/static/audio/sad.mp3",
        miss: "/static/audio/miss.mp3",
        angry: "/static/audio/angry.mp3"
    };

    // Show letter
    document.getElementById("letter-content").innerHTML = letters[type];

    // Play unique song
    const audio = document.getElementById("letter-audio");
    audio.pause();
    audio.src = songs[type];
    audio.currentTime = 0;
    audio.loop = true;
    audio.play();
}



// CONFESSION TYPING
const text = "You are my today and all of my tomorrows ❤️";
let i = 0;

function typeEffect() {
  if (i < text.length && document.getElementById("confession")) {
    document.getElementById("confession").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeEffect, 60);
  }
}

if(document.getElementById("confession"))
  typeEffect();


// Video Editing

const videoWrapper = document.querySelector(".youtube-video-wrapper");

document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    videoWrapper.style.transform = `
        rotateY(${x}deg)
        rotateX(${y}deg)
        scale(1.02)
    `;
});

document.addEventListener("mouseleave", () => {
    videoWrapper.style.transform = "rotateY(0deg) rotateX(0deg)";
});


// ===== SMART LOVE GAME =====

const canvas = document.getElementById("loveGame");
const ctx = canvas.getContext("2d");

let score = 0;
let highScore = 0;
let playerX = 180;
let loveItems = [];
let speed = 2;
let currentPlayer = "";
let playerImg = new Image();
let targetImg = new Image();

function startGame(player) {

    currentPlayer = player;
    document.getElementById("playerSelect").style.display = "none";
    canvas.style.display = "block";
    document.getElementById("scoreBoard").style.display = "block";

    score = 0;
    loveItems = [];
    speed = 2;

    if (player === "dhanush") {
        playerImg.src = "/static/images/dhanush.jpeg";
        targetImg.src = "/static/images/varshini.jpeg";
        highScore = localStorage.getItem("highScore_dhanush") || 0;
    } else {
        playerImg.src = "/static/images/varshini.jpeg";
        targetImg.src = "/static/images/dhanush.jpeg";
        highScore = localStorage.getItem("highScore_varshini") || 0;
    }

    document.getElementById("highScore").innerText = highScore;

    updateGame();
}

function createLove() {
    loveItems.push({
        x: Math.random() * 360,
        y: 0
    });
}

function drawPlayer() {
    ctx.drawImage(playerImg, playerX, 430, 60, 60);
}

function drawLove() {
    loveItems.forEach((item, index) => {
        item.y += speed;
        ctx.drawImage(targetImg, item.x, item.y, 40, 40);

        if (
            item.y > 390 &&
            item.x > playerX - 30 &&
            item.x < playerX + 60
        ) {
            score++;
            document.getElementById("score").innerText = score;

            if (score > highScore) {
                highScore = score;
                document.getElementById("highScore").innerText = highScore;

                if (currentPlayer === "dhanush") {
                    localStorage.setItem("highScore_dhanush", highScore);
                } else {
                    localStorage.setItem("highScore_varshini", highScore);
                }
            }

            loveItems.splice(index, 1);
        }

        if (item.y > 500) {
            loveItems.splice(index, 1);
        }
    });
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawLove();
    requestAnimationFrame(updateGame);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && playerX > 0) {
        playerX -= 20;
    }
    if (e.key === "ArrowRight" && playerX < 340) {
        playerX += 20;
    }
});

canvas.addEventListener("touchmove", (e) => {
    const touchX = e.touches[0].clientX - canvas.offsetLeft;
    playerX = touchX - 30;
});

setInterval(createLove, 1000);

setInterval(() => {
    speed += 0.2;
}, 5000);