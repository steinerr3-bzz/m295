express = require("express")
path = require("path")
fs = require("fs").promises

const app = express()

app.get('/', (request, response) => {
    response.sendFile('./index.html', { root: __dirname })
})

app.get('/now', (request, response) => {
    const now = new Date()
    response.send(now.toString())
})

app.get('/zli', (request, response) => {
    // response.redirect("https://www.zli.ch")
    response.header("location", "https://www.zli.ch").status(302).send()
})

app.get('/name', (request, response) => {
    const list = ["Saalim", "Lorenzo", "Elias", "Salih", "Ben", "Milan",
        "Timo", "Cyril", "Leonardo", "MÃ¡rkÃ³", "DÃ¡niel", "Leandro", "Zeno",
        "Florin", "Sebastian", "Josiah", "Diego", "Ryan"]

    const zahl = Math.floor(Math.random() * list.length)
    response.send(list[zahl])
})

app.get('/html', (request, response) => {
    // response.sendFile('./html.html', { root: __dirname })
    // response.sendFile('/workspaces/24-3650/3_3/html.html')
    response.sendFile(path.join(__dirname, './html.html'))
})

app.get('/image', async (request, response) => {
    // response.sendFile('./html.jpg', { root: __dirname })
    const image = await fs.readFile(path.join(__dirname, './html.jpg'))
    response.header('content-type', 'image/jpg').send(image)
})

app.get('/teapot', (request, response) => {
    response.status(418).send()
})

app.get('/user-agent', (request, response) => {
    const agent = request.headers['user-agent']
    response.send(agent)
})

app.get('/secret', (request, response) => {
    response.sendStatus(403)
})

app.get('/xml', (request, response) => {
    response.sendFile('./xml.xml', { root: __dirname })
})

app.get('/me', (request, response) => {
    const me = {
        name: "Diego Steiner",
        place: "Uster",
        profession: "Software Engineer",
        age: 36,
        eyeColor: "#473d30"
    }
    // response.json(me)
    response.json(me)
})

app.listen(3000)