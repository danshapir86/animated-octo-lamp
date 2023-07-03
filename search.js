class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(item, priority) {
    this.queue.push({ item, priority });
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.queue.shift().item;
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

function dijkstra(graph, start) {
  const distances = {};
  const pq = new PriorityQueue();

  for (let vertex in graph) {
    distances[vertex] = vertex === start ? 0 : Infinity;
    pq.enqueue(vertex, distances[vertex]);
  }

  while (!pq.isEmpty()) {
    const currentVertex = pq.dequeue();
    const neighbors = graph[currentVertex];

    for (let neighbor in neighbors) {
      const distance = distances[currentVertex] + neighbors[neighbor];

      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        pq.enqueue(neighbor, distance);
      }
    }
  }

  return distances;
}

const graph = {
  A: { B: 1, C: 4 },
  B: { A: 1, C: 2, D: 5 },
  C: { A: 4, B: 2, D: 1 },
  D: { B: 5, C: 1 },
};

const startVertex = "A";
const shortestDistances = dijkstra(graph, startVertex);
console.log(`Кратчайшие расстояния от вершины ${startVertex}:`, shortestDistances);
