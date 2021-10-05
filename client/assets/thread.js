let id = window.location.search.slice(1);
console.log("this is the id " + id)
async function getThread(){
    try{
        let respId = await fetch(`http://localhost:5500/${id}`)
        let jsonDataEntry = await respId.json()
        let thread = document.getElementById('thread')
        let threadComment = document.createElement('div')
        let threadBody = document.createElement('h2')
        threadBody.id = 'threadBody'
        threadComment.id = 'threadComment'
        threadBody.innerHTML = `${jsonDataEntry.body}`
        threadComment.innerHTML = `comments: ${jsonDataEntry.comments}`
        thread.append(threadBody)
        thread.append(threadComment)
        console.log(jsonDataEntry.body, jsonDataEntry.comments)
    }catch(err){
        console.error(err)
    }
}
getThread()