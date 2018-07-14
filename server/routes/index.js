import express from 'express';
import UserController from '../controllers/userController';
import Middleware from '../middlewares/index';

const router = express.Router();

// homepage
router.get('/', (req, res, next) => {
  res.json({
    status: 'success',
    message: 'Welcome to my diary app'
  });
});

router.post('/auth/signup', Middleware.validateUser, UserController.signup);
router.post('/auth/signin', Middleware.validateUser, UserController.signin);

export default router;
