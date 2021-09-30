const { response } = require('express');
const {ObjectId} = require ('mongoose').Types;
const {Usuario, Categoria, Producto} = require ('../models')

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'productosPorCategoria',
    'roles'
];

const buscarUsuarios = async (termino ='', res = response)=>{
    
    //si es, regress true
    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID){
        const usuario= await Usuario.findById(termino);
        return res.json({
           results: (usuario) ? [usuario] :[ ]
        })
    }


    const regex= new RegExp(termino, 'i');
    const usuarios= await Usuario.find({
        $or: [{nombre: regex},{correo: regex}],
       $and: [{estado: true}]
    });

    const usuarios2= await Usuario.count({
        $or: [{nombre: regex},{correo: regex}],
       $and: [{estado: true}]
    });
    res.json({
        total: usuarios2,
        results: usuarios

     })
}

const buscarCategorias = async (termino ='', res = response)=>{
    
    //si es, regress true
    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID){
        const categoria= await Categoria.findById(termino);
        return res.json({
           results: (categoria) ? [categoria] :[ ]
        })
    }


    const regex= new RegExp(termino, 'i');
    const categorias= await Categoria.find({
        $or: [{nombre: regex, estado: true}],
    });

    const categorias2=await Categoria.count({
        $or: [{nombre: regex, estado: true}],
    });

    res.json({
        total: categorias2,
        results: categorias

     })
}

const buscarProductos = async (termino ='', res = response)=>{
    
    //si es, regress true
    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID){
        const producto= await Producto.findById(termino)
        .populate('categoria', 'nombre');
        //.populate('usuario', 'nombre');
        return res.json({
           results: (producto) ? [producto] :[ ]
        })
    }


    const regex= new RegExp(termino, 'i');
    const productos= await Producto.find({nombre: regex, estado: true})
            .populate('categoria', 'nombre');
    //.populate('usuario', 'nombre');

    const productos2=await Producto.count({nombre: regex, estado: true});

    res.json({
        total: productos2,
        results: productos

     })
}

const buscarProductosPorCategoria = async (termino ='', res = response)=>{
    
    //si es, regress true
    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID){
        const categoria= await Categoria.findById(termino);
        return res.json({
           results: (categoria) ? [categoria] :[ ]
        })
    }


    const regex= new RegExp(termino, 'i');

    const categoria= await Categoria.findOne({
        nombre:regex,
        estado: true
    })

    const productos= await Producto.find({
        estado:true,
        $and: [{categoria: categoria._id}]
        
    }).populate('categoria', 'nombre');
    //.populate('usuario', 'nombre');

 
    res.json({
        results: productos

     })
}



//realizar busquedas
const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msj: `las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);

            break;
        case 'categorias':
            buscarCategorias(termino, res);
            break;

        case 'productos':
            buscarProductos(termino, res);
            break;

            case 'productosPorCategoria':
                buscarProductosPorCategoria(termino, res);
                break;
        default:
            return res.status(500).json({
                msj: 'no hay mas busquedas'
            })


    }

}


module.exports = {
    buscar
}