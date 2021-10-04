const journalEntry = document.getElementById('journalentry');
const getEntry = document.getElementById('entryDisplay')

journalEntry.addEventListener('submit', (e) => {
    e.preventDefault();
    location.reload()
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
            card.innerHTML = `<div id="card${i}" class="card"><p>${jsonData[i].body}</p></div>`;
            cardbox.append(card);
        }
    }catch(err){
        console.error(err)
    }
}



async function getAllComments(){
    try{
        let resp = await fetch('http://localhost:5500/comments')
        let jsonData = await resp.json()
        for(let j = 0; j < jsonData.length; j++){
            let id = jsonData[j].id
            console.log(id)
            let respId = await fetch(`http://localhost:5500/comments/${id}`)
            let jsonDataComment = await respId.json()
            let commentBox = document.getElementById('card--container')
            for(let z = 0; z < jsonDataComment.length; z++){
                console.log(jsonDataComment[z])
                // let comment = document.createElement('div')
                // comment.id = "comments"
                // comment.innerHTML = `comments: ${jsonDataComment[z]}`
                // commentBox.append(comment)
            }
        }
    }catch(err){
        console.error(err)
    }
}

getAll()
getAllComments()