import GameObject from '../core/GameObject.js';

import { collisionDetection } from "../core/collisionDetection.js";

export default class Brick extends GameObject {
    constructor(game,posX,posY){
        super(game);
        this.image = document.querySelector('#brick');
        this.posX = posX;
        this.posY = posY;
        this.width = 80;
        this.height = 27;
        this.score = 10;
        this.markedForDelete = false
    }
    update(deltaTime){
        if(collisionDetection(this.game.ball, this)){
            this.game.ball.speedY = -this.game.ball.speedY;
            this.game.score += this.score;
            this.markedForDelete = true
        }
    }

    draw(context){
        context.drawImage(
            this.image, 
            this.posX, 
            this.posY, 
            this.width, 
            this.height
            )
    }
}