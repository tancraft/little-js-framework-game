import Button from './Button.js';

export default class InputHandler {
    constructor(game, player, button) {
        this.game = game;
        this.button = game.UIelements[1].button;
        this.canvas = game.canvas;
        this.gamepadConnected = false;
        this.gamepadIndex = undefined;
        this.prevGamepadState = null;

        addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'q':
                case 'ArrowLeft':
                    player.moveLeft();
                    break;
                case 'd':
                case 'ArrowRight':
                    player.moveRight();
                    break;
                case 'Escape':
                    game.togglePause();
                    break;
                case ' ':
                    game.start();
                    break;
                case 't':
                    game.toggleFullscreen();
                    break;
            }
        });

        addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'q':
                case 'd':
                case 'ArrowLeft':
                case 'ArrowRight':
                    player.stop();
                    break;
            }
        });

        this.canvas.addEventListener('click', (event) => {
            this.handleButtonClick(event);
        });
        this.canvas.addEventListener('mouseup', (event) => {
            this.handleButtonClick(event);
            this.game.UIelements[3].left.handleMouseUp();
            this.game.UIelements[3].right.handleMouseUp();
          });

        this.canvas.addEventListener('touchstart', (event) => {
            this.handleButtonClick(event);
        });
        this.canvas.addEventListener('touchend', (event) => {
            this.handleButtonClick(event);
            this.game.UIelements[3].left.handleMouseUp();
            this.game.UIelements[3].right.handleMouseUp();
          });

        addEventListener('gamepadconnected', (e) => {
            this.gamepadConnected = true;
            this.gamepadIndex = e.gamepad.index;
        });

        addEventListener('gamepaddisconnected', (e) => {
            if (e.gamepad.index === this.gamepadIndex) {
                this.gamepadConnected = false;
                this.gamepadIndex = undefined;
            }
        });
    }

    handleButtonClick(event) {

        //mouvements
        event.preventDefault();
        let posX, posY;
        if (event.type === 'click') {
          posX = event.pageX - this.canvas.offsetLeft;
          posY = event.pageY - this.canvas.offsetTop;
        } else if (event.type === 'touchstart') {
          posX = event.touches[0].pageX;
          posY = event.touches[0].pageY;
        }

        //autres boutons

        if (this.game.UIelements[1].button.click(posX, posY)) {
            this.game.start();
        }
        if (this.game.UIelements[1].fullscreen.click(posX, posY)) {
            this.game.toggleFullscreen();
        }

        // mouvements

        if (this.game.UIelements[3].left.click(posX, posY)) {
            this.game.UIelements[3].left.handleMouseDown();
            this.game.player.moveLeft();
          } else if (this.game.UIelements[3].right.click(posX, posY)) {
            this.game.UIelements[3].right.handleMouseDown();
            this.game.player.moveRight();
          } else {
            this.game.UIelements[3].right.handleMouseUp();
            this.game.player.stop();
        }
        //autres boutons
        if (this.game.UIelements[3].fullscreen.click(posX, posY)) {
            this.game.toggleFullscreen();
        }

}

    update() {
        
            /*
            Bouton A : index 0
                Bouton B : index 1
                Bouton X : index 2
                Bouton Y : index 3
                Bouton LB (Bumper gauche) : index 4
                Bouton RB (Bumper droit) : index 5
                Bouton LT (Trigger gauche) : index 6
                Bouton RT (Trigger droit) : index 7
                Bouton Select / Back : index 8
                Bouton Start : index 9
                Stick gauche (clic) : index 10
                Stick droit (clic) : index 11
                Croix directionnelle (haut, bas, gauche, droite) : index 12, 13, 14, 15

                 navigator.getGamepads() tester les index
            */
        if (this.gamepadConnected) {
            const gamepads = navigator.getGamepads();
            const gamepad = gamepads[this.gamepadIndex];

            if (gamepad) {

                const axisX = gamepad.axes[0];

                if (axisX < -0.5) {
                    this.game.player.moveLeft();
                } else if (axisX > 0.5) {
                    this.game.player.moveRight();
                } else {
                    this.game.player.stop();
                }

                if (gamepad.buttons[0].pressed) {
                    this.game.player.shot();
                }

                if (this.prevGamepadState) {
                    const prevButtonPauseState = this.prevGamepadState.buttons[3].pressed;
                    const currButtonPauseState = gamepad.buttons[3].pressed;

                    if (!prevButtonPauseState && currButtonPauseState) {
                        this.game.togglePause();
                    }
                }
                if (gamepad.buttons[8].pressed) {
                    this.game.toggleFullscreen();
                }

                if (gamepad.buttons[9].pressed) {
                    this.game.start();
                }

                this.prevGamepadState = gamepad;
            }
        }
    }
}
