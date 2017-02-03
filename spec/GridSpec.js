describe("Grid", function() {

  var grille = null;

  beforeEach(function() {
    grille = new Grid(3,3);
  });

  it("Grid constructor", function() {
    var width = 10;
    var height = 30;

    grille = new Grid(width,height);

    expect(grille.width).toEqual(10);
    expect(grille.height).toEqual(30);
    expect(grille.bombs).toEqual(0);
    expect(grille.flags).toEqual(0);
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

    expect(grille.bombs).toEqual(1);
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

  it("Test isValidCoordinate", function() {

    expect(grille.isValidCoordinate(9, 9)).toBe(false);
  });
});
