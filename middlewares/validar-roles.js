const {response}= require('express');

const esAdminRol=(req, res=response, next)=>{

    if(!req.usuario){
        return res.status(500).json({
            msg: 'se quiere verificar rol sin validar token antes'
        })
    }

    const{rol, nombre}= req.usuario;
    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador- NO puede hacer esto`
        })
    }
    
    

    next();
}

const tieneRol=(...roles )=>{

    return (req, res=response, next)=>{
        //console.log(roles);

        if(!req.usuario){
            return res.status(500).json({
                msg: 'se quiere verificar rol sin validar token antes'
            })
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `el servicio requiere uno de estos ${roles}`
            })
        }
        
        next();

    }

}


module.exports={
    esAdminRol,
   tieneRol
}