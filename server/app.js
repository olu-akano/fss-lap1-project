const express = require('express');
const fs = require('fs')
const app = express();
const cors = require('cors');
app.use(express.json())
const port = 5500;
app.use(cors());
const data = require('./data.json')


app.get('/', (req,res) =>{
    res.json(data)
})

app.post('/', (req,res) => {
    let newEntry = {... req.body}
    data.push(newEntry)
    let newEntryString = JSON.stringify(data, null, 2)
    fs.writeFile('data.json', newEntryString, (success) => {
        console.log('all done')
    })
    res.status(201).json({message:'done'})
})

module.exports = {app, port};