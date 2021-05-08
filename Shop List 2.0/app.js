
let items = [];

const form = document.querySelector('.js-form');
const shoppingList = document.querySelector('.shopping-list')

// event triggers
const add = document.querySelector('.js-button-add');
const done = document.querySelector('.js-done');
const remove = document.querySelector('.js-remove');
const input = document.querySelector('.js-input');


handleSubmit = (e) => {
    e.preventDefault();

    const inputText = input.value.trim();

    if (inputText !== '') {
        items.push(inputText);

        items.push(inputText);
        createItem(items[items.length-1]);

        input.classList.remove('fill-in');
        clearInput(input);
        input.focus();
    } else if (inputText === '') {
        input.classList.add('fill-in');
        input.focus();
    }
}

createItem = (newItem) => {
    const list = document.createElement('div');
    list.classList.add('list');
    list.innerHTML = `
        <div class='list-items'>
            <i class="fas fa-check fa-2x js-done"></i>
            <p class='js-list-text'>${newItem}</p>
        </div>
        <i class="fas fa-times fa-2x js-remove"></i>
    `;
    
    shoppingList.appendChild(list);
}

checkItem = (e) => {
    if (e.target.classList.contains('js-done')) {
        // change check mark colour
        e.target.classList.toggle('done');
        // strike through text
        e.target.nextElementSibling.classList.toggle('strike');       
    }
}

removeItem = (e) => {
    if (e.target.classList.contains('js-remove')) {
        // remove task from list
        e.target.parentElement.classList.add('hidden');
    }
}

clearInput = (target) => {
    target.value = '';
}

form.addEventListener('submit', handleSubmit);
add.addEventListener('click', handleSubmit);
shoppingList.addEventListener('click', checkItem);
shoppingList.addEventListener('click', removeItem);

