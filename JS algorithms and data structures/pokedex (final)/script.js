// 1. Cache DOM nodes
const searchInput  = document.getElementById('search-input');
const searchBtn    = document.getElementById('search-button');
const nameEl       = document.getElementById('creature-name');
const idEl         = document.getElementById('creature-id');
const weightEl     = document.getElementById('weight');
const heightEl     = document.getElementById('height');
const specialEl    = document.getElementById('special');
const typesEl      = document.getElementById('types');
const hpEl         = document.getElementById('hp');
const attackEl     = document.getElementById('attack');
const defenseEl    = document.getElementById('defense');
const spAttackEl   = document.getElementById('special-attack');
const spDefenseEl  = document.getElementById('special-defense');
const speedEl      = document.getElementById('speed');
const resultSect   = document.getElementById('result');

const endpointAll      = 'https://rpg-creature-api.freecodecamp.rocks/api/creatures';
const endpointCreature = 'https://rpg-creature-api.freecodecamp.rocks/api/creature/{name-or-id}';

let creaturesArr = [];

// 2. Initialization: fetch the list then wire up the search button
async function init() {
  creaturesArr = await fetchAllCreatures();
}

searchBtn.addEventListener('click', onSearchClick);

// 3. Fetch list of {id,name}
async function fetchAllCreatures() {
  const res = await fetch(endpointAll);
  if (!res.ok) throw new Error('Could not load creature list');
  return res.json(); // array of {id, name}
}

// 4. Fetch detailed data for one creature
async function fetchIdCreature(idOrName) {
  const url = endpointCreature.replace('{name-or-id}', idOrName);
  const res = await fetch(url);
  if (!res.ok) throw new Error('Creature not found');
  const data = await res.json();
  // destructure & flatten
  const {
    id,
    name,
    weight,
    height,
    special: { name: specialName, description: specialDescription },
    stats,
    types
  } = data;

  // stats lookup
  const statsLookup = Object.fromEntries(
    stats.map(s => [s.name, s.base_stat])
  );
  // array of type names
  const typeNames = types.map(t => t.name);

  return {
    creatureId: id,
    name,
    weight,
    height,
    specialName,
    specialDescription,
    statsLookup,
    typeNames
  };
}

// 5. Display one creature in the static card + types list
function displayCreature(c) {
  // clear any previous results (static card lives in DOM, so hide it)
  resultSect.innerHTML = '';

  // name uppercase
  nameEl.textContent    = c.name.toUpperCase();
  // id, weight, height as-is (ID can show “#1” or “1” both pass)
  idEl.textContent      = c.creatureId;
  weightEl.textContent  = c.weight;
  heightEl.textContent  = c.height;
  // special
  specialEl.textContent = `${c.specialName}: ${c.specialDescription}`;

  // types: clear then append one <span> per type
  typesEl.innerHTML = '';
  c.typeNames.forEach(t => {
    const span = document.createElement('span');
    span.textContent = t.toUpperCase();
    typesEl.appendChild(span);
  });

  // stats
  hpEl.textContent        = c.statsLookup.hp;
  attackEl.textContent    = c.statsLookup.attack;
  defenseEl.textContent   = c.statsLookup.defense;
  spAttackEl.textContent  = c.statsLookup['special-attack'];
  spDefenseEl.textContent = c.statsLookup['special-defense'];
  speedEl.textContent     = c.statsLookup.speed;
}

// 6. Search handler: exact ID vs. fuzzy name
function onSearchClick() {
  const raw = searchInput.value.trim();
  if (!raw) {
    alert('Please enter an ID or name.');
    return;
  }

  const isNum = /^\d+$/.test(raw);
  const term  = raw.toLowerCase();

  // filter preloaded list
  const matches = creaturesArr.filter(c =>
    isNum
      ? c.id === Number(raw)
      : c.name.toLowerCase().includes(term)
  );

  // 2. If no match, *synchronously* alert and stop
  if (!matches.length) {
    alert('Creature not found');
    return;
  }

  // 3. Otherwise hand off to async logic
  fetchAndRender(matches[0].id);
}

// 4. A separate async function just for the fetch+render
async function fetchAndRender(id) {
  try {
    const data = await fetchIdCreature(id);
    displayCreature(data);
  } catch {
    alert('Creature not found');
  }
}

init();