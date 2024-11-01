document.addEventListener('DOMContentLoaded', () => {
    console.log('app1.js is running.');

    const playerDot = document.getElementById('player-dot');
    const obstacleDot = document.getElementById('obstacle-dot');
    const scoreDisplay = document.getElementById('score');

    // Log to check if elements are found
    console.log('playerDot:', playerDot);
    console.log('obstacleDot:', obstacleDot);
    console.log('scoreDisplay:', scoreDisplay);

    if (!playerDot || !obstacleDot || !scoreDisplay) {
        console.error('Required elements not found in the DOM.');
        return;
    }

    let isJumping = false;
    let score = 0;
    let gameInterval;
    let isGameRunning = false;

    document.getElementById('game-container').addEventListener('click', () => {
        if (!isGameRunning) {
            console.log('Game starting...');
            isGameRunning = true;
            score = 0;
            scoreDisplay.textContent = score;
            startGame();
        } else {
            jump();
        }
    });

    function startGame() {
        console.log('Game loop started.');
        obstacleDot.style.right = '-20px';
        gameInterval = setInterval(() => {
            let obstaclePosition = parseInt(obstacleDot.style.right);
            obstaclePosition += 5;
            obstacleDot.style.right = obstaclePosition + 'px';

            const playerBottom = parseInt(window.getComputedStyle(playerDot).bottom);
            if (obstaclePosition >= 50 && obstaclePosition <= 70 && playerBottom <= 20) {
                console.log('Collision detected. Game over.');
                clearInterval(gameInterval);
                isGameRunning = false;
                alert('Game Over! Your final score: ' + score);
            }

            if (obstaclePosition > window.innerWidth) {
                console.log('Obstacle reset.');
                obstacleDot.style.right = '-20px';
                score++;
                scoreDisplay.textContent = score;
            }
        }, 50);
    }

    function jump() {
        if (isJumping) return;
        isJumping = true;
        console.log('Jump initiated.');

        let jumpHeight = 0;
        const jumpInterval = setInterval(() => {
            if (jumpHeight < 50) {
                jumpHeight += 5;
                playerDot.style.bottom = jumpHeight + 'px';
            } else {
                clearInterval(jumpInterval);
                fall();
            }
        }, 20);
    }

    function fall() {
        console.log('Fall initiated.');
        const fallInterval = setInterval(() => {
            let currentBottom = parseInt(playerDot.style.bottom);
            if (currentBottom > 0) {
                currentBottom -= 5;
                playerDot.style.bottom = currentBottom + 'px';
            } else {
                clearInterval(fallInterval);
                isJumping = false;
            }
        }, 20);
    }
});
