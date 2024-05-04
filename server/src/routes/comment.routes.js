import Router from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { createComment, deleteComment, getCommentById, getCommentsByPostId, updateComment } from '../controllers/comment.controller.js';

const router = Router();

router.post('/:postId', verifyJWT, createComment);
router.get('/:commentId', getCommentById);
router.get('/post/:postId', getCommentsByPostId);
router.put('/:commentId', verifyJWT, updateComment);
router.delete('/:commentId', verifyJWT, deleteComment);

export default router;