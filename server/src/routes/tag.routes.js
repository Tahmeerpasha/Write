import Router from 'express';
import { createTag, deleteTag, getTagById, getTags, updateTag } from '../controllers/tag.controller.js';

const router = Router();

router.post('/', createTag);
router.get('/', getTags);
router.get('/:id', getTagById);
router.put('/:id', updateTag);
router.delete('/:id', deleteTag);

export default router;