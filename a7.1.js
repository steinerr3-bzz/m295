const express = require('express');
const basicAuth = require('basic-auth');

const app = express();
const port = process.env.PORT || 3000;

// Optional: Benutzername und Passwort aus Umgebungsvariablen laden
const AUTH_USER = process.env.AUTH_USER || 'zli';
const AUTH_PASS = process.env.AUTH_PASS || 'zli1234';

// Authentifizierungsfunktion
const auth = (req, res, next) => {
    const user = basicAuth(req);
    if (!user || user.name !== AUTH_USER || user.pass !== AUTH_PASS) {
        res.set('WWW-Authenticate', 'Basic realm="401"');
        res.status(401).send('Zugriff verweigert');
        return;
    }
    next();
};

// Öffentlicher Endpunkt
app.get('/public', (req, res) => {
    res.send('Dies ist ein öffentlicher Bereich.');
});

// Privater Endpunkt
app.get('/private', auth, (req, res) => {
    res.send('Dies ist ein privater Bereich.');
});

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
