/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { renderItem } from './render-utils.js';
import { createItem } from './fetch-utils.js';

/* Get DOM Elements */
const addItemForm = document.getElementById('add-item-form');
const itemToAdd = document.getElementById('item-to-add');
const errorDisplay = document.getElementById('error-display');
const shoppingList = document.getElementById('shopping-list');

/* State */
let items = [];
let error = null;

/* Events */
window.addEventListener('load', () => {
    // todo: set items and error state from getItems();
    items = [
        { name: 'Beans', quantity: 3 },
        { name: 'Cheerios', quantity: 8 },
        { name: 'Milk', quantity: 1 },
    ];
    displayItems();
});

addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addItemForm);
    const newItem = { name: formData.get('item-to-add') };

    const response = await createItem(newItem);

    addItemForm.reset();
});
/* Display Functions */

function displayItems() {
    //reset ul contents
    shoppingList.innerHTML = '';
    //loop through items
    for (let item of items) {
        //  render
        const liEl = renderItem(item);
        //  append to ul
        shoppingList.append(liEl);
    }
}
