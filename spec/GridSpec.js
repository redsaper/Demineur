describe("Grid", function() {
  // var player;
  // var song;

  beforeEach(function() {
    // player = new Player();

    // song = new Song();
  });

  it("should not be empty", function() {

    expect(Grid).toBeDefined();
    // player.play(song);
    // expect(player.currentlyPlayingSong).toEqual(song);
    //
    // //demonstrates use of custom matcher
    // expect(player).toBePlaying(song);
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
    expect(case1.value).toBe(Integer);
  });


});
