const express = require('express')
const router = express.Router()
const { MongoClient } = require('mongodb')
const MONGO_URL = "mongodb://localhost:27017"
let taskdb
let hostcol

MongoClient.connect(MONGO_URL, (err, client) => {
  if (err) throw err;

  taskdb = client.db("taskdb")
  hostcol = taskdb.collection("hostcol")
})
    
router.post("/host", (req, res) => {
    console.log(req.body)

    hostcol.insertOne(req.body, (err, results) => {
        if(err) throw err
        console.log(results)
    })
    //res.status(200).json(req.body)
    res.redirect('choice.html');
})
module.exports = router