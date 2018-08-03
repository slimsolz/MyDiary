import express from 'express';
import UserController from '../controllers/userController';
import EntryController from '../controllers/entryController';
import Middleware from '../middlewares/index';

const router = express.Router();

// homepage
router.get('/', (req, res) => {
  res.redirect('/api-docs');
});

/* user */
router.post('/auth/signup', Middleware.validateUser, UserController.signup);
router.post('/auth/signin', Middleware.validateUser, UserController.signin);
router.get('/account/profile', Middleware.isLoggedIn, UserController.viewProfile);
router.put('/account/profile', Middleware.isLoggedIn, Middleware.validateProfile, UserController.updateProfile);

/* entries */
router.post('/entries', Middleware.isLoggedIn, Middleware.validateEntry, EntryController.addEntry);
router.put('/entries/:id', Middleware.isLoggedIn, Middleware.validateParams, Middleware.validateEntry, EntryController.updateEntry);
router.delete('/entries/:id', Middleware.isLoggedIn, Middleware.validateParams, EntryController.deleteEntry);
router.get('/entries', Middleware.isLoggedIn, EntryController.getAllEntries);
router.get('/entries/:id', Middleware.isLoggedIn, Middleware.validateParams, EntryController.getEntry);

router.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: '404 Page not found'
  });
});

export default router;
