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
