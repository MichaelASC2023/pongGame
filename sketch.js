// Collaborators: Michael Luu / Abdul / Jayvon T.

// Declare Variable for Canvas Width and Height
let canvasWidth = 1520;
let canvasHeight = 725;

// Declare Variables for Initial position of Enemy, Ball, and Player
let ballPosX = canvasWidth / 2;
let ballPosY = canvasHeight / 2;
let myPosX = 100;
let myPosY = canvasHeight / 2;
let enemyPosX = canvasWidth - 100
let enemyPosY = canvasHeight / 2;

// Declare Variables for Initial trajectory of Ball and Enemy
let ballVelocityX = 5;
let ballVelocityY = 5;
let ballDirectionX = -1;
let ballDirectionY = -1;
let enemyDirection = 1;
let enemyVelocity = 3.9;

// Declare r, g, b Values for Ball
let r = 255;
let g = 255;
let b = 255;

let paddleHeight = 100;

let pongSound;

// Declare Variable for Initial state
let state = "startMenu";

// Declare Variables for Player and Enemy HitBox
let myLeft, myRight, myTop, myBottom;
let enemyLeft, enemyRight, enemyTop, enemyBottom;

// Declare Variable for Score
let score = [0, 0];

// Function creates the start screen
function setup() {
    background(0);
    createCanvas(canvasWidth, canvasHeight);
    noStroke();
    rectMode(CENTER);
    fill(0, 255, 0);
    textSize(20);
    textAlign(CENTER);
    text("Click to Start!", 760, 365);
    text("First to 3 Wins!", 760, 565);
    textSize(200);
    text("Pong!", 760, 165);
    setLineDash([5, 5]);
}

// Function establishes dotted line
function setLineDash(list) {
    drawingContext.setLineDash(list);
  }

function preload() {
    pongSound = loadSound("sounds/pong.mp3");
}

// If the player has began the game (known if state == "gameMenu"), then the function will iterate enemy movement, player movement, and ball movement
function draw() {

    checkWin();

    if (state == "gameMenu") {
        background(0);

        fill(255, 255, 255);
        rect(myPosX, myPosY, 30, paddleHeight);

        fill(255, 255, 255);
        rect(enemyPosX, enemyPosY, 30, paddleHeight);

        stroke(255);
        fill(255);
        line(760, 0, 760, 1520);
        noStroke();

        fill(0, 255, 0);
        textSize(50);
        textAlign(CENTER);
        text(score[0], 700, 70);

        fill(0, 255, 0);
        textSize(50);
        textAlign(CENTER);
        text(score[1], 820, 70);

        if (keyIsDown(UP_ARROW) && myPosY > paddleHeight/2) {
            myPosY -= 5;
        }

        if (keyIsDown(DOWN_ARROW) && myPosY < canvasHeight-paddleHeight/2) {
            myPosY += 5;
        }

        myRight = myPosX + 15;
        myTop = myPosY - 15;
        myBottom = myPosY + 15;

        enemyLeft = enemyPosX - 15;
        enemyTop = enemyPosY - 15;
        enemyBottom = enemyPosY + 15;

        ballLeft = ballPosX - 15;
        ballRight = ballPosX + 15;
        ballTop = ballPosY - 15;
        ballBottom = ballPosY + 15;

        fill(r, g, b);
        ellipse(ballPosX, ballPosY, 50, 50);
        ballPosX += ballVelocityX * ballDirectionX;
        ballPosY += ballVelocityY * ballDirectionY;


        // Enemy AI (goes up and down the board, aimlessly), if the ball is inside the player's half

        if (ballPosX < 760 && (enemyPosY < 60 || enemyPosY > 660)) {
            enemyDirection *= -1;
        }

        // Enemy AI (tracks the ball), if the ball is inside the enemy's half
        if (ballPosX > 760) {
            if (ballPosY > enemyPosY) {
                enemyPosY += 1 * enemyVelocity;
            } else {
                enemyPosY -= 1 * enemyVelocity;
            }
        } else {
            enemyPosY += 3 * enemyDirection;
        }

        if (ballPosX <= 80) {
            score[1]++;
            ballPosX = 760;
            ballPosY = 362.5;
            ballVelocityX = 5;
        } else if (ballPosX >= 1440) {
            score[0]++;
            ballPosX = 760
            ballPosY = 362.5
            ballVelocityX = 5;
        // Tracks whether the ball has hit the roof/floor of the canvas
        } else if ((ballBottom >= 710 && ballDirectionY > 0) || (ballTop <= 15 && ballDirectionY < 0)) {
            ballDirectionY *= -1
            pongSound.play();
            randomizeColor();
        // Tracks whether the ball has hit the player paddle and speeds up the ball velocity
        } else if (ballLeft <= myRight && (ballPosY >= myPosY - 50 && ballPosY <= myPosY + 50) && ballDirectionX < 0) {
            ballDirectionX *= -1
            ballVelocityX += 0.3;
            pongSound.play();
            randomizeColor();
        // Tracks whether the ball has hit the enemy paddle and speeds up the ball velocity 
        } else if (ballRight >= enemyLeft && (ballPosY >= enemyPosY - 50 && ballPosY <= enemyPosY + 50) && ballDirectionX > 0) {
            ballDirectionX *= -1;
            ballVelocityX += 0.3;
            pongSound.play();
            randomizeColor();
        }
    }
}

function randomizeColor() {
    r = random(0, 255);
    g = random(0, 255);
    b = random(0, 255);
}
// Function will check if the player/enemy has won the game
function checkWin() {
    if (score[0] >= 3) {
        state = "playerWinState";
        background(0);
        fill(0, 255, 0);
        textSize(100);
        textAlign(CENTER);
        text("You Win!", 760, 365);

    } if (score[1] >= 3) {
        state = "enemyWinState";
        background(0);
        fill(0, 255, 0);
        textSize(100);
        textAlign(CENTER);
        text("You Lost!", 760, 365);
    }
}

// Function changes the state; thus allowing the game to start
function mouseClicked() {
    if (state == "startMenu") {
        state = "gameMenu";

    }
}
