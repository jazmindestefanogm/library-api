import { Book as BookModel } from "../models/index.js";
import { Book, NewBook } from "../types/books.js";


export async function getBookByID(id: number): Promise<Book | null> {
    const row = await BookModel.findByPk(id);
    return row ? row.toJSON() : null;
}

export async function insertBook(bookData: NewBook): Promise<Book[]> {
    const row = await BookModel.create({
    title: bookData.title,
    year: bookData.year,
    author_id: bookData.author_id
    });

    return [row.toJSON()];
}

export async function updateBook( id: number, bookData: NewBook ): Promise<Book | null> {
  const book = await BookModel.findByPk(id);

  if (!book) {
    return null;
  }

  await book.update(bookData);
  return book.toJSON();
}

export async function deleteBook(id: number): Promise<boolean> {
  const deletedCount = await BookModel.destroy({ where: { id } });
  return deletedCount > 0; 
}