describe("Game", function() {

  var game = null;

  beforeEach(function() {
    var width = 3;
    var height = 2;
    var bombs = 0;
    var time = 200;

    game = new Game(width, height, bombs, time);
  });

  it("add bomb", function() {
    game.addBomb(1,1);
    expect(game.grid.cells[1][1].value).toEqual('B');
    expect(game.grid.bombs).toEqual(1);
  });

  it("test parameters",function() {
    expect(game.testParameters(40,40,20)).toBe(true);
  });

  it("test toggle flag", function(){
    game.grid.flags=1;
    game.grid.toggleFlag(0,0);
    expect(game.grid.cells[0][0].isFlagged()).toBe(true);
    game.grid.toggleFlag(0,0);
    expect(game.grid.cells[0][0].isFlagged()).toBe(false);
  });

  it("left click", function(){
    game.grid.flags=1;
    game.grid.toggleFlag(0,0);
    game.leftClick(0,0);
    expect(game.grid.cells[0][0].isFlagged()).toBe(true);
    game.grid.toggleFlag(0,0);
    game.addBomb(0,0);
    game.leftClick(0,0);
    expect(game.defeat).toBe(true);
  });
});
