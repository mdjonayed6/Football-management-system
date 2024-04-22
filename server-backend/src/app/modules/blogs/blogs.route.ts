import express from 'express';
import { blogsController } from './blogs.controller';
const router = express.Router();

router.get('/', blogsController.getBlogs)
router.post('/', blogsController.createBlog)
router.put('/:id', blogsController.updateBlog)
router.get('/recent', blogsController.recentBlogs)
router.get('/single/:id', blogsController.getSingleBlog)
router.delete('/:id', blogsController.deleteBlog)
router.get('/single-blog/:id', blogsController.singleBlog)

export const blogsRoutes = router