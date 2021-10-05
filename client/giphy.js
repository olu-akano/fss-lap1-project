// const gifButton = document.querySelector('gifButton')
// const theBody = document.querySelector('body')

let apiKey = "Vmm3lbBghGat2wYmzhFGYPqNaPZCke6B";
document.addEventListener("DOMContentLoaded", sendApiRequest)

function sendApiRequest() {
    document.getElementById('gifButton').addEventListener("click", e => {
        e.preventDefault();
        let apiURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=1&q=`
        let str = document.getElementById("gifInput").value.trim();
        apiURL = apiURL.concat(str);
        console.log(apiURL);
        fetch(apiURL)
        .then(res => res.json())
        .then(content => {
            console.log(content.data);
            console.log("META", content.meta);
            let fig = document.createElement('figure');
            let img = document.createElement('img');
            let fc = document.createElement('figcaption');
            img.src = content.data[0].images.downsized.url;
            img.alt = content.data[0].title;
            fc.textContent = content.data[0].title;
            fig.appendChild(img);
            fig.appendChild(fc);
            let output = document.querySelector('.output')
            output.insertAdjacentElement('afterbegin', fig);
            document.querySelector('#gifInput').value ='';
        })
        .catch(err =>{
            console.error(`Oh no.. ${err}`)
        
        });
    })
}

