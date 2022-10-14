let maze = [
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 4, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 4, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
    [0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3],
]

let player = [0, 0]; //position for player vertical | horizontal
let bag = 0;

//maze size 12x12 
const ROWS = 12;
const COLS = 12;

//Maze characters for positioning
const EMPTY = 0;
const WALL = 1;
const PLAYER = 2;
const EXIT = 3;
const HARVEST = 4;

const HARVEST_COUNT = 2; //you have to change this for the amount you are collecting inside your game!


//Keyboard controlers (arrows) | JavaScript KeyCode
const DOWN = 40;
const UP = 38;
const LEFT = 37;
const RIGHT = 39;


window.onload = () => {
    createBoard()
    renderMaze()
}


function createBoard(){
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) { 
            const block = document.createElement('div')
            block.id = `id-${col}-${row}`
            document.querySelector(".board").appendChild(block);
        }
    }
}

const renderMaze = () => {
    if (bag < HARVEST_COUNT) {
        document.querySelector('.info').textContent = 'collect all the gems';
    } else {
        document.querySelector('.info').textContent = 'Go to exit';
    }

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            let itemClass = ''
            switch (maze[row][col]) {
                case PLAYER:
                    itemClass = 'player'; break
                case WALL:
                    itemClass = 'wall'; break
                case PLAYER:
                    itemClass = 'human'; break
                case EXIT:
                    itemClass = 'exit'; break
                case HARVEST:
                    itemClass = 'harvestItens'; break
                default:
                    itemClass = 'empty'
            }
            const id = `#id-${col}-${row}`

            document.querySelector(id).className = `block ${itemClass}`
        }
    }
    const id = `#id-${player[1]}-${player[0]}`
    if (!(bag === HARVEST_COUNT && player[1] === COLS - 1 && player[0] === ROWS - 1)) {
        document.querySelector(id).className = 'block player'
    }
    else {
        document.querySelector(id).className = 'block player bye'
        document.querySelector('.info').textContent = 'bye!'
    }


    document.querySelector('.harvest-count').textContent = `${bag} / ${HARVEST_COUNT}`
}

//keyboard events
window.onkeydown = (event) => 
{
    switch (event.keyCode) {
        case DOWN:
            direction = DOWN;  break
        case UP:
            direction = UP; break;
        case LEFT:
            direction = LEFT; break
        case RIGHT:
            direction = RIGHT; break
        default:
            direction = 0
    }

    //checking if controller key was pressed
    //call the change player position function using the direction value
    if (direction !== 0) {
        changePlayerPos(direction);
    }
}

const changePlayerPos = (direction) => {
    let [dy, dx] = [0, 0]; 
    switch (direction) {
        case UP:
            dy = -1; break;
        case RIGHT:
            dx = 1; break;
        case LEFT:
            dx = -1; break;
        case DOWN:
            dy = 1; break;
        default:
            return state
    }

    const x = player[1] + dx
    const y = player[0] + dy

    if (x >= 0 && x < COLS && y >= 0 && y < ROWS &&
        maze[y][x] !== WALL) {
            player = [y, x]

            if (maze[y][x] === HARVEST) {
                maze[y][x] = EMPTY
                bag++
            }
            
            renderMaze()
        } 

}