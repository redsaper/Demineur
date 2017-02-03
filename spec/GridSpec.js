describe("Grid", function() {

  var grille = null;

  beforeEach(function() {
    grille = new Grid(2,2);
  });

  it("Grid constructor", function() {
    expect(grille.width).toEqual(2);
    expect(grille.height).toEqual(2);
    expect(grille.bombs).toEqual(0);
    expect(grille.flags).toEqual(0);
    expect(grille.timer).toBe(false);
    expect(grille.second).toEqual(0);
  });

  it("should not be empty", function() {

    expect(Grid).toBeDefined();
  });

  it("Nombre drapeaux = nombre bombes", function() {

    expect(grille.flags).toEqual(grille.bombs);
  });

  it("No bomb", function() {

    expect((grille.cells[0][0]).value).toEqual(0);
    expect((grille.cells[0][1]).value).toEqual(0);
    expect((grille.cells[1][0]).value).toEqual(0);
    expect((grille.cells[1][1]).value).toEqual(0);
  });

  it("Ajout bombe", function() {

    grille.addBomb(1,1);

    expect((grille.cells[0][0]).value).toEqual(1);
    expect((grille.cells[0][1]).value).toEqual(1);
    expect((grille.cells[1][0]).value).toEqual(1);
    expect((grille.cells[1][1]).isBomb()).toBe(true);
  });

  it("Ajout bombes", function() {

    grille.addBombs(2);
    expect(grille.bombs).toEqual(2);
  });

  it("test reveal", function() {
    grille.reveal(0, 0);
    expect(grille.cells[0][0].shown).toBe(true);
  });

  it("test getNbFlagsAround", function() {
    grille.cells[0][0].flagged = true;
    grille.cells[0][1].flagged = true;
    expect(grille.getNbFlagsAround(1,0)).toEqual(2);
  });


  it("test getNbBombsAround", function() {

    grille.addBomb(1,1);

    expect(grille.getNbBombsAround(0,0)).toEqual(1);
    expect(grille.getNbBombsAround(0,1)).toEqual(1);
    expect(grille.getNbBombsAround(1,0)).toEqual(1);
    expect(grille.getNbBombsAround(1,1)).toEqual(0);
  });

  it("test moveOutBomb", function() {

    grille.addBomb(0,1);
    grille.addBomb(1,0);
    grille.addBomb(1,1);

    grille.moveOutBomb(1,1);

    expect((grille.cells[0][0]).isBomb()).toBe(true);
    expect((grille.cells[0][1]).isBomb()).toBe(true);
    expect((grille.cells[1][0]).isBomb()).toBe(true);
    expect((grille.cells[1][1]).isBomb()).toBe(false);
    expect((grille.cells[1][1]).getValue()).toEqual(3);
  });

  it("Test isValidCoordinate", function() {

    expect(grille.isValidCoordinate(9, 9)).toBe(false);
  });
});

describe("Case", function() {

  var case1 = new Case(0,0,0);

  it("should exist", function() {

    expect(Case).toBeDefined();

  });
  it("case is not bomb", function() {

    expect(case1.isBomb()).toBe(false);

  });
  it("case is bomb", function() {

    case1.value='B';
    expect(case1.isBomb()).toBe(true);
  });
  it("case has not a bomb near", function() {

    case1.value=0;
    expect(case1.value).toEqual(0);
  });
  it("case has a bomb near", function() {

    case2 = new Case(2,12,5);
    expect(case2.value).not.toEqual(0);
  });


});

describe("Timer", function() {

  var timer = null;

  beforeEach(function() {
    timer = new Timer();
  });

  it("test isStarted", function() {

    expect(timer.isStarted()).toBe(false);
  });

  it("test start", function() {

    timer.start();

    expect(timer.isStarted()).toBe(true);
  });

  it("test stop", function() {

    expect(timer.isStopped()).toBe(false);

    timer.start();
    timer.stop();

    expect(timer.isStopped()).toBe(true);
  });

  it("test reset", function() {

    expect(timer.isReseted()).toBe(true);

    timer.start();

    expect(timer.isReseted()).toBe(false);

    timer.reset();

    expect(timer.isReseted()).toBe(true);
    expect(timer.get()).toEqual(0);
  });

  it("test start", function() {

    timer.timeStart = 41;
    timer.timeStop = 83;
    expect(timer.isMultipleOf30()).toBe(false);
    timer.timeStop = 101;
    expect(timer.isMultipleOf30()).toBe(true);
  });

});
