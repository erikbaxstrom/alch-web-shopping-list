export function renderItem(item) {
    const li = document.createElement('li');
    li.textContent = `${item.quantity} ${item.name}`;
    return li;
}
