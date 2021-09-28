const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewurlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
            
        },
        console.log('bd online')
    );
        
    } catch (error) {
        console.log(error);
        throw new Error('error al levanatr la bd');
    }
}





module.exports = {

    dbConnection
}