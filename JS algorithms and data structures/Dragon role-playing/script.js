let xp = 0;
let playerHealth = 100;
let playerMaxHealth = 100; //  The historical maximum health - used for calculating how health bar should move relative to it in css
let gold = 50;
let currentWeapon = 0;
let playerInflictedDamage;
let fighting;
let monsterHealth;
let monsterMaxHealth;
let monsterPower;
let inventory = ["stick"];
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const playerHealthText = document.querySelector("#playerHealthText");
const playerHealthBar = document.querySelector('#playerHealthBar');
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealthText");
const monsterHealthBar = document.querySelector('#monsterHealthBar');
const gameImage = document.querySelector('#gameImage');
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
    maxHealth: 15,
    "image path": "./images/slime.png"
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60,
    maxHealth: 60,
    "image path": "./images/beast.png"
  },
  {
    name: "dragon",
    level: 20,
    health: 300,
    maxHealth: 300,
    "image path": "./images/dragon.png"
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\".",
    "image path": "./images/town.png",
    music: 'townSquareSound'
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store.",
    "image path": "./images/store.png",
    music: 'storeSound'
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters.",
    "image path": "./images/cave.png",
    music: 'caveSound'
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster.",
    "image path": "./images/cave.png",
    music: 'fightSound'
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
    "image path": "./images/victory.png",
    music: 'victorySound'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;",
    "image path": "./images/lose.png",
    music: 'loseSound'
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;",
    "image path": "./images/win.png",
    music: 'victorySound'
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
    "image path": "./images/ee.png",
    music: 'eeSound'
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
  gameImage.src=location["image path"];// location-specific image

  if (location.music) playSound(location.music);//play location music (if any)
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    playerHealth += 10;
    if (playerHealth>playerMaxHealth) {playerMaxHealth=playerHealth};
    updateHealthBar(playerHealth,playerMaxHealth,playerHealthBar,playerHealthText)
    goldText.innerText = gold;  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function updateHealthBar(targetHealth,maxTargetHealth,targetBar,targetText) { 
  const healthPercentage = (targetHealth/maxTargetHealth)*100;
  targetBar.style.width = `${healthPercentage}%`;
  targetText.innerText = `${targetHealth} HP`;
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterMaxHealth = monsterHealth; //in the future might be useful to have it separate if monsters learn to heal
  gameImage.src=monsters[fighting]["image path"];
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  updateHealthBar(monsterHealth,monsterMaxHealth,monsterHealthBar,monsterHealthText);
}

function takeDamage(amount,targetHealth, targetMaxHealth,targetBar,targetText) {
  targetHealth -= amount;
  if (targetHealth<0) targetHealth=0; //avoid negative health
  updateHealthBar(targetHealth,targetMaxHealth,targetBar,targetText);
  return targetHealth;
}

function attack() {
  playSound("attackSound");
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  monsterPower = getMonsterAttackValue(monsters[fighting].level);
  playerHealth = takeDamage(monsterPower,playerHealth,playerMaxHealth,playerHealthBar,playerHealthText);
  if (isMonsterHit()) {
    playSound("monsterHitSound");
    monsterHitAnimation();
    playerInflictedDamage = weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    if (monsterHealth < 0) monsterHealth = 0;
    monsterHealth = takeDamage(playerInflictedDamage,monsterHealth,monsterMaxHealth,monsterHealthBar,monsterHealthText);
  } else {
    text.innerText += " You miss.";
  }
  
  if (playerHealth <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
  playSound("dodgeSound");
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  playSound("loseSound");
  update(locations[5]);
}

function winGame() {
  playSound('winSound');
  update(locations[6]);
}

function restart() {
  xp = 0;
  playerHealth = 100;
  playerMaxHealth = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  updateHealthBar(playerHealth,playerMaxHealth,playerHealthBar,playerHealthText);
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  text.innerText += numbers+"\n";
  
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "You weren't lucky this time! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}

function monsterHitAnimation() {
  gameImage.classList.add('hit');
  setTimeout(() => {
    gameImage.classList.remove('hit');
  }, 300);
}

let currentSound = null; //for debugging sound transitions


function playSound(soundId) {
  if (currentSound) {
    currentSound.pause();
    currentSound.currentTime = 0; // Reset to the start
  }

  const sound = document.querySelector(`#${soundId}`);
  if (sound) {
    sound.volume= 0.1;
    sound.play();
    currentSound = sound; // set the new current sound

  //then making changes to update() function
}}

// const backgroundMusic = document.querySelector("#backgroundMusic");

// function startMusic() {
//   backgroundMusic.play();
// }

function stopMusic() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0; // Reset to the beginning
}

function setSoundVolumes() {
  document.querySelector("#attackSound").volume = 1.0; // Full volume
  document.querySelector("#victorySound").volume = 0.8; // Slightly lower
  document.querySelector("#loseSound").volume = 0.6; // Medium
  document.querySelector("#dodgeSound").volume = 0.5; // Lower
  document.querySelector("#monsterHitSound").volume = 0.7; // Medium-high
  document.querySelector("#caveSound").volume = 0.3; // Background ambiance
  document.querySelector("#storeSound").volume = 0.4; // Background ambiance
  document.querySelector("#townSquareSound").volume = 0.5; // Background ambiance
  document.querySelector("#fightSound").volume = 0.1; // Combat-focused
  document.querySelector("#eeSound").volume = 0.9; // Easter egg sound louder
}

// Call this function once when the game starts
setSoundVolumes();