'use strict';

const sleep = require('sleep');
const fn = require('../lib/functions');

function Rover(index, x, y, o, path, plateau) {
  this.index = index;
  this.x = x;
  this.y = y;
  this.o = o;
  this.path = path;
  this.plateau = plateau;

  this.plateau.dropRover(this);

}

Rover.prototype.runPath = function (path) {

  for (let i=0;i<path.length;i++) {

    if (global.visualMode) sleep.msleep(global.moveDelay);

    if (path[i] === 'M') {
      i = this.move(i);
    } else {
      this.turn(path[i]);
    }

  }

};


Rover.prototype.turn = function (direction) {

  if (direction === 'L') {

    if (!global.visualMode)
      console.log(' - Rover #%s in now at: %s %s %s and trying to %s', this.index, this.x, this.y, this.o, 'Turn Left!      - OK!');

    switch(this.o) {
      case 'N':
        this.o = 'W';
        break;
      case 'S':
        this.o = 'E';
        break;
      case 'E':
        this.o = 'N';
        break;
      case 'W':
        this.o = 'S';
        break;

    }

    this.plateau.updateRoverPosition(this, 'Turn Left!   ');

  }

  if (direction === 'R') {

    if (!global.visualMode)
      console.log(' - Rover #%s in now at: %s %s %s and trying to %s', this.index, this.x, this.y, this.o, 'Turn Right!     - OK!');

    switch(this.o) {
      case 'N':
        this.o = 'E';
        break;
      case 'S':
        this.o = 'W';
        break;
      case 'E':
        this.o = 'S';
        break;
      case 'W':
        this.o = 'N';
        break;

    }

    this.plateau.updateRoverPosition(this, 'Turn Right!  ');

  }

};


Rover.prototype.move = function (pathPosition) {

  let txtReturn = 'Move Forward!';

  if (!global.visualMode)
    process.stdout.write(' - Rover #'+this.index+' in now at: '+this.x+' '+this.y+' '+this.o+' and trying to Move Forward!');

  let moved = true;

  let currPosition = {
    x: this.x,
    y: this.y
  };


  // on every move, check if grid point is empty
  switch(this.o) {
    case 'N':

      if (this.y < this.plateau.y) {
        this.y++;
      } else {
        moved = false;
      }

      break;

    case 'S':

      if (this.y > 0) {
        this.y--;
      } else {
        moved = false;
      }

      break;

    case 'E':

      if (this.x < this.plateau.x) {
        this.x++;
      } else {
        moved = false;
      }

      break;

    case 'W':

      if (this.x > 0) {
        this.x--;
      } else {
        moved = false;
      }

      break;

  }

  // rollback if next position is occupied
  if (moved && fn.checkPosition(this.plateau.roverPosition, [this.x, this.y]) ) {
    // if there's another rover on the way, try to go around it
    txtReturn = this.goAround();
  } else if (!moved) {
    txtReturn = 'CANNOT MOVE! ROVER ON THE EDGE.';
    if (!global.visualMode) console.log('   - CANNOT MOVE! ROVER ON THE EDGE!');
  } else {
    if (!global.visualMode) console.log('   - OK!');
  }

  this.plateau.updateRoverPosition(this, txtReturn);

  return pathPosition;

};


Rover.prototype.moveNorth = function () {};

Rover.prototype.moveSouth = function () {};

Rover.prototype.moveEast = function () {};

Rover.prototype.moveWest = function () {};


Rover.prototype.goAround = function () {

  let txtReturn = 'CANNOT MOVE! ROVER ON THE WAY!';

  this.x = currPosition.x;
  this.y = currPosition.y;

  if (this.path[pathPosition+1] === 'M') {

    let newPath = 'LMRMMRML';

    if ((this.o === 'N' && this.x === 0) || (this.o === 'S' && this.x === this.plateau.x) || (this.o === 'E' && this.y === 0) || (this.o === 'W' && this.y === this.plateau.y)) {
      newPath = 'RMLMMLMR';
    }

    if (!global.visualMode) {
      console.log('   - CANNOT MOVE! ANOTHER ROVER BLOCKING THE WAY!');
      console.log();
      console.log('   New path to go around:', newPath);
      console.log();
    } else {
      this.plateau.updateRoverPosition(this, txtReturn);
    }

    this.runPath(newPath);

    if (!global.visualMode){
      console.log();
      console.log('   End of alternate path!');
      console.log();
    }

    pathPosition++;

  } else if (!this.path[pathPosition+1]) {

    if (!global.visualMode) {
      console.log('   - CANNOT MOVE! ANOTHER ROVER ON THE WAY!');
      console.log('   Won\'t even bother to go around because it\'s the end of my instructions!');
    }

  } else {

    if (!this.path[pathPosition+2]) {

      if (!global.visualMode) {
        console.log('   - CANNOT MOVE! ANOTHER ROVER ON THE WAY!');
        console.log('   Making the turn and staying at the spot!');
      }

    } else {

      let newPath = 'MM';

      if (this.path[pathPosition+2] === 'M' && this.path[pathPosition+1] === 'L') {
        newPath = 'LMRML';
      }

      if (this.path[pathPosition+2] === 'M' && this.path[pathPosition+1] === 'R') {
        newPath = 'RMLMR';
      }

      if (!global.visualMode) {
        console.log('   - CANNOT MOVE! ANOTHER ROVER BLOCKING THE WAY!');
        console.log();
        console.log('   New path to go around:', newPath);
        console.log();
      } else {
        this.plateau.updateRoverPosition(this, txtReturn);
      }

      this.runPath(newPath);

      if (!global.visualMode){
        console.log();
        console.log('   End of alternate path!');
        console.log();
      }

      pathPosition++;

    }
  }

  txtReturn = 'Done going around!';

  return txtReturn;

};


module.exports = Rover;