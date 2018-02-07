// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

function Population(sketch) {
  // Array of rockets
  this.rockets = [];
  // Amount of rockets
  this.popsize = 25;
  // Amount parent rocket partners
  this.matingpool = [];

  // Associates a rocket to an array index
  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket(sketch);
  }

  this.evaluate = function() {

    var maxfit = 0;
    // Iterate through all rockets and calcultes their fitness
    for (var i = 0; i < this.popsize; i++) {
      // Calculates fitness
      this.rockets[i].calcFitness();
      // If current fitness is greater than max, then make max eqaul to current
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }
    // Normalises fitnesses
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxfit;
    }

    this.matingpool = [];
    // Take rockets fitness make in to scale of 1 to 100
    // A rocket with high fitness will highly likely will be in the mating pool
    for (var i = 0; i < this.popsize; i++) {
      var n = this.rockets[i].fitness * 100;
      for (var j = 0; j < n; j++) {
        this.matingpool.push(this.rockets[i]);
      }
    }
  }
  // Selects appropriate genes for child
  this.selection = function() {
    var newRockets = [];
    for (var i = 0; i < this.rockets.length; i++) {
      // Picks random dna
      var parentA = this.rockets[i].dna;//this.matingpool[sketch.floor(sketch.random(this.matingpool.length))].dna;
      var parentB = this.matingpool[sketch.floor(sketch.random(this.matingpool.length))].dna;
      // Creates child by using crossover function
      var child = parentA.crossover(parentB);
      child.mutation();
      // Creates new rocket with child dna
      newRockets[i] = new Rocket(sketch, child);
    }
    // This instance of rockets are the new rockets
    this.rockets = newRockets;
  }

  // Calls for update and show functions
  this.run = function() {
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].update();
    }
  }

  this.show = function() {
    for (var i = 0; i < this.popsize; i++) {
      sketch.push();
      sketch.translate(-sketch.width/2, 0);
      this.rockets[i].show();
      sketch.pop();
      sketch.rotateY(1 / this.popsize * sketch.TWO_PI);
    }
  }
}