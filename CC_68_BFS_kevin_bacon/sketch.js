// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Breadth-First search

// Part 1: https://youtu.be/piBq7VD0ZSo
// Part 2: https://youtu.be/-he67EEM6z0

// instance mode by Naoto Hieda

var data;
var graph;
var dropdown;


var s = function (sketch) {

  sketch.preload = function () {
    data = sketch.loadJSON('kevinbacon.json');
  }

  sketch.setup = function () {
    graph = new Graph();
    dropdown = sketch.createSelect();
    dropdown.changed(sketch.bfs);
    sketch.noCanvas();
    //console.log(data);

    var movies = data.movies;

    for (var i = 0; i < movies.length; i++) {
      var movie = movies[i].title;
      var cast = movies[i].cast;
      var movieNode = new Node(movie);
      graph.addNode(movieNode);

      for (var j = 0; j < cast.length; j++) {
        var actor = cast[j];
        var actorNode = graph.getNode(actor);
        if (actorNode == undefined) {
          actorNode = new Node(actor);
          dropdown.option(actor);
        }
        graph.addNode(actorNode);
        movieNode.addEdge(actorNode);
      }
    }
  }

  sketch.bfs = function () {
    graph.reset();
    var start = graph.setStart(dropdown.value());
    // var start = graph.setStart("Kevin Bacon");
    var end = graph.setEnd("Kevin Bacon");

    console.log(graph);

    var queue = [];


    start.searched = true;
    queue.push(start);

    while (queue.length > 0) {
      var current = queue.shift();
      if (current == end) {
        console.log("Found " + current.value);
        break;
      }
      var edges = current.edges;
      for (var i = 0; i < edges.length; i++) {
        var neighbor = edges[i];
        if (!neighbor.searched) {
          neighbor.searched = true;
          neighbor.parent = current;
          queue.push(neighbor);
        }
      }
    }

    var path = [];
    path.push(end);
    var next = end.parent;
    while (next != null) {
      path.push(next);
      next = next.parent;
    }

    var txt = '';
    for (var i = path.length - 1; i >= 0; i--) {
      var n = path[i];
      txt += n.value
      if (i != 0) {
        txt += ' --> '
      };
    }
    sketch. createP(txt);
  }

};

var myp5 = new p5(s);
