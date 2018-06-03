// Enemies our player must avoid
var Enemy = function(x,y,speed) {
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
    this.x += dt * this.speed;
    if(this.x > 505){
        var arrEnimyY = [63,146,229];
        //生产enimyY坐标下标索引： parseInt(Math.random()*(over-under+1) + under)
        var index= parseInt(Math.random()*3);
        //生产speed随机数，20-200
        var speed = parseInt(Math.random()*(400-100+1) + 100);
        this.x = 0;
        this.y = arrEnimyY[index];
        this.speed = speed;
    }
};
//83*5=415  405  73, 156 239

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function (player){
    //当player的坐标进入石头区域内时进行碰撞检测 73-322
    if(player.y >= 73 && player.y < 322){
        //x坐标碰撞半径
        var absX = 50.5;
        //y坐标碰撞半径
        var absY = 20;
        if(Math.abs(this.x - player.x) < absX && Math.abs(this.y - player.y) < absY){
            player.x = 202;
            player.y = 405;
        }
    }


}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function (dt) {

};

/**
* 方向键输入检测函数
* @param：movement 按下的方向键
 * @see:https://github.com/linesh-simplicity/linesh-simplicity.github.io/issues/138#issuecomment-286311563
*/
Player.prototype.handleInput = function (movement) {
    switch (movement) {
        case 'left':
            if (player.canMoveLeft()) {
                this.moveLeft();
            }
            break;
        case 'right':
            if(player.canMoveRight()){
                this.moveRight();
            }
            break;
        case 'up':
            if(player.canMoveUp()){
                this.moveUp();
            }
            //向上移动时同时检测是到达水域
            if(player.successFlag()){
                //玩家赢清空enimys
                allEnemies = [];
                alert("The player win!");
            }
            break;
        case 'down':
            if(player.canMoveDown()){
                this.moveDown();
            }
            break;
    }
}

Player.prototype.canMoveLeft = function () {
    //101单元格图片宽度，当坐标向左移后仍大于0，说明左边还有格子，可向左移动
    if(this.x >= 0 && (this.x - 101)>=0){
        return true;
    }
}

Player.prototype.canMoveRight = function () {
    //101单元格图片宽度，当坐标向右移动后坐标小于背景边界长度，说明可向右移动
    if((this.x + 101)< 505){
        return true;
    }
}

Player.prototype.canMoveUp = function () {
    if(this.y >= 0 && (this.y - 83)>= -10){
        return true;
    }
}

Player.prototype.canMoveDown = function () {
    //101单元格图片宽度，当坐标向右移动后坐标小于背景边界长度，说明可向右移动
    if((this.y + 83) <= 405){
        return true;
    }
}

//成功到达水域
Player.prototype.successFlag = function () {
    if(player.y <= 63){
        return true;
    }
}
Player.prototype.moveLeft = function () {
    this.x -= 101;
}

Player.prototype.moveRight = function () {
    this.x += 101;
}

Player.prototype.moveUp = function () {
    this.y -= 83;
}

Player.prototype.moveDown = function () {
    this.y += 83;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.实例化对象
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//设置player初始位置
var playerX = 202,playerY = 405;
var player = new Player(playerX, playerY);

//设定初始enemy个数为6，x坐标都从0开始，y坐标在石头范围内每一行的正中间[63,146,229]，速度随机
var allEnemies = [];
var arrEnimyY = [63,146,229];
for(var i =0; i < 4; i++){
    //生产enimyY坐标下标索引： parseInt(Math.random()*(over-under+1) + under)
    var index= parseInt(Math.random()*3);
    //生产speed随机数，100-400
    var speed = parseInt(Math.random()*(400-100+1) + 100);
    allEnemies.push(new Enemy(0,arrEnimyY[index],speed));
}

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
