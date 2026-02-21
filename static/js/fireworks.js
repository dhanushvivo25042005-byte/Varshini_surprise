const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let fireworksActive = false;

/* NORMAL FIREWORKS */
function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;

    for (let i = 0; i < 100; i++) {
        particles.push({
            x: x,
            y: y,
            speedX: (Math.random() - 0.5) * 6,
            speedY: (Math.random() - 0.5) * 6,
            life: 100,
            color: `hsl(${Math.random() * 360},100%,50%)`
        });
    }
}

/* TEXT FIREWORKS */
function showFireworkText(text) {

    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    tempCtx.fillStyle = "white";
    tempCtx.font = "bold 80px Arial";
    tempCtx.textAlign = "center";
    tempCtx.fillText(text, canvas.width / 2, canvas.height / 2);

    const imageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let y = 0; y < canvas.height; y += 6) {
        for (let x = 0; x < canvas.width; x += 6) {

            const index = (y * canvas.width + x) * 4;

            if (data[index + 3] > 128) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    targetX: x,
                    targetY: y,
                    speed: 0.05,
                    life: Infinity,
                    color: "gold"
                });
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);

    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, index) => {

        if (p.targetX !== undefined) {
            // Text particles move to form text
            p.x += (p.targetX - p.x) * p.speed;
            p.y += (p.targetY - p.y) * p.speed;
        } else {
            p.x += p.speedX;
            p.y += p.speedY;
        }

        p.life--;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        if (p.life <= 0 && p.targetX === undefined) {
    particles.splice(index, 1);
        }
    });

    if (fireworksActive && Math.random() < 0.05) {
        createFirework();
    }
}

animate();

document.getElementById("yesBtn").addEventListener("click", () => {
    fireworksActive = true;
});