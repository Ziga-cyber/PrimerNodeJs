const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }))
app.use(cors())

let knjige = [{ id: 0, avtor: "Avtor knjige", naslov: "Naslov knjgie", isbn: 12435678 }, { id: 1, avtor: "Avtor knjige", naslov: "Naslov knjgie", isbn: 12435678 }]

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/vseKnjige', (req, res) => {
    console.log("Test")
    res.json(knjige)
})

app.get('/knjiga/:id', (req, res) => {
    let id = req.params.id
    let poslano = false

    for (let i = 0; i < knjige.length; i++) {
        if (knjige[i].id == id) {
            res.json(knjige[i])
            poslano = true;
        }
    }

    if (!poslano) {
        res.json("Ta knjiga ne obstaja")
    }
})

app.post('/shraniKnjigo', (req, res) => {
    let knjiga = {
        id: knjige.length + 1,
        naslov: req.body.naslov,
        avtor: req.body.avtor,
        isbn: req.body.isbn
    }

    knjige.push(knjiga)
    res.status(200).json(knjiga)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})