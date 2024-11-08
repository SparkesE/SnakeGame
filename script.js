document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const squares = [];
    const scoreDisplay = document.querySelector('span');
    const startBtn = document.querySelector('.start');
    const startToggle = document.getElementById('startToggle');
    const endToggle = document.getElementById('endToggle');
    
    const width = 25; 
    const totalSquares = width * width; 

    let currentIndex = 0;
    let appleIndex = 0;
    let currentSnake = [2, 1, 0]; 
    let direction = 1; 
    let score = 0;
    let intervalTime = 100; 
    let interval = 0;

    
    for (let i = 0; i < totalSquares; i++) {
        const divElement = document.createElement("div");
        grid.appendChild(divElement);
        squares.push(divElement);
    }

    function startGame() {
        
        currentSnake = [2, 1, 0]; 
        direction = 1; 
        score = 0;
        scoreDisplay.textContent = score;

        
        squares.forEach(square => square.classList.remove('snake', 'apple'));

        
        currentSnake.forEach(index => squares[index].classList.add('snake'));

        
        randomApple();

        
        startToggle.style.display = "none";
        endToggle.style.display = "none";

        
        interval = setInterval(moveOutcomes, intervalTime);
    }

    function moveOutcomes() {
        
        if (
            (currentSnake[0] + width >= totalSquares && direction === width) || // Hits bottom
            (currentSnake[0] % width === width - 1 && direction === 1) || // Hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || // Hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || // Hits top wall
            squares[currentSnake[0] + direction].classList.contains('snake') // Hits itself
        ) {
            
            clearInterval(interval);
            showFinalScore();
            return;
        }

        
        const tail = currentSnake.pop();
        squares[tail].classList.remove('snake'); 

        
        currentSnake.unshift(currentSnake[0] + direction); 
        squares[currentSnake[0]].classList.add('snake'); 

        
        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple'); 
            currentSnake.push(tail); 
            squares[tail].classList.add('snake'); 

            
            score++;
            scoreDisplay.textContent = score;

            
            randomApple();
        }
    }

    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * totalSquares);
        } while (squares[appleIndex].classList.contains('snake')); 

        squares[appleIndex].classList.add('apple'); 
    }

    function control(e) {
        if (e.keyCode === 39 && direction !== -1) { 
            direction = 1;
        } else if (e.keyCode === 38 && direction !== width) { 
            direction = -width;
        } else if (e.keyCode === 37 && direction !== 1) { 
            direction = -1;
        } else if (e.keyCode === 40 && direction !== -width) { 
            direction = width;
        }
    }

    function showFinalScore() {
        
        endToggle.style.display = "block";
        startToggle.style.display ="block";
        const finalScore = `You finished with the Score: ${score}`;
        document.getElementById("totalScore").innerText = finalScore;
    }

    
    document.addEventListener('keydown', control);
    startBtn.addEventListener('click', startGame); 

});
