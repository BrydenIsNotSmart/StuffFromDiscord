require("dotenv").config();
 
module.exports = {
    port: 80,
    mongodbURI: process.env.mongodbURI,
    clients: {
        manager: {
         id: "1023796527841419325",
         token: process.env.managerToken
        },
        servers: {
         id: "1023799167195287562",
         token: process.env.serversToken
        }
    }
}