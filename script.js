import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");

let lastTime;

function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y);

    const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));
    document.documentElement.style.setProperty("--hue", hue + delta * 0.009);

    if(isLose()) handleLose();
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

document.addEventListener('mousemove', (e) => {
    playerPaddle.position = (e.y / window.innerHeight) * 100;
})

function isLose(){
    const ballRect = ball.rect();
    return ballRect.left <= 0 || ballRect.right >= window.innerWidth;
}

function handleLose(){

    const ballRect = ball.rect();

    if(ballRect.right >= window.innerWidth){
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
    } else {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
    }

    ball.reset();
    computerPaddle.reset();
}

window.requestAnimationFrame(update);
