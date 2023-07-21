import Ball from '../game/Ball.js';
import InputHandler from './InputHandler.js';
import Player from '../game/Player.js';
import { buildLevel, Level1, Level2 } from '../game/levels.js';
import { PausedScreen, MenuScreen, GameOverScreen, mainUI } from '../game/UIscreens.js';

const GAMESTATE = {
    PAUSED: 0,
    MENU: 1,
    GAMEOVER: 2,
    RUNNING: 3,
    NEWLEVEL: 4
};

export default class Game {
    constructor(canvas, bricksPerRow) {
        this.canvas = canvas;
        this.gameWidth = 800;
        this.gameHeight = 600;
        this.aspectRatio = canvas.clientWidth / this.gameWidth;
        this.gameState = GAMESTATE.MENU;
        this.UIelements = [
            new PausedScreen(this),
            new MenuScreen(this),
            new GameOverScreen(this),
            new mainUI(this)
        ];

        this.player = new Player(this);
        this.ball = new Ball(this);
        this.inputHandler = new InputHandler(this, this.player);
        this.gameObjects = [];
        this.bricks = [];
        this.levels = [Level1, Level2];

        this.currentLevel = 0;
        this.lives = 1;
        this.score = 0;
    }

    start() {
        if (this.gameState !== GAMESTATE.MENU && this.gameState !== GAMESTATE.NEWLEVEL) return;

        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.ball.reset();
        this.gameObjects = [this.ball, this.player];
        this.gameState = GAMESTATE.RUNNING;
    }

    update(deltaTime) {
        this.inputHandler.update();

        if (this.lives === 0) this.gameState = GAMESTATE.GAMEOVER;

        if (this.gameState === GAMESTATE.PAUSED || this.gameState === GAMESTATE.MENU || this.gameState === GAMESTATE.GAMEOVER) return;

        if (this.bricks.length === 0) {
            this.currentLevel++;
            this.gameState = GAMESTATE.NEWLEVEL;
            this.start();
        }

        [...this.gameObjects, ...this.bricks].forEach((object) => object.update(deltaTime));
        this.bricks = this.bricks.filter(brick => !brick.markedForDelete);
    }

    draw(context) {
        [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(context));

        if (this.gameState === GAMESTATE.PAUSED) this.UIelements[0].draw(context);
        if (this.gameState === GAMESTATE.MENU) this.UIelements[1].draw(context);
        if (this.gameState === GAMESTATE.GAMEOVER) this.UIelements[2].draw(context);
        if (this.gameState === GAMESTATE.RUNNING) this.UIelements[3].draw(context);
    }

    togglePause() {
        if(this.gameState !== GAMESTATE.MENU){

            if (this.gameState === GAMESTATE.PAUSED) {
                this.gameState = GAMESTATE.RUNNING;
            } else {
                this.gameState = GAMESTATE.PAUSED;
            }
        }
    }

    toggleFullscreen() {
        const doc = window.document;
        const docEl = doc.documentElement;
        const isFullscreen = doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement;

        if (!isFullscreen) {
            const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
            if (requestFullScreen) {
                requestFullScreen.call(docEl);
            }
        } else {
            const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
            if (cancelFullScreen) {
                cancelFullScreen.call(doc);
            }
        }

        if (this.isMobileDevice() && window.screen.orientation) {
            if (isFullscreen && this.isPortraitMode()) {
                if (docEl.requestFullscreen) {
                    docEl.requestFullscreen().catch(() => {
                        // Do nothing if fullscreen request is denied (common on mobile devices)
                    });
                } else if (docEl.mozRequestFullScreen) {
                    docEl.mozRequestFullScreen().catch(() => {});
                } else if (docEl.webkitRequestFullScreen) {
                    docEl.webkitRequestFullScreen().catch(() => {});
                } else if (docEl.msRequestFullscreen) {
                    docEl.msRequestFullscreen().catch(() => {});
                }
            } else {
                if (doc.exitFullscreen) {
                    doc.exitFullscreen();
                } else if (doc.mozCancelFullScreen) {
                    doc.mozCancelFullScreen();
                } else if (doc.webkitExitFullscreen) {
                    doc.webkitExitFullscreen();
                } else if (doc.msExitFullscreen) {
                    doc.msExitFullscreen();
                }
            }
        }
    }

    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    isPortraitMode() {
        return window.matchMedia("(orientation: portrait)").matches;
    }
}
