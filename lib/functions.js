'use strict';

const _ = require('underscore');
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
    return ((data.plateau.width > 0 && data.plateau.width < 8) && (data.plateau.height > 0 && data.plateau.height < 8) && data.rovers.length > 0);
  }

};