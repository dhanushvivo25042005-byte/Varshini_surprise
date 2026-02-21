const noBtn = document.getElementById("noBtn");
const container = document.getElementById("proposalContainer");

noBtn.addEventListener("mouseenter", () => {

    const containerRect = container.getBoundingClientRect();

    const maxX = containerRect.width - noBtn.offsetWidth;
    const maxY = containerRect.height - noBtn.offsetHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.position = "absolute";  
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
    noBtn.style.transition = "0.3s ease";
});
const yesBtn = document.getElementById("yesBtn");
const proposalContainer = document.getElementById("proposalContainer");
const finalMessage = document.getElementById("finalMessage");
const crackerSound = document.getElementById("crackerSound");

yesBtn.addEventListener("click", () => {

    // 🔥 Make page fullscreen
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }

    // Hide proposal section
    proposalContainer.style.opacity = "0";

    setTimeout(() => {
        proposalContainer.style.display = "none";

        // Show wedding message
        finalMessage.style.opacity = "1";
        finalMessage.style.transform = "translate(-50%, -50%) scale(1)";

        crackerSound.currentTime = 0;
        
        crackerSound.play();

        // After 9 seconds remove wedding message
        setTimeout(() => {
            finalMessage.style.opacity = "0";
            finalMessage.style.transform = "translate(-50%, -50%) scale(0)";

            showFireworkText("How was the surprise Babe? 💖");

        }, 6000);

    }, 800);
});