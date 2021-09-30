const {response} = require('express');
const {Producto} = require('../models')

const crearProducto= async (req, res=response)=>{

    const {estado, usuario, ...body}=req.body;
    const productoDB= await Producto.findOne({nombre:body.nombre});

    if(productoDB){
        return res.status(400).json({
            msg: `la Producto ${productoDB.nombre} ya existe`
        })
    }

    //generar la data a guardar
    const data={
        ... body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    //grabar la info en db
    const producto = new Producto(data);
   await producto.save();

   res.status(201).json(producto);

}


//obtenerProductos - Paginados- total -metodo populate.
const obtenerProductos = async (req, res=response)=>{

    // const query = req.query;
    const { limite = 5, desde = 0 } = req.query;

    //query para extraer solo los que tienen estado true
    const query={estado:true};
    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments();
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        productos
        
    })
}

//obtenerProducto regresa objetos 
const obtenerProductoID = async (req, res=response)=>{

    const {id}= req.params;
    const producto = await Producto.findById(id)
                    .populate('usuario', 'nombre')
                    .populate('categoria', 'nombre')
    res.json(producto);

}

//actualizarProducto recibir nombre.
const actualizarProducto= async (req, res=response)=>{
    const {id}= req.params;
    const {estado, usuario, ...data} = req.body;
    
    if(data.nombre){
        data.nombre= data.nombre.toUpperCase();
    }
    

    //usuario dueño del token 
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id,data, {new:true}).populate('usuario', 'nombre');
    res.json(producto);


}

//borrarProducto - estado false
const borrarProducto = async (req, res=response)=>{
    const {id}= req.params;
    const productoBorrado= await Producto.findByIdAndUpdate(id, {estado:false}, {new:true});
    res.json(productoBorrado);
}



module.exports={
    crearProducto,
    obtenerProductos,
    obtenerProductoID,
    actualizarProducto,
    borrarProducto
}