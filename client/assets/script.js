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


gifBtn.addEventListener("click", e => {
    e.preventDefault();
    popUp.style.display = "flex"
    let str = document.getElementById("gifInput").value.trim();
    let apiURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=9&q=`
    apiURL = apiURL.concat(str);
    console.log(apiURL);
    fetch(apiURL)
    .then(res => res.json())
    .then(content => {
        console.log(content.data);
        let gifUrl = content.data;
        // console.log(content.data[0].images.downsized.url)
        for(let i = 0; i < gifUrl.length;i++){
            let fig = document.createElement('figure');
            let img = document.createElement('img');
            let fc = document.createElement('figcaption');
            img.src = content.data[i].images.downsized_medium.url;
            img.alt = content.data[i].title;
            img.id = 'gif'
            fc.textContent = content.data[i].title;
            fig.append(img);
            fig.append(fc);
            let gif = img.src
            console.log(gif)
            let output = document.querySelector('.output')
            output.insertAdjacentElement('afterbegin', fig);
            document.querySelector('#gifInput').value ='';
            clicked(gif)
        }
    })
    .catch(err =>{
        console.error(`Oh no.. ${err}`)
    
    });
}) 

function clicked(url){
    let chosenGif = document.getElementById('gif')
    let clickedGif = document.getElementById('chosen')
    let chosenGifUrl = document.getElementById('chosenGifUrl')
    chosenGif.addEventListener('click', (e) => {
        e.preventDefault()
        clickedGif.innerHTML = `<p>this is the img u chose</p> <img src = "${url}"></img>`
        chosenGifUrl.value = `${url}`
    })
    clickedGif.addEventListener("click", (e) => {
        e.preventDefault()
        clickedGif.innerHTML = ''
        chosenGifUrl.value = ''
    })
}

async function getAll(){
    try{
        let resp = await fetch('http://localhost:5500/')
        let jsonData = await resp.json()
        let cardbox = document.getElementById('card--container');
        for(let i = 0; i < jsonData.length; i++){
            let card = document.createElement('div');
            card.innerHTML = `<div id="card${i}" class="card"><a class='entryContent' href="thread.html?${jsonData[i].id}">${jsonData[i].body}</a></div>`;
            cardbox.append(card);
        }
    }catch(err){
        console.error(err)
    }
}


async function getSingleEntry(){
    try{
        let resp = await fetch('http://localhost:5500/')
        let jsonData = await resp.json()
        for(let x = 0; x < jsonData.length; x++){
            let id = jsonData[x].id
            console.log(jsonData[x])
            let respId = await fetch(`http://localhost:5500/${id}`)
            let jsonDataentry = await respId.json()
            console.log(jsonDataentry.body)
        }
    }catch(err){
        console.error(err)
    }
}
function journalPost(){
    journalEntry.addEventListener('submit', (e) => {
        e.preventDefault();
        console
        const entry = {
            siteUrl: e.target.chosenGifUrl.value,
            body: e.target.textentry.value
        }
        console.log(entry)
        const methods = {
            method: 'POST',
            body: JSON.stringify(entry),
            headers: {
                "Content-Type": "application/json"
            }
        };
        
        fetch('http://localhost:5500/', methods)
        .then(res => {
            res.json()
            document.querySelector('#chosenGifUrl').value ='';
            document.querySelector('#textentry').value ='';
            location.reload()
        })
    })
}
getAll()
journalPost()