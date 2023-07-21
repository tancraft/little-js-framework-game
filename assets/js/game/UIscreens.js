import UI from '../core/UI.js';

import Button from '../core/Button.js'

export class MenuScreen extends UI {
    constructor(game){
        super(game);
        this.button = new Button(this.game, this.gameWidth * 0.5, this.gameHeight * 0.5, 200, 40, 'white','press to start');
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

export class mainUI extends UI {
    constructor(game){
        super(game);
        this.left = new Button(this.game, 80 * 0.5, this.gameHeight - 80 * 0.5, 60, 60, 'rgba(255,0,100, 0.2)','left', 'left');
        this.right = new Button(this.game, 240 * 0.5, this.gameHeight - 80 * 0.5, 60, 60, 'rgba(255,0,100, 0.2)','right', 'right');
    }
    draw(context){
        context.font = '16px Arial';
        context.fillStyle = 'black';
        context.textAlign = 'center';
        context.fillText('score: ' + this.game.score, this.gameWidth - 50, 30);

        this.left.draw(context);
        this.right.draw(context);
    }
}

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

export class GameOverScreen extends UI {
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