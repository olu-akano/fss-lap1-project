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
        console.log(dataJson);
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
        // fig.append(fc);
        let gif = img.src
        // fig.innerHTML = `<figure id="gif${i}" class='gif ' ><img src='${content.data[i].images.downsized_medium.url}' 
        // alt='${content.data[i].title}' style= "width:100px"> <figcaption> ${content.data[i].title} </figcaption> </figure>`;
        // popUp.append(fig);
        // console.log(gif)
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
    // let clickedGif = document.getElementById('chosen')
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
        let resp = await fetch('http://localhost:5500/')
        let jsonData = await resp.json()
        let cardbox = document.getElementById('card--container');
        for(let i = 0; i < jsonData.length; i++){
            let card = document.createElement('div');
            card.classList.add('card')
            card.id = `card${i}`
            card.innerHTML = `<a class='entryContent' href="thread.html?${jsonData[i].id}">${jsonData[i].body}</a>
            <div class ='bottomBar'></div>`;
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
            
            fetch('http://localhost:5500/', methods)
            .then(res => {
                res.json()
                document.querySelector('#chosenGifUrl').value ='';
                document.querySelector('#textentry').value ='';
                location.reload()
            })
        } else {
            alert('please insert upto 10 characters')
        }

    })
}
getAll()
journalPost()