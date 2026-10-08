import { Request, Response } from 'express';
import { postCreateBookService, deleteBookService, getBookByIdService, putBookService } from '../services/books.service.js';

export async function getBookByIdController(req: Request, res: Response) {
const bookId = Number(req.params.id);

if (!Number.isInteger(bookId) || bookId <= 0) {
    return res.status(400).json({ error: "The ID must be a positive integer." });
}

  try {
    const book = await getBookByIdService(bookId);

    if (!book) {
    return res.status(404).json({ error: "Book not found." });
    }

    return res.status(200).json({ data: book });
    } catch {
    return res.status(500).json({ error: "Internal server error." });
  }
}


// export async function listBooksController(req: Request, res: Response) {
//     res.json({data:(await listBooksService(req.query))});
// } -->(get faltante)

export async function postCreateBookController(req: Request, res: Response) {
  const { title, year, author_id } = req.body;

  if (
    typeof title !== "string" ||
    !Number.isInteger(year) ||
    !Number.isInteger(author_id)
  ) {
    return res.status(400).json({
      error: "Hubo un error en los datos.",
    });
  }

  try {
    const book = await postCreateBookService ({ title, year, author_id });
    return res.status(201).json({ data: book });
  } catch {
    return res.status(500).json({ error: "Could not create the book." });
  }
}

export async function putBookController(req: Request, res: Response) {
  const bookId = Number(req.params.id);
  const { title, year, author_id } = req.body;

  if (!Number.isInteger(bookId) || bookId <= 0) {
    return res.status(400).json({ error: "The ID must be a positive integer." });
  }

  if (
    typeof title !== "string" ||
    title.trim() === "" ||
    !Number.isInteger(year) ||
    year <= 0 ||
    !Number.isInteger(author_id) ||
    author_id <= 0
  ) {
    return res.status(400).json({
      error: "There was an error with the data provided.",
    });
  }

  try {
    const book = await putBookService(bookId, { title, year, author_id });

    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    return res.status(200).json({ data: book });
  } catch {
    return res.status(500).json({ error: "Could not update the book." });
  }
}


export async function deleteBookController(req: Request, res: Response) {
  const bookId = Number(req.params.id);

  if (!Number.isInteger(bookId) || bookId <= 0) {
    return res.status(400).json({ error: "The ID must be a positive integer." });
  }

  try {
    const deleted = await deleteBookService(bookId);

    if (!deleted) {
      return res.status(404).json({ error: "Book not found." });
    }
  } catch {
    return res.status(500).json({ error: "Could not delete the book." });
  }

  return res.status(200).json({ message: "Book deleted successfully." });
}