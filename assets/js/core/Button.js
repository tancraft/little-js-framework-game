export default class Button {
    constructor(game, posX, posY, width, height,color, text, name, type) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.text = text || name;
        this.color = color || 'white';
        this.name = name || 'carre';
        this.type = type || 'square';
        this.posX = posX;
        this.posY = posY;
        this.isMoving = false;
    }

    draw(context) {
        if (this.type === 'square') {
            context.fillStyle = this.color;
            context.fillRect(this.posX - this.width * 0.5, this.posY - this.height * 0.6, this.width, this.height);

            context.font = '16px Arial';
            context.fillStyle = 'black';
            context.textAlign = 'center';
            context.fillText(this.text, this.posX, this.posY);

        } else {
            context.fillStyle = this.color;
            context.beginPath();
            context.arc(this.posX, this.posY, this.width, 0, 2 * Math.PI);
            context.fill();
        }
    }

    click(posX, posY) {
        // Ajustez les coordonnées du clic en fonction du ratio d'aspect
        const adjustedPosX = posX / this.game.aspectRatio;
        const adjustedPosY = posY / this.game.aspectRatio;
        this.isMoving = true;
        
        if (this.type === 'square') {
            if (
                adjustedPosX > this.posX - this.width * 0.5 &&
                adjustedPosX < this.posX + this.width - this.width * 0.5 &&
                adjustedPosY > this.posY - this.height * 0.5 &&
                adjustedPosY < this.posY + this.height - this.height * 0.5
                ) {
                return true;
            } else {
                return false;
            }
        } else {
            const distance = Math.sqrt((adjustedPosX - this.posX) * 2 + (adjustedPosY - this.posY) * 2);

            if (distance <= this.width) {
                return true;
            } else {
                return false;
            }
        }
    }
    handleMouseDown() {
        this.isMoving = true;
      }
    
    handleMouseUp() {
        this.isMoving = false;
      }
}

