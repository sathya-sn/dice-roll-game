const gridTemplate = document.createElement('template');
const playerAvatar = document.createElement('template');
const gridContainer = document.querySelector('.grid-container');
const playerPosition = {
    player1Position : 0, 
    player1Name : 'abc', 
    player2Position: 0, 
    player2Name : 'xyx'
};

let player1Turn = true;
let player2Turn = false;

gridTemplate.innerHTML = `<div class="grid-cell"><span></span></div>`;
playerAvatar.innerHTML = `<cite class="player-avatar"></cite>`;


const makeGrid = (rows, cols) => {
    let xIndex = 0;
    let yIndex = 0;
    let grid = rows * cols;

    for(let count = 0; count < grid; count ++) {
            yIndex = (count % cols);
            
            xIndex = Math.floor(count / 10);

            let currentTemplate = gridTemplate.content.cloneNode('true');

            currentTemplate.querySelector('div').classList.add(`grid-cell-${count}`)

            currentTemplate.querySelector('div').querySelector('span').innerHTML = count;
            
            gridContainer.appendChild(currentTemplate);
    }
}


const getPlayerName = () => { 
    player1 = prompt("Change Player1 name"); 
    player2 = prompt("Change player2 name"); 

    playerPosition.player1Name = player1; 
    playerPosition.player2Name = player1; 

    document.querySelector('.player1-name').innerHTML = player1;
    document.querySelector('.player2-name').innerHTML = player2;
                      
    document.querySelector('.player-grid').setAttribute('player1', player1 ? player1 : playerPosition.player1Name);
    document.querySelector('.player-grid').setAttribute('player2', player2 ? player2 : playerPosition.player2Name);
} 


const rollDice = () => {
    let diceNumber = (Math.floor(Math.random() * 6) + 1);

    document.querySelector('.dice-image').setAttribute('src', `./images/dice-${diceNumber}.png`);

    if(player1Turn) {
        player1Turn = false;
        player2Turn = true;

        document.querySelector('.player1').classList.remove('turn');
        document.querySelector('.player2').classList.add('turn');

        movePlayer(diceNumber, 'player1');
    } else {
        player2Turn = false;
        player1Turn = true;

        document.querySelector('.player2').classList.remove('turn');
        document.querySelector('.player1').classList.add('turn');

        movePlayer(diceNumber, 'player2');
    }
}


const removePlayer = (player) => {
    document.querySelectorAll('.grid-cell').forEach(eachCell => {
        if(eachCell.querySelector(`.${player}`)) 
            eachCell.querySelector(`.${player}`).remove();
        
        if(player === 'player1' && eachCell.hasAttribute('player1')) eachCell.removeAttribute('player1');
        if(player === 'player2' && eachCell.hasAttribute('player2')) eachCell.removeAttribute('player2');
    });
}


const checkPlayerClash = (player, changePlayerPosition) => {
    if(player === 'player1' && document.querySelector(`.grid-cell-${changePlayerPosition}`).getAttribute('player2')) {
        document.querySelector(`.grid-cell-${changePlayerPosition}`).querySelector('.player2').remove();
        
        document.querySelector(`.grid-cell-0`).appendChild(playerAvatar.content.cloneNode('true'));
        
        document.querySelector(`.grid-cell-0`).querySelector('.player-avatar').classList.add('player2');

        playerPosition.player2Position = 0;
    } else if(player === 'player2' && document.querySelector(`.grid-cell-${changePlayerPosition}`).getAttribute('player1')) {
        document.querySelector(`.grid-cell-${changePlayerPosition}`).querySelector('.player1').remove();
        
        document.querySelector(`.grid-cell-0`).appendChild(playerAvatar.content.cloneNode('true'));
        
        document.querySelector(`.grid-cell-0`).querySelector('.player-avatar').classList.add('player1');

        playerPosition.player1Position = 0;
    }
}


const movePlayer = (newPosition, player) => {
    if(player) {
        let currentPlayer = player;
        let currentPlayerPosition = playerPosition[`${currentPlayer}Position`];
        let changePlayerPosition = currentPlayerPosition + newPosition;
        let currentPlayerAvatar = playerAvatar.content.cloneNode('true');

        currentPlayerAvatar.querySelector('cite').classList.add(player);

        if(changePlayerPosition < 100 && document.querySelector(`.grid-cell-${changePlayerPosition}`)) {
            removePlayer(player);

            checkPlayerClash(player, changePlayerPosition);

            document.querySelector(`.grid-cell-${changePlayerPosition}`).appendChild(currentPlayerAvatar);

            document.querySelector(`.grid-cell-${changePlayerPosition}`).setAttribute(`${player}`, 'true');

            playerPosition[`${currentPlayer}Position`] = changePlayerPosition;

            document.querySelector('.player-grid').setAttribute('player-position', `${playerPosition.player1Position} ${playerPosition.player2Position}`)
        } else if(changePlayerPosition === 100) {
            window.alert(`${player} won the game!`);

            document.querySelector(`.${player}`).querySelector('.turn-active').innerHTML = 'You Won!';
            
            document.querySelector(`.${player}`).classList.add('won');
            
            removePlayer(player);
        }
    }
}


makeGrid(10, 10);
movePlayer(0, 'player1');
movePlayer(0, 'player2');
getPlayerName();


document.querySelector('.btn-roll').addEventListener('click', () => {
    rollDice();
});


document.querySelector('.btn-change').addEventListener('click', () => {
    getPlayerName();
});
