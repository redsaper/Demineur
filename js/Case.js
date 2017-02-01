/**
 * Created by Lucas on 31/01/2017.
 */


function Case(value, x, y) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.flagged = false;
    this.shown = false;

}

Case.prototype.isBomb = function () {
    return this.value === 'B';
};

Case.prototype.getValue = function () {
    return this.value;
};

Case.prototype.setFlagged = function (flagged) {
    this.flagged = flagged;
};

Case.prototype.isFlagged = function () {
    return this.flagged === true;
};

Case.prototype.setShown = function (shown) {
    this.shown = shown;
};

Case.prototype.isShown = function () {
    return this.shown === true;
};