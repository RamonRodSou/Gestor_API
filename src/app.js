import express from 'express';
import cors from 'cors';
import routes from './routes';
import connectDatabase from './config/database'; 

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

const startServer = async () => {
  try {

    await connectDatabase();

    const app = new App().server;
    const PORT = process.env.PORT2;
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
};

startServer();

export default new App().server