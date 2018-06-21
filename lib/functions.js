'use strict';

const path = require('path');
const fs = require('fs');

module.exports = {

  clearScreen: function () {
    return process.stdout.write('\x1B[2J\x1B[0f');
  },

  loadJson: function (file) {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../', file), 'utf8'));
  },

  checkPosition: function (roverStack, roverPosition) {

    for (let i=0;i<roverStack.length; i++) {
      if (roverStack[i].toString() === roverPosition.toString()) {
        return true;
      }
    }

    return false;
  },

  parseJsonData: function (data) {
    let test = ((data.plateau.width > 0 && data.plateau.width <= 8) && (data.plateau.height > 0 && data.plateau.height <= 8) && (data.rovers.length > 0 && data.rovers.length <= 12));

    if (test) {
      let roverStack = [];

      data.rovers.map((rover) => {
        console.log('Rover #x', rover.start.x, rover.start.y);
      });

      for (let i=0;i<data.rovers.length;i++) {
        if (this.checkPosition(roverStack, [data.rovers[i].start.x, data.rovers[i].start.y])) {
          console.log('One or more rovers have the same start position!');
          test = false;
        } else {
          roverStack.push([data.rovers[i].start.x, data.rovers[i].start.y]);
        }
      }
    }

    return test;

  }

};