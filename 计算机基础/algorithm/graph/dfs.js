const graph = {
  A: ['B', 'C'],
  B: ['A', 'C', 'D'],
  C: ['A', 'B', 'D', 'E'],
  D: ['B', 'C', 'E', 'F'],
  E: ['C', 'D'],
  F: ['D']
}

function DFS(graph, s) {
  const stack = [];
  stack.push(s);
  const result = new Set();
  result.add(s);
  // 栈，后进先出
  while (stack.length) {
    const vertex = stack.pop();
    result.add(vertex);
    console.log(result)
    let siblings = graph[vertex];
    siblings.forEach(node => {
      if (!result.has(node)) {
        stack.push(node);
      }
    });
  }
  console.log(result)
}

DFS(graph, 'A')