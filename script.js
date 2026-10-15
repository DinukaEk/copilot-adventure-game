// Each scene points to another scene or one of the endings below.
const scenes = {
  shore: {
    chapter: "SCENE 01",
    kicker: "LOW TIDE, HIGH STAKES",
    title: "The shore remembers",
    text: "At midnight, the sea pulls back from the coast. Streets glisten beneath a sky full of unfamiliar stars, and a lighthouse burns where no lighthouse stood yesterday.",
    detail: "In your pocket: a brass key, warm as a held hand.",
    choices: [
      { label: "Climb toward the lighthouse", next: "lighthouse" },
      { label: "Follow the old road inland", next: "oldRoad" }
    ]
  },
  lighthouse: {
    chapter: "SCENE 02",
    kicker: "THE LIGHT KEEPS ITS OWN TIME",
    title: "A door without a lock",
    text: "The lighthouse door is sealed with smooth, pale stone. Above it, the lamp turns once for every name whispered into the night. You hear yours, though no one here should know it.",
    detail: "The brass key in your pocket grows warmer.",
    choices: [
      { label: "Speak your name to the door", next: "tideHall" },
      { label: "Save the key and take the stairs", next: "keeper" }
    ]
  },
  oldRoad: {
    chapter: "SCENE 02",
    kicker: "A CITY BETWEEN BREATHS",
    title: "The market of lost things",
    text: "A market has appeared in the old town square. Its stalls sell yesterday's weather, unopened letters, and the sound of someone you miss. A quiet vendor recognizes the brass key.",
    detail: "Beyond the rooftops, the lighthouse light flickers twice.",
    choices: [
      { label: "Trade the key for a compass", next: "bellChamber" },
      { label: "Ask the vendor who owns the light", next: "garden" }
    ]
  },
  tideHall: {
    chapter: "SCENE 03",
    kicker: "BELOW THE WATERLINE",
    title: "The tide hall",
    text: "The door opens onto a staircase descending through dry ocean. Fish hang in the dark like stars; at the bottom, a voice is singing a song you almost remember.",
    detail: "The tune feels like a promise someone forgot to keep.",
    choices: [
      { label: "Follow the singing", next: "bellChamber" },
      { label: "Turn toward a garden of blue glass", next: "garden" }
    ]
  },
  keeper: {
    chapter: "SCENE 03",
    kicker: "THE ONE WHO STAYED",
    title: "The lighthouse keeper",
    text: "At the top, a keeper in a rain-soaked coat is winding the lamp by hand. They have waited here for longer than the coast has had a name. On the table: a map with one blank space.",
    detail: "The keeper asks what you hope to find.",
    choices: [
      { label: "Tell the truth about what you lost", next: "garden" },
      { label: "Take the map and leave quietly", next: "bellChamber" }
    ]
  },
  garden: {
    chapter: "SCENE 04",
    kicker: "SOMETHING STILL GROWS",
    title: "The glass garden",
    text: "In a courtyard beneath the waves, translucent flowers lean toward the lantern light. The vendor is here too, kneeling beside a small door in the ground. Someone knocks from the other side.",
    detail: "The flowers open when you come near.",
    choices: [
      { label: "Open the little door", next: "bellChamber" },
      { label: "Help the vendor save the flowers", next: "endingGarden" }
    ]
  },
  bellChamber: {
    chapter: "SCENE 05",
    kicker: "THE HEART OF THE LIGHT",
    title: "The bell chamber",
    text: "The singing leads to a bronze bell at the city's heart. Inside it, a tiny lantern glows. A crack runs through the bell, and through it you see the shape of a familiar face waiting in the dawn.",
    detail: "The brass key fits the keyhole beneath the bell.",
    choices: [
      { label: "Turn the key and let the light out", next: "endingDawn" },
      { label: "Leave the bell closed and stay beside it", next: "endingKeeper" }
    ]
  }
};

// Ending scenes have no choices; the player can start over instead.
const endings = {
  endingGarden: {
    chapter: "ENDING 01",
    kicker: "A SMALL, STEADY LIGHT",
    title: "The garden keeps growing",
    text: "Together, you lift the glass flowers into the open air. By morning, they have rooted in the tide-wet earth. The sea returns, gently this time, and leaves the garden untouched.",
    detail: "Some things are worth saving before you know what they mean.",
    ending: true
  },
  endingDawn: {
    chapter: "ENDING 02",
    kicker: "THE NIGHT LETS GO",
    title: "A shore made new",
    text: "The bell rings once. Its light travels through every flooded street, carrying the waiting face with it. When the sun rises, the sea comes home and the old coast rises with it, changed but breathing.",
    detail: "You take the first step into a morning no one remembers.",
    ending: true
  },
  endingKeeper: {
    chapter: "ENDING 03",
    kicker: "THE LAMP MUST NOT GO OUT",
    title: "The last keeper",
    text: "You sit beside the bell as the night turns over. The lantern stays lit; the city stays quiet. At dawn, the keeper hands you the winding key and walks toward the open sea.",
    detail: "Somewhere on the coast, someone will need a light.",
    ending: true
  }
};

const welcomeScreen = document.querySelector("#welcome");
const storyScreen = document.querySelector("#story");
const storyLayout = document.querySelector("#story-layout");
const beginButton = document.querySelector("#begin-button");
const sceneTitle = document.querySelector("#scene-title");
const sceneKicker = document.querySelector("#scene-kicker");
const sceneText = document.querySelector("#scene-text");
const sceneDetail = document.querySelector("#scene-detail");
const chapterCount = document.querySelector("#chapter-count");
const choicesContainer = document.querySelector("#choices");
const choiceHeading = document.querySelector("#choice-heading");
const choiceFootnote = document.querySelector("#choice-footnote");

// Render a scene and create its choice buttons from the story data.
function showScene(sceneId) {
  const scene = scenes[sceneId] || endings[sceneId];
  if (!scene) return;

  chapterCount.textContent = scene.chapter;
  sceneKicker.textContent = scene.kicker;
  sceneTitle.textContent = scene.title;
  sceneText.textContent = scene.text;
  sceneDetail.textContent = scene.detail;
  choicesContainer.replaceChildren();

  if (scene.ending) {
    choiceHeading.textContent = "YOUR STORY ENDS HERE";
    choiceFootnote.textContent = "Every ending begins somewhere.";

    const playAgainButton = document.createElement("button");
    playAgainButton.className = "choice-button";
    playAgainButton.type = "button";
    playAgainButton.innerHTML = '<span class="choice-number">&#8634;</span><span class="choice-label">Play again</span><span class="choice-arrow" aria-hidden="true">&rarr;</span>';
    playAgainButton.addEventListener("click", startGame);
    choicesContainer.append(playAgainButton);
  } else {
    choiceHeading.textContent = "WHAT WILL YOU DO?";
    choiceFootnote.textContent = "There is no map for this part.";

    scene.choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.className = "choice-button";
      button.type = "button";
      button.innerHTML = `<span class="choice-number">0${index + 1}</span><span class="choice-label"></span><span class="choice-arrow" aria-hidden="true">&rarr;</span>`;
      button.querySelector(".choice-label").textContent = choice.label;
      button.addEventListener("click", () => showScene(choice.next));
      choicesContainer.append(button);
    });
  }

  // Move keyboard focus to the new heading when a scene changes.
  sceneTitle.focus({ preventScroll: true });
}

function startGame() {
  welcomeScreen.hidden = true;
  storyScreen.hidden = false;
  showScene("shore");
}

beginButton.addEventListener("click", startGame);