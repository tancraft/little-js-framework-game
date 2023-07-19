import Brick from './Brick.js';

export function buildLevel(game, level){

    let bricks = [];

    level.forEach((row, rowIndex) => {
        row.forEach((brick, brickIndex) => {
            if(brick === 1){
                let posX = 80 * brickIndex;
                let posY = 75 + 24 * rowIndex;

                bricks.push(new Brick(game, posX, posY));
            }
        })
    })
        return bricks

}

export const  Level1 = [
    [1,0,1,1,0,1,1,1,0,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [0,1,0,0,0,0,0,0,1,0]

];
export const  Level2 = [
    [1,0,1,1,1,1,1,1,0,1],
    [1,1,0,1,1,1,1,1,1,1],
    [1,1,0,1,0,1,0,1,1,1],
    [1,1,0,0,0,0,0,0,1,1]

];