const express = require('express');
const app = new express();
const path = require('path');

app.use(express.static(__dirname + '/public'));

app.get('/api/1', (req, res) => {
    res.json(['text', 'date']);
});

app.listen(3000, () => {
    console.log('Server started.');
});