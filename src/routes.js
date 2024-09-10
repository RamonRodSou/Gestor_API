import { Router } from 'express';
import UserController from './controllers/UserController';

const router = Router();

router.get('/teste', (req, res) => {
  
  return res.json({ok: true})
});



router.post('/users', UserController.store);



router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete); 

export default router;

