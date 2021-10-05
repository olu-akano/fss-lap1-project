let laughButton = document.getElementById('laugh')
let sadButton = document.getElementById('sad')
let coolButton = document.getElementById('cool')
const laughEmoji = e.target.laugh.value

count = 0;
laughButton.onclick = function() {
    count +=1;
    laughButton.textContent = '&#128514' + count;
};

sadButton.onclick = function () {
    count +=1;
    sadButton.textContent = '&#128532' + count;
}

sadButton.onclick = function () {
    count +=1;
    sadButton.textContent = '&#128526' + count;
}
