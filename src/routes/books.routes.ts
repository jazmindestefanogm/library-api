import { Router } from 'express';
import { postCreateBookController, deleteBookController, getBookByIdController, putBookController } from '../controllers/book.controller.js';

const router = Router();
router.get('/:id', getBookByIdController);
router.post("/", postCreateBookController);
router.put("/:id", putBookController);
router.delete("/:id", deleteBookController);

export default router;