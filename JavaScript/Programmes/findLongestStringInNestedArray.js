const nestedArray = [
  "apple",
  ["banana", "cherry", "blueberry"],
  "kiwi",
  ["mango", "papaya", ["dragonfruit", "pomegranate"]],
  "grape"
];

function findLongest(nestedArray){
    return nestedArray.reduce((acc,val) => {
        let currentLongest = Array.isArray(val) ? findLongest(val) : val
        return currentLongest.length > acc.length ? currentLongest : acc
    },"")
}

console.log(findLongest(nestedArray))
