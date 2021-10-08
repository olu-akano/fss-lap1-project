const journalEntry = document.getElementById('journalentry');
const getEntry = document.getElementById('entryDisplay')
let apiKey = "Vmm3lbBghGat2wYmzhFGYPqNaPZCke6B";
let popUp = document.getElementById('gifPopup')
let gifBtn = document.getElementById('gifButton')
let str = document.getElementById("gifInput").value.trim();
let arrStr = str.split('')
console.log(str)


popUp.addEventListener('mouseleave', (e) => {
    e.preventDefault()
    popUp.style.display = "none"
})


gifBtn.addEventListener("click", gifselection);



async function gifselection (e) {
    e.preventDefault();
    let str = document.getElementById("gifInput").value.trim();
    str.value = '';
    let apiURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=25&q=`
    apiURL = apiURL.concat(str);
    try {
        let data = await fetch(apiURL);
        let dataJson = await data.json();
        showGif(dataJson);
    } catch (err) {console.warn(err)}
}

function showGif (content){
    popUp.style.display = "grid"
    let gifUrl = content.data;
    console.log(gifUrl);
    for(let i=0; l=gifUrl.length; i++){
        let fig = document.createElement('div');
        fig.classList.add("gif");
        let img = document.createElement('img');
        let fc = document.createElement('figcaption');
        img.src = content.data[i].images.downsized.url;
        img.alt = content.data[i].title;
        img.id = 'gif'
        fc.textContent = content.data[i].title;
        fig.append(img);
        let gif = img.src
        popUp.append(fig)
        let output = document.querySelector('#gifPopup')
        output.insertAdjacentElement('afterbegin', fig);
        document.querySelector('#gifInput').value ='';
        
        output.style.visibility='visible';
        clicked(gif)
    }
}



function clicked(url){
    let chosenGif = document.getElementById('gif')
    let chosenGifUrl = document.getElementById('chosenGifUrl')
    let userGif = document.getElementById('userGif')
    chosenGif.addEventListener('click', (e) => {
        e.preventDefault()
        chosenGifUrl.value = `${url}`
        userGif.innerHTML = `<img id='thumbnail' width = "100px" height = "100px" src = "${url}">`
    })
    userGif.addEventListener("click", (e) => {
        e.preventDefault()
        userGif.innerHTML = ''
        chosenGifUrl.value = ''
    })
}

async function getAll(){
    try{
        let resp = await fetch('https://journ-itapi.herokuapp.com/')
        let jsonData = await resp.json()
        let cardbox = document.getElementById('card--container');
        for(let i = 0; i < jsonData.length; i++){
            let card = document.createElement('div');
            card.classList.add('card')
            card.id = `card${i}`

            card.innerHTML = `<a class='entryContent' href="client/thread.html?${jsonData[i].id}">${jsonData[i].body}</a>
            <div class='bottomBar'>
            <div id='reaction--container'>
                <button id = "laugh" type = "radio" name = "input">😂</button>
                <button id = "laughCounter">0</button>
                <button id = "sad" type ="radio" name = "input">&#128532</button>
                <button id = "sadCounter">0</button>
                <button id = "cool" type ="radio" name = "input">&#128526</button>
                <button id = "coolCounter">0</button>
            </div>
        </div>`;
            cardbox.append(card);
        }
    }catch(err){
        console.error(err)
    }
}


function journalPost(){
    journalEntry.addEventListener('submit', (e) => {
        e.preventDefault();

        let entryContent = e.target.textentry.value
        if(entryContent){
            const entry = {
                siteUrl: e.target.chosenGifUrl.value,
                body: entryContent
            }
            console.log(entry)
            const methods = {
                method: 'POST',
                body: JSON.stringify(entry),
                headers: {
                    "Content-Type": "application/json"
                }
            };
            

            fetch('https://journ-itapi.herokuapp.com/', methods)
            .then(res => {
                res.json()
                document.querySelector('#chosenGifUrl').value ='';
                document.querySelector('#textentry').value ='';
                location.reload()
            })
        } else {alert('Please enter a post of more than 10 characters')}
    })
}

getAll()
journalPost()

module.exports = {getAll, journalPost}