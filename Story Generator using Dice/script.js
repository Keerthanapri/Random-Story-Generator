const characters = ["👩‍🚀 Astronaut", "🧙 Wizard", "🐉 Dragon", "🤴 Prince", "👸 Princess", "🕵️ Detective"];
const places = ["🏰 Castle", "🌋 Volcano", "🌌 Space", "🏝️ Island", "🌳 Forest", "🏙️ City"];
const objects = ["🗡️ Sword", "🔮 Crystal", "📜 Map", "🧪 Potion", "💎 Jewel", "📖 Book"];

const dice1 = document.getElementById("dice1");
const dice2 = document.getElementById("dice2");
const dice3 = document.getElementById("dice3");
const rollBtn = document.getElementById("roll-btn");
const bigStoryBtn = document.getElementById("big-story-btn");
const saveBtn = document.getElementById("save-btn");
const clearBtn = document.getElementById("clear-btn");
const downloadBtn = document.getElementById("download-btn");
const storyEl = document.getElementById("story");
const savedStoriesEl = document.getElementById("saved-stories");

let savedStories = [];

// Typing animation
function typeWriter(text, element, speed = 30) {
  element.textContent = "";
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

// 🎲 Roll single story
function rollDice() {
  const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
  const randomPlace = places[Math.floor(Math.random() * places.length)];
  const randomObject = objects[Math.floor(Math.random() * objects.length)];

  dice1.textContent = randomCharacter.split(" ")[0];
  dice2.textContent = randomPlace.split(" ")[0];
  dice3.textContent = randomObject.split(" ")[0];

  const story = `${randomCharacter} in a ${randomPlace} with a ${randomObject}!`;
  typeWriter(story, storyEl);
}

// 📖 Generate connected fairy tale
function generateSmartStory() {
  const hero = characters[Math.floor(Math.random() * characters.length)];
  const place = places[Math.floor(Math.random() * places.length)];
  const item = objects[Math.floor(Math.random() * objects.length)];
  const sidekick = characters[Math.floor(Math.random() * characters.length)];
  let villain = characters[Math.floor(Math.random() * characters.length)];
  const treasure = objects[Math.floor(Math.random() * objects.length)];

  if (villain === hero) villain = "👹 Monster"; // avoid same as hero

  const story = `
    ✨ Once upon a time, there was a brave ${hero} who traveled to a ${place}.
    Armed only with a ${item}, the ${hero.split(" ")[1]} faced many challenges.
    Along the way, they met a loyal ${sidekick} who joined the adventure.
    But in the shadows, a wicked ${villain} guarded a powerful ${treasure}.
    After a fierce battle, the ${hero.split(" ")[1]} and the ${sidekick.split(" ")[1]} defeated the ${villain.split(" ")[1]}.
    Peace returned to the ${place}, and their tale became legend. 🌟
  `;

  typeWriter(story.trim(), storyEl, 25);
}

// 💾 Save current story
function saveStory() {
  const currentStory = storyEl.textContent.trim();
  if (currentStory && !savedStories.includes(currentStory)) {
    savedStories.push(currentStory);

    const li = document.createElement("li");
    li.textContent = currentStory;
    savedStoriesEl.appendChild(li);
  }
}

// 🗑️ Clear all stories
function clearStories() {
  savedStories = [];
  savedStoriesEl.innerHTML = "";
}

// ⬇️ Download saved stories as TXT
function downloadStories() {
  if (savedStories.length === 0) {
    alert("No stories saved!");
    return;
  }
  const blob = new Blob([savedStories.join("\n\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "my_stories.txt";
  a.click();
  URL.revokeObjectURL(url);
}

// Event listeners
rollBtn.addEventListener("click", rollDice);
bigStoryBtn.addEventListener("click", generateSmartStory);
saveBtn.addEventListener("click", saveStory);
clearBtn.addEventListener("click", clearStories);
downloadBtn.addEventListener("click", downloadStories);
