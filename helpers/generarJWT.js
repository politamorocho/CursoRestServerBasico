const jwt = require('jsonwebtoken');
require('dotenv').config();


//uid : identificador unico del usuario
//generar token
const generarJWT = (uid = ' ') => {

    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETEORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('no se genero JWT')
            } else {
                resolve(token);
            }
        });
    })


}


module.exports = {
    generarJWT
}