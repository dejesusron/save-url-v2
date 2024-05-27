import express from 'express';
import {
  getLinks,
  addLink,
  getLink,
  updateLink,
  deleteLink,
} from '../controllers/linkController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getLinks);
router.post('/', protect, addLink);
router.get('/:id', protect, getLink);
router.put('/:id', protect, updateLink);
router.delete('/:id', protect, deleteLink);

export default router;
