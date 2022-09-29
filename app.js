/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { renderItem } from './render-utils.js';
import { createItem, getItems } from './fetch-utils.js';

/* Get DOM Elements */
const addItemForm = document.getElementById('add-item-form');
const errorDisplay = document.getElementById('error-display');
const shoppingList = document.getElementById('shopping-list');

/* State */
let items = [];
let error = null;

/* Events */
window.addEventListener('load', async () => {
    const response = await getItems();
    error = response.error;
    items = response.data;

    if (error) {
        displayError();
    } else {
        displayItems();
    }
});

addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addItemForm);
    const newItem = {
        name: formData.get('item-to-add'),
        quantity: formData.get('quantity'),
        bought: false,
    };

    const response = await createItem(newItem);
    console.log(response);
    error = response.error;
    const item = response.data;

    if (error) {
        displayError();
    } else {
        items.unshift(item);
        displayItems();
    }

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

function displayError() {
    errorDisplay.textContent = error;
}
