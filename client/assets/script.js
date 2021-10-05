const journalEntry = document.getElementById('journalentry');
const getEntry = document.getElementById('entryDisplay')

journalEntry.addEventListener('submit', (e) => {
    e.preventDefault();
    const entry = {
        body: e.target.textentry.value 
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