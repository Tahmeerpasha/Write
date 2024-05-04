import Router from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { createBlog, getBlogById, getBlogs, updateBlog, deleteBlog } from '../controllers/blog.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.post('/', verifyJWT, upload.array('assets'), createBlog);
router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.put('/:id', verifyJWT, upload.array('assets'), updateBlog);
router.delete('/:id', verifyJWT, deleteBlog);

export default router;