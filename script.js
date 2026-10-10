document.addEventListener("DOMContentLoaded", () => {
    const greetingText = document.getElementById("greetingText");
    const envelopeContainer = document.getElementById("envelopeContainer");
    const openBtn = document.getElementById("openBtn");
    const envelope = document.getElementById("envelope");
    const petalsContainer = document.getElementById("petalsContainer");

    // Lock Modal references
    const lockModal = document.getElementById("lockModal");
    const pinDigits = document.querySelectorAll(".pin-digit");
    const unlockBtn = document.getElementById("unlockBtn");
    const errorMsg = document.getElementById("errorMsg");
    const lockBox = document.querySelector(".lock-box");

    const CORRECT_PIN = "1006";

    // Generate Floating Petals Background
    for (let i = 0; i < 12; i++) {
        const petal = document.createElement("div");
        petal.classList.add("petal");
        petal.style.left = `${Math.random() * 100}vw`;
        const pSize = Math.random() * 10 + 6;
        petal.style.width = `${pSize}px`;
        petal.style.height = `${pSize * 1.5}px`;
        petal.style.animationDuration = `${Math.random() * 8 + 8}s`;
        petal.style.animationDelay = `${Math.random() * 5}s`;
        petalsContainer.appendChild(petal);
    }

    // Entry Animations Timing
    setTimeout(() => {
        greetingText.classList.add("show");
    }, 400);

    setTimeout(() => {
        envelopeContainer.classList.add("show");
    }, 1200);

    // Open Button -> Opens Lock Modal First
    openBtn.addEventListener("click", () => {
        lockModal.classList.add("active");
        pinDigits[0].focus();
    });

    // Auto-advance PIN inputs
    pinDigits.forEach((digit, index) => {
        digit.addEventListener("input", (e) => {
            if (e.target.value.length === 1 && index < pinDigits.length - 1) {
                pinDigits[index + 1].focus();
            }
        });

        digit.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && !e.target.value && index > 0) {
                pinDigits[index - 1].focus();
            }
        });
    });

    // Unlock Button Click
    unlockBtn.addEventListener("click", validatePin);

    function validatePin() {
        let enteredPin = "";
        pinDigits.forEach(input => enteredPin += input.value);

        if (enteredPin === CORRECT_PIN) {
            errorMsg.style.display = "none";
            lockModal.classList.remove("active");

            // Open envelope logic
            openBtn.classList.add("fade-out");
            setTimeout(() => {
                envelope.classList.add("opening");
            }, 300);
        } else {
            errorMsg.style.display = "block";
            lockBox.classList.add("shake");
            setTimeout(() => {
                lockBox.classList.remove("shake");
            }, 400);
            // Clear inputs
            pinDigits.forEach(input => input.value = "");
            pinDigits[0].focus();
        }
    }
});