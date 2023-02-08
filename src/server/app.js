const Express = require('express');
const fs = require('node:fs');
const path = require('node:path');
const { config } = require('node:process');
const app = Express();

app.disable('x-powered-by');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://fromdiscord.tk');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    if (req.method === 'OPTIONS') {
        res.status(200).send();
    } else {
        next();
    }
});

global.forceSubdomain = (subdomain, execute) => {
    return (req, res, next) => {
        if (req.hostname.split('.')[0] === subdomain) {
            execute(req, res, next);
        } else {
            next();
        }
    };
};

fs.readdirSync(path.join(__dirname, `./routes`)).forEach(parent => {
    handle(path.join(__dirname, `./routes/${parent}`));

    function handle (filePath) {
        if (fs.statSync(filePath).isDirectory()) {
            filePath = filePath += '/';
            fs.readdirSync(filePath).forEach(name => {
                handle(filePath + name);
            });
        } else {
            if (filePath.endsWith('.js')) {
                app.use(require(filePath));
                console.info(`[INFO] Loaded route: ${filePath.slice(50)}.`);
            }
        }
    }
});

app.listen(global.config.port, () => {
   console.info(`[INFO] Running on port ${global.config.port}.`)
})
