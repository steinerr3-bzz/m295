const e = require("express");
const { response } = require("express");

express = require("express")



const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get('/now', (request, response) => {
    const timeZone = request.query.tz ?? "Europe/Zurich"
    const now = new Date();
    response.send(`Time in ${timeZone}: ${now.toLocaleString('de-CH', { timeZone: timeZone })}`)
})

app.get('/names', (request, response) => {
    response.json(names)
})

app.post('/names', (request, response) => {
    const name = request.body.name

    if (!name || name === '') {
        return response.sendStatus(422)
    } else {
        names.push(name)
        response.sendStatus(201)
    }

})

app.delete('/names', (request, response) => {
    const nameToDelete = request.query.name
    names = names.filter(name => name !== nameToDelete)
    response.sendStatus(204)
})

app.get('/secret2', (request, response) => {
    if (request.headers['authorization'] === "Basic aGFja2VyOjEyMzQ=") {
        response.send("The Cake is a lie!")
    } else {
        response.sendStatus(401)
    }
})

app.get('/chuck', async (request, response) => {
    const remoteResponse = await fetch("https://api.chucknorris.io/jokes/random")
    const data = await remoteResponse.json()
    const joke = data.value
    const name = request.query.name || "Chuck Norris"
    response.send(joke.replace("Chuck Norris", name))
})

let names = []
let me = {
    name: "Diego Steiner",
    place: "Uster",
    profession: "Software Engineer",
    age: 36,
    eyeColor: "#473d30"
}

app.get('/me', (request, response) => {
    response.json(me)
})

app.patch('/me', (request, response) => {
    const newData = request.body
    Object.assign(me, newData)
    response.json(me)
})

app.listen(3000)