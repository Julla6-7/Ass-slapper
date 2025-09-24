let numButtonClicks = 0;
let isOnCooldown = false;

const slapSoundFile = "Slap.mp3";
const randomSoundFiles = [
    "Moan.mp3",
    "Girl Saying Yes, Daddy Sound Effect.mp3"
];

function buttonClicked() {
    if (isOnCooldown) return;

    numButtonClicks++;
    document.getElementById("mainDiv").textContent =
        "Times you have slapped my ass: " + numButtonClicks;

    if (numButtonClicks % 10 === 0) {
        const randomIndex = Math.floor(Math.random() * randomSoundFiles.length);
        const selectedSound = new Audio(randomSoundFiles[randomIndex]);
        selectedSound.volume = 1.0;
        startCooldown(selectedSound);
    } else {
        const slapSound = new Audio(slapSoundFile);
        slapSound.volume = 0.2;
        startCooldown(slapSound);
    }
}

function startCooldown(audio) {
    isOnCooldown = true;

    const button = document.getElementById("slapButton");
    if (button) button.disabled = true;

    const fallback = setTimeout(() => {
        isOnCooldown = false;
        if (button) button.disabled = false;
    }, 5000);

    audio.onended = () => {
        clearTimeout(fallback);
        isOnCooldown = false;
        if (button) button.disabled = false;
    };

    audio.play().catch((err) => {
        console.error("Audio playback failed:", err);
        clearTimeout(fallback);
        isOnCooldown = false;
        if (button) button.disabled = false;
    });
}
