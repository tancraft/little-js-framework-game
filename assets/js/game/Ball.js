import GameObject from '../core/GameObject.js';
import { collisionDetection } from "../core/collisionDetection.js";

export default class Ball extends GameObject {
    constructor(game){
        super(game);
        this.gameWidth = this.game.gameWidth;
        this.gameHeight = this.game.gameHeight;
        this.size = 8;
        this.reset();
    }

    reset(){
        this.posX = 10;
        this.posY = 400;
        this.speedX = 4;
        this.speedY = -2;
    }

    draw(context){
        context.fillStyle = 'red';
        context.beginPath();
        context.arc(this.posX, this.posY, this.size, 0, 2 * Math.PI);
        context.fill();
    }
    update(deltaTime){
        this.posX += this.speedX;
        this.posY += this.speedY;
        if(this.posX + this.size > this.gameWidth || this.posX < 0 ){
            this.speedX = -this.speedX
        }

        if(this.posY < 0 ){
            this.speedY = -this.speedY;
        }
        if(this.posY + this.size > this.gameHeight){
            this.game.lives--;
            this.reset();
        }

        if(collisionDetection(this, this.game.player)){
            this.speedY = -this.speedY;
            this.posY = this.game.player.posY - this.size;
        }
    }
}