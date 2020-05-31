var obj = {
  startTime: 0,
  elapsedTime: 0,
  end: null,
  delay: 0
}
var rAF = {
  all: new Set(),
  add(obj){
    this.all.add(obj)
    requestAnimationFrame(tick)
  }
}
const trackTime = (obj, now) => {
  if (!obj.startTime){
    obj.startTime = now
  }
  obj.elapsedTime = now - obj.startTime
}

const getProgress = (elapsed ,duration) => {
  return duration > 0 ? Math.min(elapsed / duration, 1) : 1
}

const tick = (now) =>{
  const {all} = rAF
  all.forEach(obj => {
    trackTime(obj, now)
    let progress = getProgress(obj.elapsedTime, obj.delay)
    if (progress >= 1) {
      obj.end('finish')
      all.delete(obj)
    }
  })
  if (all.size > 0) requestAnimationFrame(tick)
}

const delay = (duration) => {
  obj.delay = duration
  return new Promise(resolve => {
    obj.end = resolve
  })
}

const init = async () => {
  rAF.add(obj)
  console.time()
  const result = await delay(2000)
  console.log(result)
  console.timeEnd()
}

init()