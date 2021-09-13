"\n  https://users.monash.edu/~lloyd/tildeAlgDS/Graph/\n\n       1  2  3  4  5  6\n  1       4     3     5\n  2    4     3  4  4\n  3       3     2\n  4    3  4  2     3\n  5       4     3     1\n  6    5           1\n";
var Graph = /** @class */ (function () {
    function Graph(size) {
        if (size === void 0) { size = 1; }
        this.size = size;
        this.matrix = [];
        for (var i = 0; i < size; i++) {
            this.matrix.push([]);
            for (var j = 0; j < size; j++) {
                this.matrix[i][j] = Infinity;
            }
        }
    }
    Graph.prototype.addEdge = function (vertex1, vertex2, weight) {
        if (weight === void 0) { weight = 1; }
        if (vertex1 > this.size - 1 || vertex2 > this.size - 1) {
            console.log('--------------');
            console.log('invalid vertex');
            console.log('--------------');
        }
        else if (vertex1 === vertex2) {
            console.log('--------------');
            console.log('same vertex');
            console.log('--------------');
        }
        else {
            this.matrix[vertex1][vertex2] = weight;
            this.matrix[vertex2][vertex1] = weight;
        }
    };
    Graph.prototype.printGraph = function () {
        console.log();
        console.log('--------------');
        // print header
        var header = '  ';
        for (var i = 0; i < this.matrix.length; i++) {
            header += " " + (i + 1);
        }
        console.log(header);
        // print lines
        for (var i = 0; i < this.matrix.length; i++) {
            var line = i + 1 + " ";
            for (var j = 0; j < this.matrix.length; j++) {
                line += " " + (this.matrix[i][j] === Infinity ? 0 : this.matrix[i][j]);
            }
            console.log(line);
        }
        console.log('--------------');
    };
    Graph.prototype.setGraphFromExample = function () {
        this.addEdge(1, 0, 4);
        this.addEdge(3, 0, 3);
        this.addEdge(5, 0, 5);
        this.addEdge(2, 1, 3);
        this.addEdge(3, 1, 4);
        this.addEdge(4, 1, 4);
        this.addEdge(3, 2, 2);
        this.addEdge(4, 3, 3);
        this.addEdge(4, 5, 1);
    };
    Graph.prototype.getShortestPath = function (numVertices, startVertex) {
        var isDone = new Array(numVertices);
        isDone[startVertex] = true;
        var pathLengths = new Array(numVertices);
        var predecessors = new Array(numVertices);
        // check which paths are availables != Infinity
        for (var i = 0; i < numVertices; i++) {
            pathLengths[i] = this.matrix[startVertex][i];
            // if path available - mark it
            if (this.matrix[startVertex][i] != Infinity) {
                predecessors[i] = startVertex;
            }
        }
        // path length starts from 0
        pathLengths[startVertex] = 0;
        for (var i = 0; i < numVertices - 1; i++) {
            var closest = -1;
            var closestDistance = Infinity;
            // check and "save" which is the closes item/index and save it's length
            for (var j = 0; j < numVertices; j++) {
                if (!isDone[j] && pathLengths[j] < closestDistance) {
                    closestDistance = pathLengths[j];
                    closest = j;
                }
            }
            isDone[closest] = true;
            // go throught list and check which could be the shortest from saved list
            for (var j = 0; j < numVertices; j++) {
                if (!isDone[j]) {
                    var possiblyCloserDistance = pathLengths[closest] + this.matrix[closest][j];
                    if (possiblyCloserDistance < pathLengths[j]) {
                        pathLengths[j] = possiblyCloserDistance;
                        predecessors[j] = closest;
                    }
                }
            }
        }
        return {
            startVertex: startVertex,
            pathLengths: pathLengths,
            predecessors: predecessors
        };
    };
    Graph.prototype.getConstructedPath = function (shortestPathInfo, endVertex) {
        var path = [];
        while (!!endVertex && endVertex != shortestPathInfo.startVertex) {
            path.unshift(endVertex);
            endVertex = shortestPathInfo.predecessors[endVertex];
        }
        return path;
    };
    return Graph;
}());
var graph = new Graph(6);
graph.printGraph();
graph.setGraphFromExample();
graph.printGraph();
// Compute the shortest paths from vertex to each other vertex in the graph.
var shortestPathInfo = graph.getShortestPath(0, 1);
console.log('shortestPathInfo', shortestPathInfo);
// Get the shortest path from vertex
var path = graph.getConstructedPath(shortestPathInfo, 5);
console.log('path1to6', path);
