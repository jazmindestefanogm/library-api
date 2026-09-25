import { Book as BookModel } from "../models/index.js";
import { Book, BookFilters, NewBook, UpdateBook,  } from "../types/books.js";
import { Pagination } from "../types/common.js";

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

export async function patchBook(bookData: { available: boolean; author_id?: number }, bookId: number) {
    const updates: Record<string, unknown> = { available: bookData.available };
    if (bookData.author_id !== undefined) updates.author_id = bookData.author_id;

    await BookModel.update(updates, { 
        where: 
        { 
            id: bookId 
        } 
    });

    const row = await BookModel.findByPk(bookId);
    return row ? [row.toJSON()] : [];
}
export async function putBook(bookData: NewBook, bookId: number): Promise<Book[]> {
    const [affectedCount] = await BookModel.update(
    {
        title: bookData.title, 
        year: bookData.year, 
        author_id: bookData.author_id 
    },
    { where: { id: bookId } }
    );

    
    const row = await BookModel.findByPk(bookId);
    return row ? [row.toJSON()] : [];
}

export async function deleteBook(bookId:number){
    const deletedBook = BookModel.destroy({
            where:{
                id:bookId
            }
        })
        return deletedBook
}


export async function getBooks(filters:  BookFilters, pagination: Pagination) {
    const where: Record<string, unknown> = {};
    if (filters.available !== undefined) where.available = filters.available;

    const { rows, count } = await BookModel.findAndCountAll({
        where,
        limit: pagination.limit,
        offset: (pagination.page - 1) * pagination.limit,
        order: [['id', 'ASC']],
    });

    return { rows, count };
}


