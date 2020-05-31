// const numbers = [-2, 2, 3, 4]
const numbers = [1,2,3,4,5,6,8,9]
// const numbers = [-1, 0]
function binary(numbers, target) {
  let left = 0
  let right = numbers.length - 1
  let mid = right
  while (left < right && numbers[right]>target) {
    mid = Math.ceil(left + (right - left) / 2);
    console.log(`numbers[${mid}] = ${numbers[mid]}`)
    if(numbers[mid]<=target){
      left = mid + 1
    } else if (numbers[mid] > target){
      right = mid - 1
    }
  }
  console.log(mid)
  left = 0
  right = mid

  while(left < right){
    if(numbers[left] + numbers[right] < target){
      left ++
    } else if (numbers[left] + numbers[right] > target) {
      right --
    } else {
      return [left+1, right+1]
    }
  }
}



const find = (a, target) => {
  let left = 0;
  let right = a.length - 1;
  let mid;

  while (left < right) {
    mid = Math.floor((right - left) / 2);
    if (a[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
}

console.log(binary(numbers, 10))
// console.log(find(numbers, 0))
