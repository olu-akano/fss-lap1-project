let laughButton = document.getElementById('laugh')
const laughEmoji = e.target.laugh.value

count = 0;
laughButton.onclick = function() {
    count +=1;
    laughButton.textContent = laughEmoji + count;
};