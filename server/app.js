const express = require('express');
const fs = require('fs')
const app = express();
const cors = require('cors');
app.use(express.json())
app.use(cors());
const data = require('./data.json')
comment1 = 'hello'

app.get('/', (req,res) =>{
    res.json(data)
})
app.get('/:enid', getEntryById)
app.get('/comment/comments', getAllComments)
app.get('/comments/:cid', getCommentById)
app.post('/comments/:cid', addComment)


function getCommentById(req, res){
    let id = parseInt(req.params.cid)
    let selectedComment = data.find(c => c.id === id)
    res.json(selectedComment.comments)
}

function getEntryById(req, res){
    let entryId = parseInt(req.params.enid)
    let selectedEntry = data.find(e => e.id === entryId)
    res.json(selectedEntry)
}

function getAllComments(req, res){
    let comments = [];
    for(let i = 0; i < data.length; i++){
        let commentContent = data[i]['comments']
        let commentId = data[i]['id']
        comments[i] = {'comment': commentContent,'id':commentId}
    }
    res.json(comments)
}

app.post('/', (req,res) => {
    let newID = data.length + 1
    let comments = []
    let newEntry = {id: newID, ... req.body, comments}
    data.push(newEntry)
    let newEntryString = JSON.stringify(data, null, 2)
    fs.writeFile('data.json', newEntryString, (success) => {
        console.log('all done')
    })
    res.status(201).json({message:'done'})
})

function addComment(req,res){
    let newComment = {... req.body}
    let arrNewComment = Object.values(newComment)
    let commentElem = arrNewComment[0]
    let commentId = parseInt(req.params.cid)
    data[commentId - 1]['comments'].push(commentElem)
    let newCommentString = JSON.stringify(data, null, 2)
    fs.writeFile('data.json', newCommentString, (success) => {
        console.log('all done')
    })
    res.status(201).json({message:'done'})

}

module.exports = app;
