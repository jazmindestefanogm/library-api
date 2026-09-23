import { Book as BookModel } from "../models/index.js";
import { Book, NewBook, UpdateBook, BookFilters } from "../types/books.js";

export async function findById(id: number): Promise<Book | null> {
    const row = await BookModel.findByPk(id);
    return row ? row.toJSON() : null;
}