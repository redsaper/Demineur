
function Game(width, height, nbBombs, timeOut)
{
  this.grid = new Grid(width, height);
  this.grid.addBombs(nbBombs);
  this.duration = timeOut;
  this.timer = new Timer();
  this.firstLeftClick = true;
  this.defeat = false;
  this.victory = false;
}

Game.prototype.addBomb = function(x,y){
  this.grid.addBomb(x,y);
}

Game.prototype.testParameters = function (largeur, hauteur, bombs) {
  if (!isNaN(largeur) && !isNaN(hauteur) && !isNaN(bombs)) {
    if (((largeur * hauteur) / 3) * 2 >= bombs) {
        if (largeur <= 50 && hauteur <= 40) {
            return true;
        }
    }
  }
    return false;
}

Game.prototype.toggleFlag = function(x,y){
  this.grid.toggleFlag(x,y);
}

Game.prototype.leftClick = function(x,y){
  if (this.firstLeftClick)
  {
    if (this.grid.cells[x][y].isBomb()){
      this.grid.moveOutBomb(x, y);
    }
    this.firstLeftClick=false;
  }

   var result = this.grid.reveal(x, y);

  // result.cases.forEach(updateView);

   if (this.grid.cells[x][y].isBomb()) {
       this.defeat=true;
   }
   else {
       this.victory=true;
   }
   return result.cases;
}
