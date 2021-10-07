let laughButton = document.getElementById('laugh')
let sadButton = document.getElementById('sad')
let coolButton = document.getElementById('cool')
let laughCount = document.getElementById('laughCounter')
let sadCount = document.getElementById('sadCounter')
let coolCount = document.getElementById('coolCounter')
let lCounter = 0;
let sCounter = 0;
let cCounter = 0;
const emojiData = [
  {
      "laugh" : lCounter
  },
  {
      "sad" : sCounter
  },
  {
      "cool" : cCounter
  }

]

laughButton.addEventListener('click', laughCounter)
sadButton.addEventListener('click', sadCounter)
coolButton.addEventListener('click', coolCounter)

function laughCounter() {
    lCounter += 1;
    let laughData = emojiData[0].laugh + lCounter
    laughCount.replaceChildren(laughData)
}
function sadCounter() {
  sCounter += 1;
  console.log(emojiData[1].sad)
  let sadData = emojiData[1].sad + sCounter
  console.log(sadData)
  sadCount.replaceChildren(sadData)
}
function coolCounter() {
  cCounter += 1;
  let coolData = emojiData[2].cool + cCounter
  coolCount.replaceChildren(coolData)
}
