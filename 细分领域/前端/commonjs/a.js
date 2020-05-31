var count = 1;
function setCount() {
  setTimeout(() => {
    count++;
    console.log(count);
  }, 1000);
}
module.exports = {
  count,
  setCount
}