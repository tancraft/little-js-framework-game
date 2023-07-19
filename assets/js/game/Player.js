import GameObject from '../core/GameObject.js';

export default class Player extends GameObject {
    constructor(game) {
        super(game);
        this.gameWidth = this.game.gameWidth;
        this.gameHeight = this.game.gameHeight;
        this.width = 150;
        this.height = 20;
        this.posX = this.gameWidth * 0.5 - this.width * 0.5;
        this.posY = this.gameHeight - this.height - 10;
        this.speed = 0;
        this.maxSpeed = 7;
    }
    draw(context) {
        context.fillStyle = '#00a1f1';
        context.fillRect(this.posX, this.posY, this.width, this.height);
    }

    update(deltaTime) {
        this.posX += this.speed;

        if (this.posX < 0) this.posX = 0;
        if (this.posX + this.width > this.gameWidth) this.posX = this.gameWidth - this.width;
    }

    moveLeft() {
        this.speed = -this.maxSpeed;
    }
    moveRight() {
        this.speed = this.maxSpeed;
    }
    shot(){
        console.log('fire')
    }
    stop() {
        this.speed = 0;
    }
}
