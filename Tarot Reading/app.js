const past = document.getElementById('past');
const present = document.getElementById('present');
const future = document.getElementById('future');
const begin = document.querySelector('.btn-begin');
const restart = document.querySelector('.btn-restart');

const array = [past, present, future];
const numberOfCards = array.length;

const fetchTarot = async () => {
    await getTarot();
}

const getTarot = async () => {
  const endpoint = "https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=3";
  const response = await fetch(endpoint);
  console.log('fetching...')
  const tarot = await response.json();
  clear();
  createTarotCard(tarot);
}

// clear cards of any existing HTML
function clear() {
  for (let i = 0; i < numberOfCards; i++) {
    array[i].innerHTML='';
  }
}

function set() {
  location.reload();
}

function createTarotCard(tarot) {
  for (let i = 0; i < numberOfCards; i++) {
    const final = array[i];
    const cardEl = document.createElement('div');
    cardEl.classList.add('box');
    const cardInnerHTML = `
        <div class="tarot-box">
          <h2 class="tarotName">${tarot.cards[i].name}</h2>
          <p class="tarotDesc"><b>Meaning (upright):</b> ${tarot.cards[i].meaning_up}</p>
          <p class="tarotType"><b>Type:</b> ${tarot.cards[i].type}</p>
          <p class="tarotValue"><b>Value:</b> ${tarot.cards[i].value}</p>
          <p class
        </div>
      </div>
    `;
    cardEl.innerHTML = cardInnerHTML;
    final.appendChild(cardEl);
  }
}

// Begin button
begin.addEventListener('click', fetchTarot);

// Start Again button
restart.addEventListener('click', set);