const { v4: uuidv4 } = require('uuid');
const path = require('path');



const subirArchivo = (files, extensionValida = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1]
        // console.log(nombreCortado);

        //validar extension
        if (!extensionValida.includes(extension)) {
            return reject(`la extension . ${extension} no es valida. Las permitidas son ${extensionValida}`)

        }


        const nombreTemporal = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemporal);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve(uploadPath)

        });

    });


}










module.exports = {
    subirArchivo
}