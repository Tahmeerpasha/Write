import Router from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from '../controllers/category.controller.js';

const router = Router();

router.post('/', verifyJWT, createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/:id', verifyJWT, updateCategory);
router.delete('/:id', verifyJWT, deleteCategory);

export default router;