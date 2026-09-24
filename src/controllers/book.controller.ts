import { Request, Response } from 'express';
import {getBookByID,insertBook,patchBook,putBook,deleteBook,search,} from '../repositories/books.repository.js';

export async function getById(req: Request, res: Response) {
    const book = await getBookByID(Number(req.params.id));
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
}

export async function list(req: Request, res: Response) {
    res.json(await search(req.query));
}

export async function create(req: Request, res: Response) {
    const result = await insertBook(req.body);
    res.status(201).json(result[0]);
}

export async function replace(req: Request, res: Response) {
    const result = await putBook(req.body, Number(req.params.id));

    if (result.length === 0) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(result[0]);
}

export async function update(req: Request, res: Response) {
    const result = await patchBook(req.body.available, Number(req.params.id));
    if (result.length === 0) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(result[0]);
}

export async function remove(req: Request, res: Response) {
    const deleted = await deleteBook(Number(req.params.id));

    if (!deleted) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.status(204).send();
}