let laughButton = document.getElementById('laugh')
let sadButton = document.getElementById('sad')
// let countForEmoji = document.getElementById('counter')
// let coolButton = document.getElementById('cool')

laughButton.addEventListener('click', clickCounter)

function clickCounter() {
    const laughCount = document.createElement('button')
    laughCount.setAttribute("type", "click")
    if (typeof(Storage) !== "undefined") {
      if (localStorage.clickcount) {
        localStorage.clickcount = Number(localStorage.clickcount)+1;
      } else {
        localStorage.clickcount = 1;
      }
      laughButton.textContent = localStorage.clickcount
    }else {
        laughButton.textContent = "Your browser does not support this"
    }
}

// let count = 0;
// laughButton.addEventListener("click", ()=> {
//     count++;
//     laughButton.textContent = laughEmoji + count;
// });


// count2 = 0;
// sadButton.onclick = function () {
//     count2++;
//     sadButton.textContent = count2
// }

// sadButton.onclick = function () {
//     count +=1;
//     sadButton.textContent = '&#128526' + count;

// laughButton.addEventListener("click", clickCounter)

// function clickCounter() {
//     e.preventDefault();
//     if (typeof(Storage) !== "undefined") {
//         if (localStorage.clickcount) {
//             localStorage.clickcount = Number(localStorage.clickcount)+1;
//         } else {
//             localStorage.clickcount = 1;
//         }
//         laughButton.innerHTML = '&#128526' + localStorage.clickcount;
//     } else {
//         laughButton.innerHTML = "Sorry we couldnt't save"
//     }
// }