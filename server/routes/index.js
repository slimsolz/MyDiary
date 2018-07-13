import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

// homepage
router.get('/', (req, res, next) => {
  res.json({
    status: 'success',
    message: 'Welcome to my diary app'
  });
});

router.post('/users', UserController.createUser);

export default router;
