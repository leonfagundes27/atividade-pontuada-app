import mongoose from 'mongoose';

const connectDatabase = () => {
    console.log('Conectando com o banco de dados... ⌛');

    mongoose.connect(process.env.MONGODB_URI)
   .then(() => console.log('MongoDB Atlas Conectado com sucesso! ✅'))
   .catch((error) => console.log(error))
}

export default connectDatabase;