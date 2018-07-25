import express from 'express';
import UserController from '../controllers/userController';
import EntryController from '../controllers/entryController';
import Middleware from '../middlewares/index';

const router = express.Router();

// homepage
router.get('/', (req, res, next) => {
  res.json({
    status: 'success',
    message: 'Welcome to my diary app'
  });
});

/* user */
router.post('/auth/signup', Middleware.validateUser, UserController.signup);

/* Entry */
router.post('/entries', Middleware.validateEntry, EntryController.addEntry);
router.put('/entries/:id', Middleware.validateParams, Middleware.validateEntry, EntryController.updateEntry);
router.delete('/entries/:id', Middleware.validateParams, EntryController.deleteEntry);
router.get('/entries', EntryController.getAllEntries);
router.get('/entries/:id', Middleware.validateParams, EntryController.getEntry);

export default router;
