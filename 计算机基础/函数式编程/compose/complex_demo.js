//https://tech.meituan.com/2017/10/12/functional-programming-in-redux.html
var personData = [
  {
    name: 'zyh',
    level: 'p2.1',
    segment: '平台',
    tasks: 16,
    month: '201707',
    type: 'RD'
  },
  {
    name: 'Pony',
    level: 'p2.1',
    segment: '到餐',
    tasks: 16,
    month: '201707',
    type: 'RD'
  }, 
  {
    name: 'Sonny',
    level: 'p2.1',
    segment: '到餐',
    tasks: 22,
    month: '201707',
    type: 'RD'
  }, 
  {
    name: 'Jack',
    level: 'p2.2',
    segment: '外卖',
    tasks: 29,
    month: '201707',
    type: 'QA'
  }
]

const compose = (...fns) => {
  if (fns.length === 0) return arg => arg
  if (fns.length === 1) return fns[0]

  return fns.reduceRight((a, b) => (...args) => a(b(...args)))
}

const filter = fn => arr => arr.filter(fn)
const map = fn => arr => arr.map(fn)
const reduce = fn => arr => arr.reduce(fn)

var task = compose(
  filter(person => person.type === 'RD'),
  filter(person => person.segment === '到餐'),
  map(person => person.tasks),
  reduce((a,b) => a+b)
)

console.log(task(personData));

