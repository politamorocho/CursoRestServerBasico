//crear  urls de direccion de carpetas
const path = require('path');
const fs = require ('fs');
const { response } = require('express');
const { fileUpload } = require('express-fileupload');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { subirArchivo } = require('../helpers')
const { Usuario, Producto } = require('../models')


const cargarArchivos = async (req, res = response) => {

    // console.log('req.files >>>', req.files); // eslint-disable-line

    try {
        //  const pathCompleto= await subirArchivo(req.files, ['txt', 'md'], 'textos');
        const pathCompleto = await subirArchivo(req.files, undefined, 'imgs');

        res.json({
            path: pathCompleto
        })
    } catch (error) {
        res.status(400).json({
            msg: 'no se pudo, no señor'
        })
    }
}

const actualizarImagen = async (req, res = response) => {

    const { coleccion, id } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `no existe usuario con id ${id}`
                })
            }

            break;

        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `no existe producto con id ${id}`
                })
            }

            break;

        default:
            return res.status(500).json({msg: 'se me olvido validar esto'})
    }

    //limpiar imagenes previas
    if(modelo.img){
        //hay que borrar la imagen del servidor
        const pathImagen= path.resolve( __dirname,'../../uploads', coleccion, modelo.img );
        if ( fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen)
        }
    }
    

     const nombre = await subirArchivo(req.files, undefined, coleccion);

     modelo.img = nombre;

     await modelo.save();

    res.json({modelo})
}

const mostrarImagen = async (req, res = response)=>{

    const { coleccion, id } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `no existe usuario con id ${id}`
                })
            }

            break;

        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `no existe producto con id ${id}`
                })
            }

            break;

        default:
            return res.status(500).json({msg: 'se me olvido validar esto'})
    }

    //limpiar imagenes previas
    if(modelo.img){
        //hay que borrar la imagen del servidor
        const pathImagen= path.resolve( __dirname,'../../uploads', coleccion, modelo.img );
        if ( fs.existsSync(pathImagen)){
          return  res.sendFile(pathImagen)
        } 
        
    }
        const pathImagen2= path.join( __dirname,'../assets/no-image.jpg' );
         res.sendFile(pathImagen2)
        
 //res.json({msg: 'falta placeholder' })
}


const actualizarImagenCloudinary = async (req, res = response) => {

    const { coleccion, id } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `no existe usuario con id ${id}`
                })
            }

            break;

        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `no existe producto con id ${id}`
                })
            }

            break;

        default:
            return res.status(500).json({msg: 'se me olvido validar esto'})
    }

    //limpiar imagenes previas
    if(modelo.img){
        //hay que borrar la imagen del servidor
        //obtener el nombre
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');
        
        //borrar de cloudinary
        cloudinary.uploader.destroy(public_id);

       
    }
    
    //subir archivos a cloudinary -  imagenes
    const {tempFilePath} = req.files.archivo;

    //se obtiene el enlace de dondese guarda 
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath)

    //se asigna al atributo en el modelo
modelo.img = secure_url;

//se aguarda en bd
    await modelo.save();

    res.json({modelo})
}


module.exports = {
    cargarArchivos,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}