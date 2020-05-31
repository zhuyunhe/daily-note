class Work{
  constructor(value, start, end){
    this.value = value;   // 任务价值
    this.start = start;   // 任务开始时间
    this.end = end;       // 任务结束时间
    this.pre = -1;
  }
}

const works = [
  new Work(5, 1, 4),//
  new Work(1, 3, 5),
  new Work(8, 0, 6),
  new Work(4, 4, 7), //
  new Work(6, 3, 8),
  new Work(3, 5, 9),
  new Work(2, 6, 10),
  new Work(4, 8, 11),//
]

function getPre(works){
  for (let i = works.length-1; i>0; i--) {
    for(let j=i-1; j>=0; j--){
      if (works[j].end <= works[i].start){
        works[i].pre = j;
        break;
      }
    }
  }
}

function find(works) {
  getPre(works);
  console.log(works.map(work => work.pre))
  let result = new Array(works.length);
  let resultStep = new Array(works.length);
  result[0] = works[0].value;
  resultStep[0] = [0];
  
  for(let i=1; i<result.length; i++){
    resultStep[i] = [i];
    let __self = (works[i].pre === -1 ? 0 : result[works[i].pre]) + works[i].value
    if (result[i - 1] < __self) {
      if (works[i].pre !== -1){
        resultStep[i] = resultStep[works[i].pre].concat(resultStep[i])
      }
      result[i] = __self;
    } else{
      result[i] = result[i - 1];
      resultStep[i] = resultStep[i-1]
    }
  }
  console.log('resultStep:')
  console.log(resultStep)
  console.log('result: ' + result)
}

find(works);