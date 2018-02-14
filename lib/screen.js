#!/usr/bin/env node

'use strict';

const ctx = require('axel');

const roverColor = [
  [255,255,255],
  [255,0,0],
  [0,255,0],
  [0,0,200],
  [255,255,0],
  [255,0,255],
  [0,255,255],
  [80,80,0],
  [80,80,80],
  [0,80,80],
  [0,0,80],
  [0,80,0],
  [80,0,0]
];

module.exports = {

  drawGrid: function(x, y) {

    // Clear the terminal
    ctx.clear();

    for (let z=0;z<=y;z++) {
      for (let i=0;i<=x;i++) {
        this.emptyBox(i,z, x, y);
      }
    }

    ctx.text(82, 2, 'NAME');
    ctx.text(94, 2, 'START');
    ctx.text(106, 2, 'FINISH');
    ctx.text(118, 2, 'MOVE');

    ctx.text(82, 3, '================================================================');

  },

  emptyBox: function(x, y, plateauX, plateauY) {

    y = plateauY-y;

    let posx = 2 + ((x*2) + (x*8));
    let posy = 2 + ((y*2) + (y*3));

    ctx.bg(0,0,0);
    ctx.box(posx,posy,8,4);

    ctx.cursor.restore();
  },

  filledBox: function(x, y, o, color, plateauX, plateauY) {

    y = plateauY-y;

    let posx = 2 + ((x*2) + (x*8));
    let posy = 2 + ((y*2) + (y*3));

    ctx.bg(roverColor[color][0],roverColor[color][1],roverColor[color][2]);
    ctx.box(posx,posy,8,4);

    let coord1 = posx+2;
    let coord2 = posy+1;
    let coord3 = 4;
    let coord4 = 2;

    switch(o) {
      case 'N':
        coord2 -= 1;
        coord4 += 1;
        break;
      case 'S':
        coord4 += 2;
        break;
      case 'E':
        coord3 += 2;
        break;
      case 'W':
        coord1 -= 2;
        coord3 += 2;
        break;
      default:
      // default code block
    }

    ctx.scrub(coord1,coord2,coord3,coord4);

    ctx.cursor.restore();

  },

  write: function (col, roverIndex, text) {

    let x = 70 + (col*12);
    let y = (2*(roverIndex+1)+3);

    // ctx.bg(255,0,0);

    ctx.scrub(x,y,32,1);
    ctx.cursor.restore();

    ctx.fg(roverColor[roverIndex][0],roverColor[roverIndex][1],roverColor[roverIndex][2]);
    ctx.text(x,y, text);
    ctx.cursor.restore();

  }

};
