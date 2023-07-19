import Button from './Button.js';

export default class InputHandler {
    constructor(game, player, button) {
        this.game = game;
        this.button = game.UIelements[1].button;
        // this.circle = game.UIelements[1].circle;
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

        this.canvas.addEventListener('touchstart', (event) => {
            this.handleButtonClick(event);
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
        event.preventDefault();
        
        let posX, posY;
        
        if (event.type === 'click') {
            const rect = this.canvas.getBoundingClientRect();
            posX = event.pageX - rect.left;
            posY = event.pageY - rect.top;
        } else if (event.type === 'touchstart') {
            posX = event.touches[0].pageX;
            posY = event.touches[0].pageY;
        }

        if (this.button.click(posX, posY)) {
            this.game.start();
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
                    const prevButtonPauseState = this.prevGamepadState.buttons[8].pressed;
                    const currButtonPauseState = gamepad.buttons[8].pressed;

                    if (!prevButtonPauseState && currButtonPauseState) {
                        this.game.togglePause();
                    }
                }

                if (gamepad.buttons[9].pressed) {
                    this.game.start();
                }

                this.prevGamepadState = gamepad;
            }
        }
    }
}
