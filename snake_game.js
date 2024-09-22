// game constants
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('eat.mp3');
const gameOver = new Audio('game_over_snake.mp3');
const moveSound = new Audio('change_direction.mp3');
let speed = 5;
let lastPaintTime = 0;
let score = 0;
let snakeArr = [
    {x: 13, y: 15}
]
// food is a object
food = {x: 6, y:7};

// game function
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    // if snake bump into itself
    for (let index = 1; index < snakeArr.length; index++) {
        if(snake[index].x === snake[0].x && snake[index].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0) {
        return true;
    }
}

function gameEngine(){
    // part-1: updating the snake array and food
    if(isCollide(snakeArr)){
        gameOver.play();
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        score = 0;
    }
    // if you have eaten the food 
    //increase the score and regenrate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score>highscore){
            highscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highscoreBox.innerHTML = "HighScore: " + highscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        // unshift: array ki starting mein element add karta hai
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        // to find random number between a to b
        let a = 1;
        let b = 17;
        food = {x:Math.round(a + (b-a)* Math.random()), y:Math.round(a + (b-a)* Math.random())}
    }

    // moving the snake(updating x and y)
    // haar segment ko uske aage wale segment par rakhdo
    for (let i = snakeArr.length-2; i >= 0; i--) {
        // {...snakeArr[i]} is a new object(to avoid reference problem)
        snakeArr[i+1] = {...snakeArr[i]};
        
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    // part-2: display the snake and food

    // displaying the snake
    board.innerHTML = "";
    snakeArr.forEach((e,index) => {
        snakeElement = document.createElement('div');
        // gridRowStart will place that in that particular row
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        } else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // displaying the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}

//main is a function
let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
} else{
    highscoreval = JSON.parse(highscore);
    highscoreBox.innerHTML = "HighScore: " + highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
});