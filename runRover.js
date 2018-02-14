#!/usr/bin/env node

'use strict';

const _ = require('underscore');
const fn = require('./lib/functions');
const sleep = require('sleep');
const Plateau = require('./lib/plateau');
const Rover = require('./lib/rover');
const program = require('commander');

const marsRovers = [];

program
  .version('1.0.0')
  .option('-v, --visual', 'Visual mode')
  .option('-d, --delay [time]', 'Time in miliseconds', 500)
  .option('-i, --input [file]', 'Name of the input file', 'input.json')
  .parse(process.argv);


// make available to other modules
global.moveDelay = program.delay;
global.visualMode = !!(program.visual);


fn.clearScreen();


// load data from file
let data = fn.loadJson(program.input);

// if data is ok, run the programm
if (fn.parseJsonData(data)) {

  console.info('Welcome to the Mars Rover program!');
  console.info('==================================');

  let thePlateau = new Plateau('thePlateau', data.plateau.width, data.plateau.height);


  // FIRST CREATE ALL THE ROVERS ON THE PLATEAU
  _.each(data.rovers, function (rover, index) {
    marsRovers[index] = new Rover(index, rover.start.x, rover.start.y, rover.start.o, rover.path, thePlateau);
    // currentRover.runPath();
  });

  sleep.msleep(global.moveDelay);

  // NOW WE CAN MOVE THE ROVERS
  _.each(data.rovers, function (rover, index) {
    marsRovers[index].runPath();
  });


} else {
  console.log('');
  console.log('ERROR FOUND ON CONFIGURATION FILE!');
  console.log('Please check the input.json file and rerun this program.');
  console.log('');
}
