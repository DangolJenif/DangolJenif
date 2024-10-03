const bird = document.getElementById('bird');
const pipe = document.getElementById('pipe');
const pipeInverted = document.getElementById('pipe-inverted');
let birdTop = 250;
let birdFallingSpeed = 0;
let gravity = 0.2;
let isGameOver = false;
let pipeLeft = 300;
let pipeSpeed = 2;
let score = 0;

// Make the bird fall
function updateBird() {
  if (!isGameOver) {
    birdFallingSpeed += gravity;
    birdTop += birdFallingSpeed;
    bird.style.top = birdTop + 'px';

    if (birdTop > 470 || birdTop < 0) {
      gameOver();
    }
  }
}

// Control bird jump
document.addEventListener('keydown', function (event) {
  if (event.code === 'Space') {
    birdFallingSpeed = -5;
  }
});

// Move pipes
function updatePipes() {
  if (!isGameOver) {
    pipeLeft -= pipeSpeed;
    pipe.style.left = pipeLeft + 'px';
    pipeInverted.style.left = pipeLeft + 'px';

    // Reset pipe position and increase score
    if (pipeLeft < -50) {
      pipeLeft = 300;
      score++;
      console.log('Score: ', score);
    }

    // Check for collisions
    if (pipeLeft < 80 && pipeLeft > 20 && (birdTop < 150 || birdTop > 300)) {
      gameOver();
    }
  }
}

// Game over
function gameOver() {
  isGameOver = true;
  alert('Game Over! Your score: ' + score);
  location.reload(); // Reload the page to restart the gam\e
}

// Game loop
function gameLoop() {
  updateBird();
  updatePipes();
  if (!isGameOver) {
    requestAnimationFrame(gameLoop);
  }
}

// Start game
gameLoop();
