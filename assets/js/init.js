
import Game from './core/Game.js';


const canvas = document.querySelector('#game');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const game = new Game(canvas);

let lastTime = 0;

function gameLoop(timeStamp){
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  context.clearRect(0,0,canvas.width,canvas.height);
  game.update(deltaTime);
  game.draw(context);
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
