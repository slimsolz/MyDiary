import express from 'express';
import UserController from '../controllers/userController';
import EntryController from '../controllers/entryController';
import Middleware from '../middlewares/index';

const router = express.Router();

// homepage
router.get('/', (req, res, next) => {
  res.json({
    status: 'success',
    message: 'Welcome to My Diary App'
  });
});

/* user */
router.post('/auth/signup', Middleware.validateUser, UserController.signup);
router.post('/auth/signin', Middleware.validateUser, UserController.signin);
router.get('/account/me', Middleware.isLoggedIn, UserController.viewProfile);
router.put('/account/me', Middleware.isLoggedIn, UserController.updateProfile);

/* entries */
router.post('/entries', Middleware.isLoggedIn, Middleware.validateEntry, EntryController.addEntry);
router.put('/entries/:id', Middleware.isLoggedIn, Middleware.validateParams, Middleware.validateEntry, EntryController.updateEntry);
router.delete('/entries/:id', Middleware.isLoggedIn, Middleware.validateParams, EntryController.deleteEntry);
router.get('/entries', Middleware.isLoggedIn, EntryController.getAllEntries);

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
