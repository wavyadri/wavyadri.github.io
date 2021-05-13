// array to hold all list items
let items = [];

createItem = (newItem) => {
    localStorage.setItem('shoppingListRef', JSON.stringify(items));
    const list = document.querySelector('.shopping-list');
    // select current item being passed into the func in the DOM (only works if it already exists)
    const item = document.querySelector(`[data-key='${newItem.id}']`);

    if (newItem.deleted) {
        item.remove();
        return;
    }

    const isChecked = newItem.checked ? 'done' : '';
    const isStriked = newItem.striked ? 'strike' : '';

    const node = document.createElement('li');
    node.setAttribute('class', `list`);
    node.setAttribute('data-key', newItem.id);
    node.innerHTML = `
        <div class='list-items' id='${newItem.id}'>
            <i id="${newItem.id}" class="fas fa-check fa-2x js-done ${isChecked}"></i>
            <p class='js-list-text ${isStriked}'>${newItem.text}</p>
        </div>
        <i class="fas fa-times fa-2x js-remove"></i>
    `;

    // check if item already exists in the DOM
    if (item) {
        // replace existing with new item passed in (in the case of toggleDone)
        list.replaceChild(node, item);
    } else {
        // otherwise append to end of the list (in the case of a new item)
        list.append(node);
    }
}

// create a new item object based on input text
addItem = (text) => {
    const newItem = {
        text,
        checked: false,
        striked: false,
        id: Date.now(),
    };

    items.push(newItem);
    createItem(newItem);
}

toggleDone = (key) => {
    // find the index of the first element that satisfies the condition
    const index = items.findIndex(item => item.id === Number(key));
    // set it to the opposite, aka toggling state and style
    items[index].checked = !items[index].checked;
    items[index].striked = !items[index].striked;

    createItem(items[index]);
}

deleteItem = (key) => {
    const index = items.findIndex(item => item.id === Number(key));
    const newItem = {
        deleted: true,
        ...items[index],
    };

    // keep only items that do not match the id of item being passed in
    // aka removing item being passed in
    items = items.filter(item => item.id !== Number(key));
    createItem(newItem);
}

handleSubmit = (e) => {
    e.preventDefault();

    const input = document.querySelector('.js-input');
    const inputText = input.value.trim();

    if (inputText !== '') {
        addItem(inputText);

        input.classList.remove('fill-in');
        input.value= '';
        input.focus();
    } else if (inputText === '') {
        input.classList.add('fill-in');
        input.focus();
    }
}

const list = document.querySelector('.shopping-list');
list.addEventListener('click', e => {
    // checking off done items
    if (e.target.classList.contains('js-done')) {
        // identify which item in the list is the target
        const itemKey = e.target.parentElement.parentElement.dataset.key;
        toggleDone(itemKey);
    }

    // deleting items
    if (e.target.classList.contains('js-remove')) {
        const itemKey = e.target.parentElement.dataset.key;
        deleteItem(itemKey);
    }
})

const form = document.querySelector('.js-form');
form.addEventListener('submit', handleSubmit);

const add = document.querySelector('.js-button-add');
add.addEventListener('click', handleSubmit);

document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('shoppingListRef');
    if (ref) {
      items = JSON.parse(ref);
      items.forEach(item => {
        createItem(item);
      });
    }
  });