import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  getUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', addUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);
router.get('/me', protect, getUser);

export default router;
