import { Router } from 'express';
import authMiddleware from './app/middlewares/auth'
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';

const router = Router();

router.get('/teste', (req, res) => {
  
  return res.json({ok: true})
});

router.post('/users', UserController.store);
router.post('/sessions', SessionController.store);




// Todas rotas abaixos, tem que esta autenticadas
router.use(authMiddleware);
router.get('/users', UserController.index);
router.get('/users/', UserController.show);
router.put('/users/', authMiddleware,  UserController.update);
router.delete('/users/', UserController.delete); 



export default router;

