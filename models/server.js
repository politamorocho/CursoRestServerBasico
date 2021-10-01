const express = require('express');
const cors = require('cors');
const fileUpload= require('express-fileupload');

const { dbConnection } = require('../database/config');
require('dotenv').config();



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/users',
            uploads: '/api/uploads'
        }


        //conectar DB
        this.conectarDB();

        //middlewares
        this.middlewares();

        this.routes();
        //this.listen();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        //cors
        this.app.use(cors());

        //parseo y lectura del body
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'));

        //arcchivos fileUpload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));


    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'))  
        this.app.use(this.paths.buscar, require('../routes/buscar'))     
        this.app.use(this.paths.categorias, require('../routes/categorias'))
        this.app.use(this.paths.productos, require('../routes/productos'))
        this.app.use(this.paths.usuarios, require('../routes/user'))
        this.app.use(this.paths.uploads, require('../routes/uploads'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;