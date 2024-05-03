import Router from 'express';
import { createTag, deleteTag, getTagById, getTags, updateTag } from '../controllers/tag.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', verifyJWT, createTag);
router.get('/', getTags);
router.get('/:id', getTagById);
router.put('/:id', verifyJWT, updateTag);
router.delete('/:id', verifyJWT, deleteTag);

export default router;