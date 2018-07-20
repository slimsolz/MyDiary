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
router.put('/user/account/:id', Middleware.validateParams, Middleware.validateProfie, UserController.updateProfile);
router.get('/user/account/:id', Middleware.validateParams, UserController.viewProfile);

/* Entry */
router.post('/entries', Middleware.validateEntry, EntryController.addEntry);
router.put('/entries/:id', Middleware.validateParams, Middleware.validateEntry, EntryController.updateEntry);
router.delete('/entries/:id', Middleware.validateParams, EntryController.deleteEntry);
router.get('/entries', EntryController.getAllEntries);
router.get('/entries/:id', Middleware.validateParams, EntryController.getEntry);

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
