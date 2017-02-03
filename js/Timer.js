function Timer(){
  this.timeStart = null;
  this.timeStop = null;
}

Timer.prototype.start = function(){
  this.timeStart = Date.now();
};

Timer.prototype.stop = function(){
  if(!this.isStarted()){
    return;
  }
  this.timeStop = Date.now();
};

Timer.prototype.get = function(){
  var time = null;

  if(this.isReseted()) {
    time = 0;
  }
  else if(this.isStopped()) {
    time = (this.timeStop - this.timeStart) / 1000;
  }
  else {
    console.log("get");
    time = (Date.now() - this.timeStart) / 1000;
  }

  return Math.round(time);
};

Timer.prototype.reset = function(){
  this.timeStart = null;
  this.timeStop = null;
};

Timer.prototype.isStarted = function(){
  return this.timeStart != null;
};

Timer.prototype.isStopped = function(){
  return this.timeStart != null && this.timeStop != null;
};

Timer.prototype.isReseted = function(){
  return this.timeStart == null && this.timeStop == null;
};
