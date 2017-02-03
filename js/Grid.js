
function Grid(width, height)
{
  this.width = width;
  this.height = height;
  this.bombs = 0;
  this.flags = 0;

  this.cells = [];

  this.timer = false;
  this.second = 0;

  for (var x = 0; x < width; x++)
  {
    this.cells[x] = [];
    for (var y = 0; y < height; y++)
    {
      this.cells[x][y] = new Case(0,x,y);
    }
  }
}

Grid.prototype.isValidCoordinate = function (x, y)
{
  return x >= 0 && x < this.width && y >= 0 && y < this.height;
};

Grid.prototype.addBomb = function (x, y)
{
  this.cells[x][y].value = 'B';

  for (var i = -1 ; i <= 1 ; i++)
  {
    for (var j = -1 ; j <= 1 ; j++)
    {
      var x2 = x + i;
      var y2 = y + j;

      if (!this.isValidCoordinate(x2, y2))
      {
        continue;
      }

      if (!this.cells[x2][y2].isBomb())
      {
        this.cells[x2][y2].value++;
      }
    }
  }
};

Grid.prototype.removeBomb = function (x, y)
{
  var nbBombsAround = 0;

  for (var i = -1 ; i <= 1 ; i++)
  {
    for (var j = -1 ; j <= 1 ; j++)
    {
      var x2 = x + i;
      var y2 = y + j;

      if (!this.isValidCoordinate(x2, y2) || (x2 === x && y2 === y))
      {
        continue;
      }

      if (this.cells[x2][y2].isBomb())
      {
        nbBombsAround++;
      }
      else
      {
        this.cells[x2][y2].value--;
      }
    }
  }
  
  this.cells[x][y].value = nbBombsAround;
};

Grid.prototype.addBombs = function (nbBombs)
{
  this.bombs += nbBombs;
  this.flags += nbBombs;

  for (var i = 0; i < nbBombs; i++)
  {
    var x = Math.floor((Math.random() * this.width));
    var y = Math.floor((Math.random() * this.height));

    while (this.cells[x][y].isBomb())
    {
      x = Math.floor((Math.random() * this.width));
      y = Math.floor((Math.random() * this.height));
    }

    this.addBomb(x, y);
  }
};

Grid.prototype.reveal = function (x,y)
{
  if (this.cells[x][y].shown || this.cells[x][y].flagged)
  {
    return {cases: [], lost: false};
  }

  this.cells[x][y].shown = true;

  var lost = this.cells[x][y].isBomb();
  var listCaseChanged = [this.cells[x][y]];

  if (this.cells[x][y].value === 0)
  {
    for (var i = -1 ; i <= 1 ; i++)
    {
      for (var j = -1 ; j <= 1 ; j++)
      {
        var x2 = x + i;
        var y2 = y + j;

        if (!this.isValidCoordinate(x2, y2))
        {
          continue;
        }

        listCaseChanged = listCaseChanged.concat(this.reveal(x2, y2).cases);
      }
    }
  }

  return {cases: listCaseChanged, lost: lost};
};

Grid.prototype.getNbFlagsAround = function (x, y)
{
  var nbFlagsAround = 0;

  for (var i = -1 ; i <= 1 ; i++)
  {
    for (var j = -1 ; j <= 1 ; j++)
    {
      var x2 = x + i;
      var y2 = y + j;

      if (!this.isValidCoordinate(x2, y2))
      {
        continue;
      }

      if (this.cells[x2][y2].flagged)
      {
        nbFlagsAround++;
      }
    }
  }

  return nbFlagsAround;
};


Grid.prototype.quickReveal = function (x, y)
{
  if (this.cells[x][y].isBomb())
  {
    return {cases: [], lost: true};
  }

  if (this.getNbFlagsAround(x, y) != this.cells[x][y].value)
  {
      return {cases: [], lost: false};
  }

  var lost = false;
  var listCaseChanged = [];

  for (var i = -1 ; i <= 1 ; i++)
  {
    for (var j = -1 ; j <= 1 ; j++)
    {
      var x2 = x + i;
      var y2 = y + j;


      if (!this.isValidCoordinate(x2, y2))
      {
        continue;
      }

      if (this.cells[x2][y2].flagged && !this.cells[x2][y2].isBomb())
      {
        this.cells[x2][y2].shown = true;
        listCaseChanged.push(this.cells[x2][y2]);
        continue;
      }

      if (!this.cells[x2][y2].flagged && this.cells[x2][y2].isBomb())
      {
        lost = true;
      }

      listCaseChanged = listCaseChanged.concat(this.reveal(x2, y2).cases);
    }
  }

  return {cases: listCaseChanged, lost: lost};
};

Grid.prototype.getBombs = function ()
{
  var bombList = [];

  for (var x = 0; x < this.width; x++){
    for (var y = 0; y < this.height; y++){
      if (this.cells[x][y].isBomb()){
        bombList.push(this.cells[x][y]);
      }
    }
  }

  return bombList;
};


Grid.prototype.moveOutBomb = function (x, y)
{
  this.addBombs(1);
  this.removeBomb(x, y);

  this.bombs--;
  this.flags--;
}

Grid.prototype.toggleFlag = function (x, y)
{
  var cell = this.cells[x][y];

  if (cell.isShown())
  {
    return;
  }

  if (cell.isFlagged())
  {
    cell.setFlagged(false);
    grid.flags++;
  }
  else
  {
    if (this.flags === 0) {
      console.log('Nombre max de drapeau atteint !');
      return;
    }

    cell.setFlagged(true);
    grid.flags--;
  }
}
