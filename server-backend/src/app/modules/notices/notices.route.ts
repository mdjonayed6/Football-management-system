import express from 'express';
import { noticeController } from './notices.controller';

const router = express.Router();

router.get('/', noticeController.getNotice)
router.post('/', noticeController.createNotice)
router.delete('/:id', noticeController.deleteNotice)

export const noticeRoutes = router