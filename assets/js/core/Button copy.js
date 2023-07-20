export default class Button {
    constructor(game,posX,posY, width, height, type) {
        this.game = game;
        this.width = width ;
        this.height = height;
        this.type = type || 'square';
        this.posX = posX;
        this.posY = posY;
    }

    draw(context) {
        if (this.type === 'square'){
            context.fillStyle = 'white';
            context.fillRect(this.posX - this.width * 0.5, this.posY - this.height * 0.6, this.width, this.height);

            context.font = '16px Arial';
            context.fillStyle = 'black';
            context.textAlign = 'center';
            context.fillText('press to start', this.posX , this.posY);

        }else {
            context.fillStyle = 'red';
            context.beginPath();
            context.arc(this.posX, this.posY, this.width, 0, 2 * Math.PI);
            context.fill();
        }
    }

    click(posX, posY) {
        if (this.type === 'square'){
            if (
                posX > this.posX - this.width * 0.5 &&
                posX < this.posX + this.width - this.width * 0.5 &&
                posY > this.posY - this.height * 0.5 &&
                posY < this.posY + this.height - this.height * 0.5
            ) {
                return true;
            } else {
                return false;
            }
        }else {
            const distance = Math.sqrt((posX - this.posX) * 2 + (posY - this.posY) * 2);

            if (distance <= this.width) {
                return true;
            } else {
                return false;
            }
        }
    }
}
