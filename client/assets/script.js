const journalEntry = document.getElementById('journalentry');
const getEntry = document.getElementById('entryDisplay')
let apiKey = "Vmm3lbBghGat2wYmzhFGYPqNaPZCke6B";
document.addEventListener("DOMContentLoaded", sendApiRequest)

function sendApiRequest() {
    document.getElementById('gifButton').addEventListener("click", e => {
        e.preventDefault();
        let apiURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=3&q=`
        let str = document.getElementById("gifInput").value.trim();
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
                fig.appendChild(img);
                fig.appendChild(fc);
                let gif = img.src
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

}
function clicked(url){
    let chosenGif = document.getElementById('gif')
    let clickedGif = document.getElementById('chosen')
    chosenGif.addEventListener('click', (e) => {
        e.preventDefault()
        clickedGif.innerHTML = `<p>this is the img u chose</p> <img src = "${url}"></img>`
        journalPost(url)
    })
}

function journalPost(url){
    journalEntry.addEventListener('submit', (e) => {
        e.preventDefault();
        const entry = {
            body: e.target.textentry.value, 
            siteUrl: url
        }
    
        const methods = {
            method: 'POST',
            body: JSON.stringify(entry),
            headers: {
                "Content-Type": "application/json"
            }
        };
    
        fetch('http://localhost:5500/', methods)
            .then(res => res.json())
    })
}

async function getAll(){
    try{
        let resp = await fetch('http://localhost:5500/')
        let jsonData = await resp.json()
        let cardbox = document.getElementById('card--container');
        for(let i = 0; i < jsonData.length; i++){
            console.log(jsonData[i].body);
            let card = document.createElement('div');
            card.innerHTML = `<div id="card${i}" class="card"><a href="thread.html?${jsonData[i].id}">${jsonData[i].body}</a></div>`;
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

getAll()
