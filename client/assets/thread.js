const commentEntry = document.getElementById('commentOnPost');
const reloadBtn = document.getElementById('reload')

let id = window.location.search.slice(1);
console.log("this is the id " + id)

commentEntry.addEventListener('submit', (e) => {
    e.preventDefault()
    let commentContent = e.target.commententry.value
    if(commentContent){
        const newComment = {
            comment: commentContent
        }
    
        const methods = {
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: {
                "Content-Type": "application/json"
            }
        };
        document.getElementById('commententry').value = ''
        fetch(`https://journ-itapi.herokuapp.com/comments/${id}`, methods)
            .then(res => {
                res.json()
                location.reload()
            })
    } else {
        alert('Please enter a comment of more than 5 characters')
    }
})


async function getThread(){
    try{
        let respId = await fetch(`https://journ-itapi.herokuapp.com/${id}`)
        let jsonDataEntry = await respId.json()
        let figGif = document.getElementById('seeGif')
        let thread = document.getElementById('thread')
        let threadBody = document.createElement('h3')
        let threadGif = document.createElement('img')
        threadBody.id = 'threadBody'
        threadGif.id = 'threadGif'
        threadGif.src = jsonDataEntry.siteUrl
        threadBody.innerHTML = `${jsonDataEntry.body}`
        thread.append(threadBody)
        thread.append(threadGif)
        let commentArr = jsonDataEntry.comments
        for(let i = 0; i < commentArr.length; i++){
            let commentBody = document.getElementById('comment-box')
            let threadComment = document.createElement('p')
            let commentDate = new Date();
            threadComment.classList.add("commentOnPage");
            threadComment.innerHTML = `${jsonDataEntry.comments[i]} ${commentDate.getDate()}/${commentDate.getMonth() + 1}/${commentDate.getFullYear()}`
            commentBody.append(threadComment)
            console.log(jsonDataEntry.comments[0])
        }
    }catch(err){
        console.error(err)
    }
}
getThread()
