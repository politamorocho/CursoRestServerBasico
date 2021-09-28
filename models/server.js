const express = require('express');
const cors=require('cors');
const { dbConnection } = require('../database/config');
require('dotenv').config();



class Server{

    constructor(){
        this.app = express();
        this.port=process.env.PORT
        this.usersPath='/api/users'
        this.authPath='/api/auth'

        //conectar DB
        this.conectarDB();

        //middlewares
        this.middlewares();

        this.routes();
       //this.listen();
    }

    async conectarDB(){
        await dbConnection();
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
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usersPath, require('../routes/user'))
        
           
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports=Server;