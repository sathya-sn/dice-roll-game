const gridTemplate = document.createElement('template');
const gridContainer = document.querySelector('.grid-container');

gridTemplate.innerHTML = `<div class="grid-cell"></div>`

const makeGrid = (rows, cols) => {
    console.log('inside makegrid')
    let xIndex = 0;
    let yIndex = 0;
    let count = 0;
    let grid = rows * cols;

    [...Array(grid).keys()].map(eachGrid => {
        console.log(eachGrid);
        console.log(grid);
        console.log('count::' + count)
        if(count < grid) {
            yIndex = count % cols;

            if(yIndex === (rows - 1)) xIndex + 1;

            let currentTemplate = gridTemplate.content.cloneNode('true');

            currentTemplate.querySelector('div').classList.add(`grid-cell-${xIndex}-${yIndex}`)

            gridContainer.appendChild(currentTemplate);
        }
        count + 1;
    });
}

makeGrid(10, 10);