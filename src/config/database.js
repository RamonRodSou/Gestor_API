import 'dotenv/config';
import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config();

const PRIVATE_API_URL='mongodb+srv://ramonrodsouza:88pCJJUGaSiIw4Z2@gestor.ax8ez.mongodb.net/?retryWrites=true&w=majority&appName=Gestor'

const connectDatabase = async () => {
 try {
  await mongoose.connect(process.env.PRIVATE_API_URL)
  console.log('Conectado ao MongoDB Atlas');
 } catch (error) {
  console.error('Erro ao conectar ao MongoDB', error);
  process.exit(1);
 }
};

export default connectDatabase;
