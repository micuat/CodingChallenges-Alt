function calculateFitness(sketch) {
  var currentRecord = Infinity;
  for (var i = 0; i < population.length; i++) {
    var d = sketch.calcDistance(cities, population[i]);
    if (d < recordDistance) {
      recordDistance = d;
      bestEver = population[i];
    }
    if (d < currentRecord) {
      currentRecord = d;
      currentBest = population[i];
    }


    // This fitness function has been edited from the original video
    // to improve performance, as discussed in The Nature of Code 9.6 video,
    // available here: https://www.youtube.com/watch?v=HzaLIO9dLbA
    fitness[i] = 1 / (sketch.pow(d, 8) + 1);
  }
}

function normalizeFitness(sketch) {
  var sum = 0;
  for (var i = 0; i < fitness.length; i++) {
    sum += fitness[i];
  }
  for (var i = 0; i < fitness.length; i++) {
    fitness[i] = fitness[i] / sum;;
  }
}

function nextGeneration(sketch) {
  var newPopulation = [];
  for (var i = 0; i < population.length; i++) {
    var orderA = pickOne(sketch, population, fitness);
    var orderB = pickOne(sketch, population, fitness);
    var order = crossOver(sketch, orderA, orderB);
    mutate(sketch, order, 0.01);
    newPopulation[i] = order;
  }
  population = newPopulation;

}

function pickOne(sketch, list, prob) {
  var index = 0;
  var r = sketch.random(1);

  while (r > 0) {
    r = r - prob[index];
    index++;
  }
  index--;
  return list[index].slice();
}

function crossOver(sketch, orderA, orderB) {
  var start = sketch.floor(sketch.random(orderA.length));
  var end = sketch.floor(sketch.random(start + 1, orderA.length));
  var neworder = orderA.slice(start, end);
  // var left = totalCities - neworder.length;
  for (var i = 0; i < orderB.length; i++) {
    var city = orderB[i];
    if (!neworder.includes(city)) {
      neworder.push(city);
    }
  }
  return neworder;
}


function mutate(sketch, order, mutationRate) {
  for (var i = 0; i < totalCities; i++) {
    if (sketch.random(1) < mutationRate) {
      var indexA = sketch.floor(sketch.random(order.length));
      var indexB = (indexA + 1) % totalCities;
      sketch.swap(order, indexA, indexB);
    }
  }
}
