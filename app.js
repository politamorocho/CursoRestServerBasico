require('dotenv').config();

const Server = require('./models/server');


//cmdconsole.log(process.env);
const server=new Server();

server.listen();
 

