const commentEntry = document.getElementById('commentOnPost');
const reloadBtn = document.getElementById('reload')

let id = window.location.search.slice(1);
console.log("this is the id " + id)

commentEntry.addEventListener('submit', (e) => {
    e.preventDefault()
    const newComment = {
        comment: e.target.commententry.value
    }

    const methods = {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        }
    };
    document.getElementById('commententry').value = ''
    fetch(`http://localhost:5500/comments/${id}`, methods)
        .then(res => res.json())
})


async function getThread(){
    try{
        let respId = await fetch(`http://localhost:5500/${id}`)
        let jsonDataEntry = await respId.json()
        let figGif = document.getElementById('seeGif')
        let thread = document.getElementById('thread')
        let threadBody = document.createElement('h2')
        let threadGif = document.createElement('img')
        threadBody.id = 'threadBody'
        threadGif.src = jsonDataEntry.siteUrl
        threadBody.innerHTML = `${jsonDataEntry.body}`
        thread.append(threadBody)
        figGif.append(threadGif)
        let commentArr = jsonDataEntry.comments
        for(let i = 0; i < commentArr.length; i++){
            let commentBody = document.getElementById('comment-box')
            let threadComment = document.createElement('p')
            let commentDate = new Date();
            threadComment.id = 'threadComment'
            threadComment.innerHTML = `<p class = "commentOnPage">${jsonDataEntry.comments[i]} ${commentDate.getDate()}/${commentDate.getMonth() + 1}/${commentDate.getFullYear()}</p>`
            commentBody.append(threadComment)
            console.log(jsonDataEntry.comments[0])
        }
    }catch(err){
        console.error(err)
    }
}
reloadBtn.addEventListener('click', (e) => {
    e.preventDefault()
    location.reload()
})

getThread()