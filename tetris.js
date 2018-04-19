var cubes = new Cube();

function Cube() {
  this.down = 10;
  this.left = 10;
}

Cube.prototype.moveLeft = function () {
  if (this.left >= 20) {
    this.left -= 20;
    document.getElementById("c").style.left = this.left + 'px';
  }
};

Cube.prototype.moveRight = function () {
  if (this.left <= 120) {
    this.left += 20;
    document.getElementById("c").style.left = this.left + 'px';
  }
};

Cube.prototype.myMove = function () {
  var id = setInterval(frame, 1000);
  var down = this.down;

  function frame() {
    down += 30;
    document.getElementById("c").style.top = down + 'px';
    console.log(down);
    if (down >= 260) {
      clearInterval(id);
    }
  }

};