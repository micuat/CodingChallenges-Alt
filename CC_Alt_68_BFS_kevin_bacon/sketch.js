// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Breadth-First search

// Part 1: https://youtu.be/piBq7VD0ZSo
// Part 2: https://youtu.be/-he67EEM6z0

// instance mode by Naoto Hieda

var data;
var graph;

var s = function (sketch) {

  sketch.preload = function () {
    data = sketch.loadJSONObject('../CC_Alt_68_BFS_kevin_bacon/kevinbacon.json');
  }

  sketch.setup = function () {
    graph = new Graph(sketch);
    sketch.createCanvas(800, 800);
    //console.log(data);

    var movies = data.getJSONArray('movies');

    for (var i = 0; i < movies.size(); i++) {
      var movie = movies.getJSONObject(i).getString('title');
      var cast = movies.getJSONObject(i).getJSONArray('cast');
      var movieNode = new Node(sketch, movie);
      graph.addNode(movieNode);

      print(cast)
      for (var j = 0; j < cast.size(); j++) {
        var actor = cast.getString(j);
        print(actor)
        var actorNode = graph.getNode(actor);
        if (actorNode == undefined) {
          actorNode = new Node(sketch, actor);
          // dropdown.option(actor);
        }
        graph.addNode(actorNode);
        movieNode.addEdge(actorNode);
      }
    }
  }

  sketch.draw = function () {
    sketch.background(0);
    graph.update();
    graph.show();

    if(sketch.frameCount % 60 == 0) {
      sketch.bfs();
    }
  }

  sketch.bfs = function () {
    graph.reset();
    var start = (sketch.random(graph.nodes));
    start.tc = [255, 0, 100];
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
          neighbor.tc = [100, 155, 0];
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

    // var txt = '';
    // for (var i = path.length - 1; i >= 0; i--) {
    //   var n = path[i];
    //   txt += n.value
    //   if (i != 0) {
    //     txt += ' --> '
    //   };
    // }
    // sketch. createP(txt);
  }

};

var myp5 = new p5(s);
