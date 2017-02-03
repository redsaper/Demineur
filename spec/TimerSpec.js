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

  it("test isMultipleOf", function() {

    timer.timeStart = 41;
    timer.timeStop = 83;
    expect(timer.isMultipleOf(30)).toBe(false);
    timer.timeStop = 101;
    expect(timer.isMultipleOf(30)).toBe(true);
  });

});
