(function() {
  if (typeof window.Snake === "undefined") {
    window.Snake = {};
  }
  
  var plus = function (pos1, pos2) {
    return [ pos1[0] + pos2[0], pos1[1] + pos2[1] ];
  };
  
  var DIR_OFFSETS = {
    N: [ -1,  0 ],
    E: [  0,  1 ],
    S: [  1,  0 ],
    W: [  0, -1 ]
  };
  
  var DIR_OPPOSITES = {
    N: 'S',
    E: 'W',
    S: 'N',
    W: 'E'
  }
  
  var Snake = window.Snake.Snake = function(pos, dir, board) {
    this.pos = pos;
    this.length = 2;
    this.dir = dir;
    this.segments = [ this.pos ];
    this.board = board;
    this.turn_dir = this.dir;
  };
  
  Snake.prototype.wrap = function (pos) {
    return [(pos[0] + this.board.height) % this.board.height,
            (pos[1] + this.board.width) % this.board.width]
  }
  
  Snake.prototype.move = function () {
    this.dir = (DIR_OPPOSITES[this.turn_dir] === this.dir)
      ? this.dir
      : this.turn_dir;
    
    var next = plus(this.segments[0], DIR_OFFSETS[this.dir]);
    this.segments.unshift(this.wrap(next));
    
    if(this.segments.length > this.length) {
      this.segments.pop();
    }
  };
  
  Snake.prototype.eat = function (bonus) {
    this.length += (bonus === undefined) ? 1 : bonus;
  }
  
  Snake.prototype.turn = function (dir) {
    this.turn_dir = dir;
  }
  
  Snake.prototype.occupies = function(pos) {
    for(var i = 0; i < this.segments.length; i++) {
      var seg = this.segments[i];
      
      if(pos[0] === seg[0] && pos[1] === seg[1]) {
        return true;
      }
    }
    
    return false;
  };
  
  Snake.prototype.lost = function() {
    var head = this.segments.shift();
    var lost = this.occupies(head);
    
    this.segments.unshift(head);
    return lost;
  }
  
})();