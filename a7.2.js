const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.json());  // Damit Express JSON-Body aus Requests verarbeiten kann

// Konfigurieren der Session-Middleware
app.use(session({
    secret: 'geheimesWort',  // Ein Geheimschlüssel für die Verschlüsselung der Session-ID
    resave: false,           // Verhindert das erneute Speichern von Sessionen, die nicht geändert wurden
    saveUninitialized: false // Speichert keine "leeren" Sessions
}));

// POST /name: Speichert den Namen in der Session
app.post('/name', (req, res) => {
    const { name } = req.body;
    if (name) {
        req.session.name = name;
        res.status(200).send('Name gespeichert.');
    } else {
        res.status(400).send('Name ist erforderlich.');
    }
});

// GET /name: Gibt den in der Session gespeicherten Namen zurück
app.get('/name', (req, res) => {
    if (req.session.name) {
        res.status(200).send(`Gespeicherter Name: ${req.session.name}`);
    } else {
        res.status(404).send('Kein Name in der Session gefunden.');
    }
});

// DELETE /name: Löscht den Namen aus der Session
app.delete('/name', (req, res) => {
    if (req.session.name) {
        delete req.session.name;
        res.status(200).send('Name gelöscht.');
    } else {
        res.status(404).send('Kein Name zum Löschen gefunden.');
    }
});

// Server starten
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
