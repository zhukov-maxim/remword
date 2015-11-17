// Fisher–Yates shuffle from http://bost.ocks.org/mike/shuffle/
function shuffleArray(array) {
  let shuffledArray = array.slice();

  let m = shuffledArray.length;
  let t;
  let i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = shuffledArray[m];
    shuffledArray[m] = shuffledArray[i];
    shuffledArray[i] = t;
  }

  return shuffledArray;
}

// Creates an array which consists of n elements and
// fills it with elements equal to indexes: [0, 1, 2, ... n]
function fillArrayWithNumbers(n) {
  let array = Array.apply(null, Array(n));

  return array.map(function(x, i) { return i; });
}

function selectRandomIndexes(firstIndex, lastIndex, number) {
  const initialArray = fillArrayWithNumbers(lastIndex + 1);
  const shuffledArray = shuffleArray(initialArray);

  return shuffledArray.slice(0, number);
}

export {shuffleArray, selectRandomIndexes};
