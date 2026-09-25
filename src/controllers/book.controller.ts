import { Request, Response } from 'express';
import { createBookService, deleteBookService, getBookByIdService, listBooksService, replaceBookService, updateBookService } from '../services/books.service.js';

export async function getById(req: Request, res: Response) {
    const result = await getBookByIdService(Number(req.params.id));
    if (result === "BOOK_NOT_FOUND") return res.status(404).json({ error: "Book not found" });
    return res.json(result);
}
export async function list(req: Request, res: Response) {
    res.json(await listBooksService(req.query));
}

export async function create(req: Request, res: Response) {
    const result = await createBookService(req.body);
    if (result === "AUTHOR_NOT_FOUND") return res.status(404).json({ error: "Author not found" });
    res.status(201).json(result);
}

export async function replace(req: Request, res: Response) {
    const result = await replaceBookService(req.body, Number(req.params.id));
    if (result === "BOOK_NOT_FOUND") return res.status(404).json({ error: "Book not found" });
    if (result === "AUTHOR_NOT_FOUND") return res.status(404).json({ error: "Author not found" });
    res.status(200).json(result);
}

export async function update(req: Request, res: Response) {
    const result = await updateBookService(req.body, Number(req.params.id));
    if (result === "BOOK_NOT_FOUND") return res.status(404).json({ error: "Book not found" });
    if (result === "AUTHOR_NOT_FOUND") return res.status(404).json({ error: "Author not found" });

    res.status(200).json(result);
}
export async function remove(req: Request, res: Response) {
    const result = await deleteBookService(Number(req.params.id));
    if (result === "BOOK_NOT_FOUND") return res.status(404).json({ error: "Book not found" });
    if (result === "BOOK_HAS_LOANS") return res.status(409).json({ error: "Book has loans" });
    res.status(204).send();
}