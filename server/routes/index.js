import express from 'express';
import UserController from '../controllers/userController';
/* import EntryController from '../controllers/entryController';
import Middleware from '../middlewares/index'; */

const router = express.Router();

// homepage
router.get('/', (req, res, next) => {
  res.json({
    status: 'success',
    message: 'Welcome to My Diary App'
  });
});

/* user */
router.post('/auth/signup', UserController.signup);

router.get('*', (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: '404 Page not found'
  });
});

router.post('*', (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: '404 Page not found'
  });
});

router.put('*', (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: '404 Page not found'
  });
});

router.delete('*', (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: '404 Page not found'
  });
});

export default router;
