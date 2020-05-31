class Graph {
  constructor(){
    this.vertices = vertices;
    this.AdjList = new Map();
  }

  // 添加顶点
  addVertex(v){
    this.AdjList.set(v, [])
  }

  // 添加边
  addEdge(v, w){
    this.AdjList.get(v).push(w);
    this.AdjList.get(w).push(v);
  }

  // 打印
  printGraph(){
    let get_keys = this.AdjList.keys();
    for (let key of get_keys){
      let get_values = this.AdjList.get(key);
      let conc = '';
      for (let value of get_values){
        conc += value + ' '
      }
      console.log(key + '->' + conc)
    }
  }

  // 广度优先遍历
  bfs(startVertics){
    if (!startVertics){
      console.log('请给一个起点')
      return
    }
    const queue = [];
    const visited = new Set();
    queue.push(startVertics);
    visited.add(startVertics);
    while (queue.length) {
      const v = queue.shift();
      console.log(v)
      const siblings = this.AdjList.get(v);
      siblings.forEach(w => {
        if (!visited.has(w)){
          queue.push(w)
          visited.add(w)
        }
      })
    }
  }

  // 深度优先遍历
  dfs(startVertics){
    if (!startVertics) {
      console.log('请给一个起点')
      return
    }
    const visited = new Set();
    const DFSUtil = (v ,visited) => {
      visited.add(v);
      console.log(v)
      const siblings = this.AdjList.get(v)
      siblings.forEach(w => {
        if(!visited.has(w))
          DFSUtil(w, visited)
      })
    }
    DFSUtil(startVertics, visited);
  }
}

var g = new Graph(6);
var vertices = ['A', 'B', 'C', 'D', 'E', 'F'];
for (let i = 0; i < vertices.length; i++){
  g.addVertex(vertices[i]);
}
g.addEdge('A', 'B');
g.addEdge('A', 'D');
g.addEdge('A', 'E');
g.addEdge('B', 'C');
g.addEdge('D', 'E');
g.addEdge('E', 'F');
g.addEdge('E', 'C');
g.addEdge('C', 'F'); 

g.printGraph()
console.log('bfs: ')
g.bfs('A')
console.log('dfs: ')
g.dfs('A')