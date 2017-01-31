
function Grid(width, height)
{
  this.width = width;
  this.height = height;
  this.bombs = 0;
  this.flags = 0;
  
  this.cells = [];
  
  for (var x = 0; x < width; x++)
  {
    this.cells[x] = [];
    for (var y = 0; y < width; y++)
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

Grid.prototype.addBombs = function (nbBombs)
{
  this.bombs = nbBombs;
  this.flags = nbBombs;

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

Grid.prototype.removeCases = function () {
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < width; y++) {
      this.cells[x][y] = null;
    }
  }

};

Grid.prototype.reveal = function (x,y)
{
  if (this.cells[x][y].shown || this.cells[x][y].flagged)
  {
    return [];
  }
  
  this.cells[x][y].shown = true;
  
  if (this.cells[x][y].isBomb())
  {
    return false;
  }
  
  
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

        listCaseChanged = listCaseChanged.concat(this.reveal(x2, y2));
      }
    }
  }
  
  return listCaseChanged;
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
    return false;
  }

  if (this.getNbFlagsAround(x, y) != this.cells[x][y].value)
  {
      return [];
  }

  var listCaseChanged = [];

  for (var i = -1 ; i <= 1 ; i++)
  {
    for (var j = -1 ; j <= 1 ; j++)
    {
      var x2 = x + i;
      var y2 = y + j;

      if (!this.isValidCoordinate(x2, y2) || this.cells[x2][y2].flagged)
      {
        continue;
      }
      
      this.cells[x2][y2].shown = true;
      
      if (this.cells[x2][y2].isBomb())
      {
        return false;
      }

      listCaseChanged = listCaseChanged.concat(this.reveal(x2, y2));
    }
  }

  return listCaseChanged;
};
