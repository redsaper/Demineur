
function Grid(width, height)
{
  this.width = width;
  this.height = height;
  
  this.cells = [];
  
  for (var x = 0; x < width; x++)
  {
    this.cells.push([])
    for (var y = 0; y < width; y++)
    {
      this.cells[x].push(0);
    }
  }
}

Grid.prototype.validCoordinate = function (x, y)
{
  return x >= 0 && x < this.width && y >= 0 && y < this.height;
}

Grid.prototype.addBomb = function (x, y)
{
  this.cells[x][y] = 'B';
  
  for (var i = -1 ; i <= 1 ; i++)
  {
    for (var j = -1 ; j <= 1 ; j++)
    {
      var x2 = x + i;
      var y2 = y + j;
      
      if (!this.validCoordinate(x2, y2))
      {
        continue;
      }
      
      if (this.cells[x2][y2] != 'B')
      {
        this.cells[x2][y2]++;
      }
    }
  }
}

Grid.prototype.addBombs = function (nbBombs)
{
  for (var i = 0; i < nbBombs; i++)
  {
    var x = Math.floor((Math.random() * this.width));
    var y = Math.floor((Math.random() * this.height));
    
    while (this.cells[x][y] === 'B')
    {
      x = Math.floor((Math.random() * this.width));
      y = Math.floor((Math.random() * this.height));
    }
    
    this.addBomb(x, y);
  }
}
