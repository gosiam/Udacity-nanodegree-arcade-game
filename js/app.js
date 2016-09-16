'use strict';

//_____________________E N E M Y ____________________

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * 3) * dt;
    // Reset when enemy reaches end of canvas
  if (this.x > 505) {
    this.reset();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Reset the enemy back to start of canvas
Enemy.prototype.reset = function() {
  this.x = -200;
};

//____________________P L A Y E R ___________________

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.step = 0;
};

Player.prototype.update = function(dt) {

    this.checkCollisions();

    if (this.isWin) {
      //update win state
      this.step += dt * 20;
      this.y = (Math.sin(this.step) * 3) -3;
      this.shouldRestOnInput = this.step >50;
    }
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.handleInput = function(direction) {

    if (this.isWin) {
        if (this.shouldRestOnInput)
            this.reset();
        return;
    }

    if (direction === 'left') {
   this.x -= 100;
   }
   if (direction === 'up') {
   this.y -= 82.5;
   }
   if (direction === 'right') {
   this.x += 100;
   }
   if (direction === 'down') {
   this.y += 82.5;
   }

    if (this.x < 0) {
        this.x = 0;

    } else if (this.x > 400) {
        this.x = 400;

    } else if (this.y < 0) {
        this.y = 0;
        this.isWin = true;

    } else if (this.y > 400) {
        this.y = 400;

    }
};


//Player-Enemy Collision Function
Player.prototype.checkCollisions = function(){
  for (var i = 0; i < allEnemies.length; i++){
     if (Math.abs(this.x - allEnemies[i].x) < 60 && Math.abs(this.y - allEnemies[i].y) < 60){
       this.reset();
     }
  }
};


// reset function sets the player back to the starting point
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
  this.isWin = false;
  this.step = 0;
  this.shouldRest = false;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [];

// push enemies into allEnemies array, 4 enemies total
// sets Y coordinate for each enemy to 0, 145, and 225 by using incrementer
// sets X coordinate randomly
// sets speed to a base of 50 and then randomizes each enemy
for (var i = 0; i < 3; i++) {
  var enemyY = 65 + 80 * i;
  var enemyX = Math.floor(Math.random() * 30);
  var enemySpeed = 50 + Math.floor(Math.random() * 150);
  allEnemies.push(new Enemy(enemyX, enemyY, enemySpeed));
}


var player = new Player(200, 400);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});