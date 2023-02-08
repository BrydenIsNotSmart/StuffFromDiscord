const Express = require('express');
const app = Express.Router();

app.get('/', forceSubdomain('stuff', (req, res, next) => {
    res.send("Hello World")
}));

module.exports = app;