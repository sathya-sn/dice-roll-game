const gridTemplate = document.createElement('template');
const gridContainer = document.querySelector('.grid-container');

gridTemplate.innerHTML = `<div class="grid-cell"></div>`

const makeGrid = (rows, cols) => {
    let xIndex = 0;
    let yIndex = 0;
    let grid = rows * cols;

    for(let count = 0; count < grid; count ++) {
            yIndex = (count % cols);
            
            xIndex = Math.floor(count / 10);

            let currentTemplate = gridTemplate.content.cloneNode('true');

            currentTemplate.querySelector('div').classList.add(`grid-cell-${xIndex}${yIndex+1}`)

            gridContainer.appendChild(currentTemplate);
    }
}

makeGrid(10, 10);