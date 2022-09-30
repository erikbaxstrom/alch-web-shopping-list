/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { renderItem } from './render-utils.js';
import {
    createItem,
    getItems,
    boughtItem,
    removeAllItems,
    getUser,
    removeBoughtItems,
} from './fetch-utils.js';

/* Get DOM Elements */
const addItemForm = document.getElementById('add-item-form');
const errorDisplay = document.getElementById('error-display');
const shoppingList = document.getElementById('shopping-list');
const removeAllButton = document.getElementById('remove-all');
const userDisplay = document.getElementById('user-display');
const removeBoughtButton = document.getElementById('remove-bought');

/* State */
let items = [];
let error = null;
let user = getUser(); //??why does this need to be here? user has an identical declaration in /auth/user.js which is included in this file. So why does it need to be delcared again in this file?

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
    displayUser();
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

removeAllButton.addEventListener('click', async () => {
    const response = await removeAllItems(user);
    error = response.error;
    if (error) {
        displayError();
    } else {
        items = [];
        displayItems();
    }
});

removeBoughtButton.addEventListener('click', async () => {
    const response = await removeBoughtItems(user);
    error = response.error;
    if (error) {
        displayError();
    } else {
        const unBoughtItems = [];
        for (const item of items) {
            if (item.bought === false) {
                unBoughtItems.push(item);
            }
            items = unBoughtItems;
        }
        displayItems();
    }
});

/* Display Functions */

function displayItems() {
    shoppingList.innerHTML = '';
    for (let item of items) {
        const liEl = renderItem(item);
        //
        if (item.bought) {
            liEl.classList.add('bought');
        } else {
            liEl.addEventListener('click', async () => {
                const response = await boughtItem(item.id);
                error = response.error;
                const updatedItem = response.data;
                if (error) {
                    displayError();
                } else {
                    const index = items.indexOf(item);
                    items[index] = updatedItem;
                }
                displayItems();
            });
        }

        shoppingList.append(liEl);
    }
}

function displayError() {
    errorDisplay.textContent = error;
}

function displayUser() {
    userDisplay.textContent = user.email;
}
