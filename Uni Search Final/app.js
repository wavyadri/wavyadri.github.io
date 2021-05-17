// button
const searchBtn = document.getElementById('js-button');
searchBtn.addEventListener('click', formSubmit);

// form
const form = document.getElementById('js-search-form');
form.addEventListener('submit', formSubmit);

// dynamic html fields
const input = document.querySelector('.search-input');
const searchResults = document.getElementById('search-results');

// spinner
const spinner = document.getElementById('js-spinner');

async function formSubmit(e) {
    // prevent default
    e.preventDefault();

    const inputValue = input.value.trim();
    clearInput(input);
    // clear output html
    clearHTML(searchResults);
    // active spinner
    spinner.classList.remove('hidden');

    try {
        // get data from api
        const uniList = await getUni(inputValue);

        // check if input matches any data in api
        const matches = uniList.filter(uni => {
        // starts and ends with a whitespace OR word boundary
        const regex = new RegExp(`(^|\\s)${inputValue}($|\\s)`,'gi');
        return uni.name.match(regex) || uni.country.match(regex);
        });
        // alpha sort results
        matches.sort(function(a, b) {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            // names must be equal
            return 0;
          });

        // if event triggered without input by user
        if(inputValue.length === 0) {
            createNoMatch();
            return 0;
        }
        // if no matches to search query
        if(matches.length == 0){
            createNoMatch();
            return 0;
        }
        createUniResults(matches);
    } catch (err) {
        console.log(err);
        alert('Failed to match your search query. Please try again.');
    } finally {
        spinner.classList.add('hidden');
    }
}

async function getUni(inputValue) {
    const endpoint = `http://universities.hipolabs.com/search?{"$or":[{"name":"${inputValue}"},{"country":"${inputValue}"}]}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw Error(respone.statusText);
    }
    const json = await response.json();
    return json;
}

// Output no matches error in HTML
function createNoMatch() {
    const noMatch = document.createElement('div');
    noMatch.classList.add('no-match');
    noMatch.innerHTML = `
        <div class="box no-match-text">
            <h3>No match found!</h3>
            <p>Double check your spelling or try a different search.</p>
        </div>
    `;
    searchResults.appendChild(noMatch);
}


// Output results in HTML
function createUniResults(matches) {
    matches.forEach(result => {
        const url = `${result['web_pages'][0]}`;
        const uniMatch = document.createElement('div');
        uniMatch.classList.add('uni-match');
        uniMatch.innerHTML = `
            <div class="box">
                <div class="result-title">
                    <h3>${result.name} | ${result.country}</h3>
                </div>
                <a href="${url}" class="uni-match-link" target="_blank" rel="noopener">${url}</a>
            </div>
          `;
        searchResults.appendChild(uniMatch);
    });
}

// clear
function clearInput(query) {
    query.value = '';
}

function clearHTML(section) {
    section.innerHTML = '';
}