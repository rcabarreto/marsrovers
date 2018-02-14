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


Rover.prototype.runPath = function () {

  if (!global.visualMode) {
    console.log('');
    console.log('MOVING ROVER #%s', this.index);
    console.log('INITIAL POSITION IS = %s %s %s', this.x, this.y, this.o);
    console.log('');
  }

  for (let i=0;i<this.path.length;i++) {
    if (this.path[i] === 'M') {
      this.move();
    } else {
      this.turn(this.path[i]);
    }

    if (global.visualMode)
      sleep.msleep(global.moveDelay);

  }

  if (!global.visualMode) {
    console.log('');
    console.log('DONE MOVING ROVER #%s!', this.index);
    console.log('FINAL POSITION IS = %s %s %s', this.x, this.y, this.o);
    console.log('========================================================================');
  }

};


Rover.prototype.turn = function (direction) {
  // turn the rover

  if (direction === 'L') {

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
      default:
      // default code block
    }

    this.plateau.updateRoverPosition(this, 'Turn Left!   ');

  }

  if (direction === 'R') {

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
      default:
      // default code block
    }

    this.plateau.updateRoverPosition(this, 'Turn Right!  ');

  }

};


Rover.prototype.move = function () {

  let txtReturn = 'Move Forward!';

  // on every move, check if grid point is empty
  switch(this.o) {
    case 'N':

      if (this.y < this.plateau.y) {

        if (fn.searchForArray(this.plateau.roverPosition, [this.x, (this.y+1)]) ) {
          txtReturn = 'CANNOT MOVE! ROVER ON THE WAY!'
        } else {
          this.y++;
        }

      } else {
        txtReturn = 'CANNOT MOVE! ROVER ON THE EDGE.'
      }

      break;
    case 'S':

      if (this.y > 0) {

        if (fn.searchForArray(this.plateau.roverPosition, [this.x, (this.y-1)]) ) {
          txtReturn = 'CANNOT MOVE! ROVER ON THE WAY!'
        } else {
          this.y--;
        }

      } else {
        txtReturn = 'CANNOT MOVE! ROVER ON THE EDGE.'
      }

      break;
    case 'E':

      if (this.x < this.plateau.x) {

        if (fn.searchForArray(this.plateau.roverPosition, [(this.x+1), this.y]) ) {
          txtReturn = 'CANNOT MOVE! ROVER ON THE WAY!'
        } else {
          this.x++;
        }

      } else {
        txtReturn = 'CANNOT MOVE! ROVER ON THE EDGE.'
      }

      break;
    case 'W':

      if (this.x > 0) {

        if (fn.searchForArray(this.plateau.roverPosition, [(this.x-1), this.y]) ) {
          txtReturn = 'CANNOT MOVE! ROVER ON THE WAY!'
        } else {
          this.x--;
        }

      } else {
        txtReturn = 'CANNOT MOVE! ROVER ON THE EDGE.'
      }

      break;
    default:
      // default code block
  }

  this.plateau.updateRoverPosition(this, txtReturn);

};


module.exports = Rover;