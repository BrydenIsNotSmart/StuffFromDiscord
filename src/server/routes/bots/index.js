const Express = require('express');
const app = Express.Router();

app.get('/', forceSubdomain('bots', (req, res, next) => {
    res.send("Hello World")
}));

module.exports = app;