const express = require('express');
const cors=require('cors');
require('dotenv').config();



class Server{

    constructor(){
        this.app = express();
        this.port=process.env.PORT
        this.usersPath='/api/users'

        //middlewares
        this.middlewares();

        this.routes();
      //  this.listen();
    }

    middlewares(){

        //cors
        this.app.use(cors());

        //parseo y lectura del body
        this.app.use(express.json());
        //directorio publico
       this.app.use(express.static('public'));
       

    }

    routes(){
        this.app.use(this.usersPath, require('../routes/user'))
           
    }

    listen(){
        this.app.listen(this.port);
    }

}

module.exports=Server;