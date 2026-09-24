import { Router } from 'express';
import { getById, list, create, replace, update, remove } from '../controllers/book.controller.js';

const router = Router();

router.get('/', list);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', replace);
router.patch('/:id', update);
router.delete('/:id', remove);

export default router;