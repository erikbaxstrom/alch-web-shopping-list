export function renderItem(item) {
    const li = document.createElement('li');
    li.textContent = `${item.quantity} ${item.name}`;
    const boughtBut = document.createElement('button');
    boughtBut.classList.add('bought-button');
    boughtBut.textContent = 'Bought';
    li.append(boughtBut);
    const removeBut = document.createElement('button');
    removeBut.classList.add('remove-button');
    removeBut.textContent = 'Remove';
    li.append(removeBut);
    return li;
}
