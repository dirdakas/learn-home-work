`
  https://users.monash.edu/~lloyd/tildeAlgDS/Graph/

       1  2  3  4  5  6
  1       4     3     5
  2    4     3  4  4
  3       3     2
  4    3  4  2     3
  5       4     3     1
  6    5           1
`
interface IShortestPathInfo {
  startVertex: number,
  pathLengths: number[],
  predecessors: number[]
}

class Graph {
  size: number;
  matrix: number[][];

  constructor(size = 1) {
    this.size = size;
    this.matrix = [];

    for (let i = 0; i < size; i++) {
      this.matrix.push([]);

      for (let j = 0; j < size; j++) {
        this.matrix[i][j] = Infinity;
      }
    }
  }

  addEdge(vertex1: number, vertex2: number, weight: number = 1): void {
    if (vertex1 > this.size - 1 || vertex2 > this.size - 1) {
      console.log('--------------')
      console.log('invalid vertex');
      console.log('--------------')
    } else if (vertex1 === vertex2) {
      console.log('--------------')
      console.log('same vertex');
      console.log('--------------')
    } else {
      this.matrix[vertex1][vertex2] = weight;
      this.matrix[vertex2][vertex1] = weight;
    }
  }

  printGraph(): void {
    console.log();
    console.log('--------------');
    // print header
    let header: string = '  ';
    for (let i = 0; i < this.matrix.length; i++) {
      header += ` ${i + 1}`;
    }
    console.log(header);

    // print lines
    for (let i = 0; i < this.matrix.length; i++) {
      let line: string = `${i + 1} `;
      for (let j = 0; j < this.matrix.length; j++) {
        line += ` ${this.matrix[i][j] === Infinity ? 0 : this.matrix[i][j]}`;
      }
      console.log(line);
    }

    console.log('--------------');
  }

  setGraphFromExample(): void {
    this.addEdge(1, 0, 4);
    this.addEdge(3, 0, 3);
    this.addEdge(5, 0, 5);

    this.addEdge(2, 1, 3);
    this.addEdge(3, 1, 4);
    this.addEdge(4, 1, 4);

    this.addEdge(3, 2, 2);

    this.addEdge(4, 3, 3);

    this.addEdge(4, 5, 1);
  }

  getShortestPath(numVertices: number, startVertex: number): IShortestPathInfo {
    const isDone: boolean[] = new Array(numVertices);
    isDone[startVertex] = true;

    const pathLengths: number[] = new Array(numVertices);
    const predecessors: number[] = new Array(numVertices);

    // check which paths are availables != Infinity
    for (let i = 0; i < numVertices; i++) {
      pathLengths[i] = this.matrix[startVertex][i];

      // if path available - mark it
      if (this.matrix[startVertex][i] != Infinity) {
        predecessors[i] = startVertex;
      }
    }

    // path length starts from 0
    pathLengths[startVertex] = 0;

    for (let i = 0; i < numVertices - 1; i++) {
      let closest: number = -1;
      let closestDistance: number = Infinity;

      // check and "save" which is the closes item/index and save it's length
      for (let j = 0; j < numVertices; j++) {
        if (!isDone[j] && pathLengths[j] < closestDistance) {
          closestDistance = pathLengths[j];
          closest = j;
        }
      }

      isDone[closest] = true;

      // go throught list and check which could be the shortest from saved list
      for (let j = 0; j < numVertices; j++) {
        if (!isDone[j]) {
          let possiblyCloserDistance: number = pathLengths[closest] + this.matrix[closest][j];

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
  }

  getConstructedPath(shortestPathInfo: IShortestPathInfo, endVertex: number): number[] {
    let path = [];

    while (!!endVertex && endVertex != shortestPathInfo.startVertex) {
      path.unshift(endVertex);
      endVertex = shortestPathInfo.predecessors[endVertex];
    }
    return path;
  }
}

const graph: Graph = new Graph(6);

graph.printGraph();

graph.setGraphFromExample();

graph.printGraph();

// Compute the shortest paths from vertex to each other vertex in the graph.
const shortestPathInfo = graph.getShortestPath(0, 1);
console.log('shortestPathInfo', shortestPathInfo);

// Get the shortest path from vertex
const path = graph.getConstructedPath(shortestPathInfo, 5);
console.log('path1to6', path)