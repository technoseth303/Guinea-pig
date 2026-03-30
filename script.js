// ----------------------------
// Auto-update checker
// ----------------------------
async function checkForUpdates() {
    try {
        const res = await fetch("version.json?cb=" + Date.now());
        const data = await res.json();

        const current = localStorage.getItem("siteVersion");
        const latest = data.version;

        if (!current) {
            localStorage.setItem("siteVersion", latest);
            return;
        }

        if (current !== latest) {
            localStorage.setItem("siteVersion", latest);
            location.reload(true);
        }
    } catch (err) {
        console.error("Update check failed:", err);
    }
}

setInterval(checkForUpdates, 10000);
checkForUpdates();


// ----------------------------
// Chaos engine
// ----------------------------
const animals = [];
const messages = [
    "RTSSS!!! More rats!",
    "OINK OINK!!! Mud everywhere!",
    "Cheese and apples acquired!",
    "Chaos level over 9000!",
    "Rats and pigs unite!"
];

function createAnimal(emoji) {
    const elem = document.createElement("div");
    elem.className = "animal";
    elem.textContent = emoji;

    elem.style.left = Math.random() * (window.innerWidth - 50) + "px";
    elem.style.top = Math.random() * (window.innerHeight - 50) + "px";

    document.body.appendChild(elem);

    animals.push({
        element: elem,
        x: parseFloat(elem.style.left),
        y: parseFloat(elem.style.top),
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4
    });
}

for (let i = 0; i < 5; i++) createAnimal("🐀");
for (let i = 0; i < 5; i++) createAnimal("🐷");

function animate() {
    animals.forEach(a => {
        a.x += a.dx;
        a.y += a.dy;

        if (a.x < 0 || a.x > window.innerWidth - 50) a.dx *= -1;
        if (a.y < 0 || a.y > window.innerHeight - 50) a.dy *= -1;

        a.element.style.left = a.x + "px";
        a.element.style.top = a.y + "px";
    });

    requestAnimationFrame(animate);
}
animate();


// ----------------------------
// Button chaos
// ----------------------------
document.getElementById("chaosBtn").onclick = () => {
    document.getElementById("output").textContent =
        messages[Math.floor(Math.random() * messages.length)];

    for (let i = 0; i < 3; i++) {
        createAnimal(Math.random() > 0.5 ? "🐀" : "🐷");
    }
};


// ----------------------------
// Falling food
// ----------------------------
function spawnFalling() {
    const food = document.createElement("div");
    food.className = "falling";
    food.textContent = Math.random() > 0.5 ? "🧀" : "🍎";

    food.style.left = Math.random() * (window.innerWidth - 30) + "px";
    food.style.fontSize = (15 + Math.random() * 20) + "px";
    food.style.animationDuration = (3 + Math.random() * 3) + "s";

    document.body.appendChild(food);

    setTimeout(() => food.remove(), 6000);
}

setInterval(spawnFalling, 500);
