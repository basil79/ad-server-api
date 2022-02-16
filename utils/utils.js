const average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

const sum = function(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}

const mean = function(arr) {
  const arrSum = sum(arr);
  return arrSum / arr.length;
}

const median = function(arr) {
  arr = arr.sort();
  if (arr.length % 2 === 0) { // array with even number elements
    return (arr[arr.length/2] + arr[(arr.length / 2) - 1]) / 2;
  } else {
    return arr[(arr.length - 1) / 2]; // array with odd number elements
  }
}

module.exports = {
  average,
  sum,
  mean,
  median
}


