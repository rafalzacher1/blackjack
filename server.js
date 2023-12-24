// server.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve static files from the 'engine' directory
app.use('/scripts', express.static('scripts'));

// Serve static files from the 'cards' directory
app.use('/cards', express.static('cards'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'interface.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
