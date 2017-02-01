describe("Grid", function() {

  var grille = new Grid(2,2);

  it("should not be empty", function() {

    expect(Grid).toBeDefined();
  });

  it("Nombre drapeaux = nombre bombes", function() {

    expect(grille.flags - grille.bombs).toEqual(0);
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
