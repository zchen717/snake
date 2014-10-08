(function () {
  if (typeof window.Snake === "undefined") {
    window.Snake = {};
  }
  
  var View = Snake.View = function ($el) {
    this.el = $el;
  };
  
  View.TIME = 250;
  View.KEY_CODES = {
    37 : "W",
    38 : "N",
    39 : "E",
    40 : "S"
  };
  
  View.prototype.start = function () {
    var view = this;
    this.board = new Snake.Board();
    
    $('body').on('keydown', function(event) {
      if(typeof View.KEY_CODES[event.which] !== "undefined") {
        view.handleKey(View.KEY_CODES[event.which]);
      }
    })
    
    this.loop = setInterval(function() {
      view.board.step();
      
      view.el.children('.board').remove();
      view.el.append(view.board.render());
      
      view.el.children('.score').text(view.board.score);
      
      if (view.board.snake.lost()) {
        clearInterval(view.loop);
      }
    }, View.TIME);
  };
  
  View.prototype.handleKey = function (dir) {
    this.board.snake.turn(dir);
  };
 })();