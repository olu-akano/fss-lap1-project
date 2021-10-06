// const gifButton = document.querySelector('gifButton')
// const theBody = document.querySelector('body')

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
            let randomGif = Math.floor((Math.random() * 3));
            // console.log(content.data[0].images.downsized.url)
            for(let i = 0; i < gifUrl.length;i++){
                let fig = document.createElement('figure');
                let img = document.createElement('img');
                let fc = document.createElement('figcaption');
                img.src = content.data[i].images.downsized.url;
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

        clickedGif.innerHTML = `<p>this is the img u chose</p> <img src = "${url}"></img>`
    })
    return url
}

// clicked()
console.log(gif)
