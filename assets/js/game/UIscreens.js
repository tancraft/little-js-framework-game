import UI from '../core/UI.js';

import Button from '../core/Button.js'

export class PausedScreen extends UI {
    constructor(game){
        super(game);
    }
    draw(context){
        context.rect(0, 0, this.gameWidth, this.gameHeight);
        context.fillStyle = 'rgba(0,0,0, 0.5)';
        context.fill();

        context.font = '30px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText('jeu en pause', this.gameWidth * 0.5, this.gameHeight * 0.5);
    }
}

// export class MenuScreen extends UI {
//     constructor(game){
//         super(game);
//         this.realWidth = (((800 / 600) * 100) / 100) * this.game.canvas.width;
//         this.realHeight = (((800 / 600) * 100) / 100) * this.game.canvas.height;
//         this.button = new Button(this.game, this.game.canvas.width * 0.5, this.game.canvas.height * 0.5, 200 * this.realWidth, 40 * this.realHeight);
//     }

//     draw(context){

//         context.rect(0, 0, this.game.canvas.width, this.game.canvas.height);
//         context.fillStyle = 'rgba(0,0,0, 1)';
//         context.fill();

//         context.font = '40px Arial';
//         context.fillStyle = 'white';
//         context.textAlign = 'center';
//         context.fillText('Casse Briques', this.game.canvas.width * 0.5, this.game.canvas.height * 0.4);
//         this.button.draw(context);
//     }
// }


export class MenuScreen extends UI {
    constructor(game){
        super(game);
        this.button = new Button(this.game, this.gameWidth * 0.5, this.gameHeight * 0.5, 200, 40);
    }
    draw(context){
        context.rect(0, 0, this.gameWidth, this.gameHeight);
        context.fillStyle = 'rgba(0,0,0, 1)';
        context.fill();
        context.font = '40px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText('Casse Briques', (this.gameWidth * 0.5), (this.gameHeight * 0.4));
        this.button.draw(context);
    }
}

export class GameScreen extends UI {
    constructor(game){
        super(game);
    }
    draw(context){
        context.rect(0, 0, this.gameWidth, this.gameHeight);
        context.fillStyle = 'rgba(0,0,0, 1)';
        context.fill();

        context.font = '40px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText('GAME OVER', this.gameWidth * 0.5, this.gameHeight * 0.4);
    }
}