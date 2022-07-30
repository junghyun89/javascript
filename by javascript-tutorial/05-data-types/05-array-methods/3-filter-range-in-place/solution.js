
function filterRangeInPlace (arr, a, b) {
  
  for (let i = 0; i < arr.length; i++) {
    let value = arr[i]
    
    // remove if outside of the interval
    if (value < a || value > b) {
      arr.splice(i, 1);
      i--;
    }
  }
}
