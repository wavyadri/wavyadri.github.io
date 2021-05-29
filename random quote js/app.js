const quote = document.querySelector('#text');
const author = document.querySelector('#author');
const btnQuote = document.querySelector('#new-quote');
const tweet = document.querySelector('#tweet-quote');
const waiting = document.querySelector('#waiting');

async function newQuote() {
    
    // clear quote
    quote.innerHTML = '';
    author.innerHTML = '';

    // activate spinner
    waiting.classList.remove('hidden');

    try {
        await delay(2000);
        const quotes = await getQuote();

        const index = Math.floor(Math.random() * quotes.length);
        quote.innerHTML = `${quotes[index].text}`;
        author.innerHTML = `- ${quotes[index].author}`;

        tweet.setAttribute('href', `https://twitter.com/intent/tweet?text=${quotes[index].text} -${quotes[index].author}`);
    } catch (err) {
        console.log(err);
    } finally {
        // hide spinner
        waiting.classList.add('hidden');
    }

};

async function getQuote() {
    const url = 'https://type.fit/api/quotes';
    const response = await fetch(url);
    if (!response.ok) {
        throw Error(response.statusText);
    }
    const data = await response.json();
    return data;
};

// set timeout to allow preloader to show
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

btnQuote.addEventListener('click', newQuote);
document.addEventListener("DOMContentLoaded", newQuote);