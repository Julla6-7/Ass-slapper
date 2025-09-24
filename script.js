let numButtonClicks = 0;
let isOnCooldown = false;

// File paths (instead of pre-created Audio objects)
const slapSoundFile = "Slap.mp3";
const randomSoundFiles = [
    "Moan.mp3",
    "Girl Saying Yes, Daddy Sound Effect.mp3"
];
const rareSoundFile = "Ahh It's Coming Out Sound Effect Soundboard Link.mp3";

function buttonClicked() {
    if (isOnCooldown) return;

    numButtonClicks++;

    document.getElementById("mainDiv").textContent =
        "Times you have slapped my ass: " + numButtonClicks;

    const chance = Math.random();

    // Rare 5% sound
    if (chance <= 0.05) {
        const rareSound = new Audio(rareSoundFile);
        rareSound.volume = 0.6;
        startCooldown(rareSound);
        rareSound.play();
        return;
    }

    // Every 10th click: random sound
    if (numButtonClicks % 10 === 0) {
        const randomIndex = Math.floor(Math.random() * randomSoundFiles.length);
        const selectedSound = new Audio(randomSoundFiles[randomIndex]);
        selectedSound.volume = 1.0;
        startCooldown(selectedSound);
        selectedSound.play();
    } else {
        // Regular slap sound
        const slapSound = new Audio(slapSoundFile);
        slapSound.volume = 0.2;
        startCooldown(slapSound);
        slapSound.play();
    }
}

function startCooldown(audio) {
    isOnCooldown = true;
    audio.onended = () => {
        isOnCooldown = false;
    };
}
