const {response} = require('express');
const {Categoria} = require('../models')

const crearCategoria= async (req, res=response)=>{

    const nombre=req.body.nombre.toUpperCase();
    const categoriaDB= await Categoria.findOne({nombre});

    if(categoriaDB){
        return res.status(400).json({
            msg: `la categoria ${categoriaDB} ya existe`
        })
    }

    //generar la data a guardar
    const data={
        nombre,
        usuario: req.usuario._id
    }

    //grabar la info en db
    const categoria = new Categoria(data);
   await categoria.save();

   res.status(201).json(categoria);

}


//obtenercategorias - Paginados- total -metodo populate.
const obtenerCategorias = async (req, res=response)=>{

    // const query = req.query;
    const { limite = 5, desde = 0 } = req.query;

    //query para extraer solo los que tienen estado true
    const query={estado:true};
    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments();
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        categorias
        
    })
}

//obtenercategoria regresa objetos 
const obtenerCategoriaID = async (req, res=response)=>{

    const {id}= req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');
    res.json(categoria);

}

//actualizarCategoria recibir nombre.
const actualizarCategoria= async (req, res=response)=>{
    const {id}= req.params;
    const {estado, usuario, ...data} = req.body;
    
    data.nombre= data.nombre.toUpperCase();

    //usuario dueño del token 
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id,data, {new:true}).populate('usuario', 'nombre');
    res.json(categoria);


}

//borrarcategoria - estado false
const borrarCategoria = async (req, res=response)=>{
    const {id}= req.params;
    const categoriaBorrada= await Categoria.findByIdAndUpdate(id, {estado:false}, {new:true});
    res.json(categoriaBorrada);
}



module.exports={
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaID,
    actualizarCategoria,
    borrarCategoria
}