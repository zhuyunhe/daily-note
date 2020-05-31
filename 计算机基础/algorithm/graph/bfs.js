const graph = {
  A: ['B', 'C'],
  B: ['A', 'C', 'D'],
  C: ['A', 'B', 'D', 'E'],
  D: ['B', 'C', 'E', 'F'],
  E: ['C', 'D'],
  F: ['D']
}

function BFS(graph, s) {
  const queue = [];
  queue.push(s);
  const result = new Set();
  result.add(s);
  const parent = {};
  parent[s] = null;

  // 队列，先进先出
  while (queue.length) {
    const vertex =  queue.shift();
    let siblings = graph[vertex];
    siblings.forEach(node => {
      if(!result.has(node)) {
        parent[node] = vertex;
        queue.push(node);
        result.add(node);
      }
    });
  }
  console.log(result)
  console.log(parent)
}

BFS(graph, 'A')