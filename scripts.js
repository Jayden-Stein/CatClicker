const ranks = [
  { clicks: 0, name: "Peasant" },
  { clicks: 10, name: "Worker" },
  { clicks: 50, name: "Knight" },
  { clicks: 100, name: "Royal" },
  { clicks: 200, name: "King" },
  { clicks: 500, name: "God" },
];

let clickCount = 0;
let lastClickTime = 0;
let clickTime = [];

// Cache DOM elements
const cats = document.getElementById("cat");
const displaycats = document.getElementById("displaycats");
const rank = document.getElementById("rank");
const catmessage = document.getElementById("catmessage");
const warningmessage = document.getElementById("warningmessage");

// Determine current rank using Array.reduce()
const getCurrentRank = (clicks) =>
  ranks.reduce((acc, cur) => (clicks >= cur.clicks ? cur.name : acc), ranks[0].name);


function showWarning(message) {
    warningmessage.innerHTML = message;
    warningmessage.style.display = "block";
    setTimeout(() => warningmessage.style.display = "none", 3000);
}

// Main click handler
cats.addEventListener("click", () => {
    const now = performance.now();
    const timeDiff = now - lastClickTime;

    if (timeDiff < 50) {
        showWarning("⚠ suspiciously fast clicking detected (possibly auto clicker).");
    }

    clickTime.push(now);
    if (clickTime.length > 5) {
        clickTime.shift();
        const intervals = clickTime.slice(1).map((t, i) => t - clickTime[i]);
        const varince = Math.max(...intervals) - Math.min(...intervals);
        if (varince < 10) {
            showWarning("⚠ Click pattern too consistant (possible auto clicker).");
        }
    }

    lastClickTime = now;


  clickCount++;
  displaycats.textContent = clickCount;

  const currentRank = getCurrentRank(clickCount);
  rank.textContent = currentRank;

  displaycats.innerHTML = `You have worshiped the cat <strong>${clickCount}</strong> Times`;
});

