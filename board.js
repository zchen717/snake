(function () {
  if (typeof window.Snake === 'undefined') {
    window.Snake = {};
  }
  
  var Board = Snake.Board = function () {
    this.width = 12;
    this.height = 12;
    this.snake = this.newSnake();
    this.board = this.newBoard();
    this.apple = this.randomPos();
    this.score = 0;
  };
  
  Board.prototype.newSnake = function () {
    var pos = [3,3];
    var dir = 'S';
    
    return new Snake.Snake(pos, dir, this);
  }
  
  Board.prototype.newBoard = function () {
    var board = [];
    for(var y = 0; y < this.height; y++) {
      board.push([]);
      for(var x = 0; x < this.width; x++) {
        board[y][x] = ".";
      }
    }
    return board;
  };
  
  Board.prototype.step = function () {
    this.snake.move();
    
    if (this.snake.occupies(this.apple)) {
      this.snake.eat();
      this.apple = this.randomPos();
      this.score += 100;
    }
    
    if (this.snake.lost()) {
      console.log("Loser!");
    }
  };
  
  Board.prototype.randomPos = function () {
    var pos;
    
    do {
      pos = [ 
        Math.floor(Math.random() * this.height),
        Math.floor(Math.random() * this.width)
      ];
    } while (this.snake.occupies(pos));
    return pos;
  };
  
  Board.prototype.render = function () {
    var $jquery = $('<div class="board"></div>');
    
    for(var y = 0; y < this.height; y++) {
      var $row = $('<div class="row"></div>');
      for(var x = 0; x < this.width; x++) {
        var el;
        if (this.snake.occupies( [y, x] )) {
          el = "snake";
        } else if (this.apple[0] === y && this.apple[1] === x){
          el = "apple";
        } else {
          el = "space";
        }
        $row.append($("<div class='square " + el + "'></div>"));
      }
      $jquery.append($row);
    }
    
    return $jquery;
  };
})();