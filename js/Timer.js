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
  if(!this.isReseted()) {
    return 0;
  }

  if(!this.isStopped()) {
      return (this.timeStop - this.timeStart) / 1000;
    }

    return (Date.now() - this.timeStart) / 1000;
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
