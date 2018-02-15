# DeepX's Code Challenge

## Description

All problems below require some kind of input. You are free to implement
any mechanism for feeding input into your solution (for example, using
hard coded data within a unit test).  You should provide sufficient
evidence that your solution is complete by, as a minimum, indicating
that it works correctly against the supplied test data.

### MARS ROVERS PROBLEM

A squad of robotic rovers are to be landed by NASA on a plateau on Mars.
This plateau, which is curiously rectangular, must be navigated by the
rovers so that their on-board cameras can get a complete view of the
surrounding terrain to send back to Earth.

A rover's position and location is represented by a combination of x and
y co-ordinates and a letter representing one of the four cardinal
compass points. The plateau is divided up into a grid to simplify
navigation. An example position might be 0, 0, N, which means the rover
is in the bottom left corner and facing North.

In order to control a rover, NASA sends a simple string of letters. The
possible letters are 'L', 'R' and 'M'. 'L' and 'R' makes the rover spin
90 degrees left or right respectively, without moving from its current
spot.  'M' means move forward one grid point, and maintain the same
heading.

Assume that the square directly North from (x, y) is (x, y+1).

##### Input

The first line of input is the upper-right coordinates of the plateau,
the lower-left coordinates are assumed to be 0,0.

The rest of the input is information pertaining to the rovers that have
been deployed. Each rover has two lines of input. The first line gives
the rover's position, and the second line is a series of instructions
telling the rover how to explore the plateau.

The position is made up of two integers and a letter separated by
spaces, corresponding to the x and y co-ordinates and the rover's
orientation.


Each rover will be finished sequentially, which means that the second
rover won't start to move until the first one has finished moving.

##### Output

The output for each rover should be its final co-ordinates and heading.

Input and output files

Test Input:
```
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
```
Expected Output:
```
1 3 N
5 1 E
```

## The Solution

This is a simple solution for the Mars Rovers Challenge, and I chose Node because it's backend and because it's Javascript and I have been using it a lot lately.

These instructions will get you a copy of the project up and running on your local machine for testing purposes.

This solutions was written and tested on a Linux machine, and I also tested on a Mac but I never testes on Windows because I simply don't have a Windows computer. 

### Prerequisites

You need to have Node installed to run this project.

```
$ cd ~
$ curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh
$ sudo apt-get install nodejs
```

Check installation

```
$ node -v
```

```
Output
v6.0.0
```

### Installing

First, download the project, then cd into the project and install dependencies.

```
$ git clone https://github.com/rcabarreto/marsrovers.git marsrovers/
$ cd marsrovers/
$ npm install
```

### Configuring

On the root of the project, you'll find a file called **input.json**. This file stores all the information needed to run the application and this information is loaded from the file every time you run the program. 

On the file you can configure the dimensions of the plateau (up to 8 by 8) and as many as 12 rovers.

```
{
  "plateau": {
    "width": 5,
    "height": 5
  },
  "rovers": [
    { "start": { "x": 1, "y": 2, "o": "N" }, "path": "LMLMLMLMM" },
    { "start": { "x": 3, "y": 3, "o": "E" }, "path": "MMRMMRMRRM" }
  ]
}
```

To run a test in text mode, you can use the command:

```
$ ./runRover.js
```

To see the rovers moving on the plateau, first make sure you are running your terminal full screen or else it'll break, then use the command:

```
$ ./runRover.js -g
```
