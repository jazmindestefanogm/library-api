import { Book as BookModel } from "../models/index.js";
import { Book, NewBook, UpdateBook,  } from "../types/books.js";

export async function getBookByID(id: number): Promise<Book | null> {
    const row = await BookModel.findByPk(id);
    return row ? row.toJSON() : null;
}


export async function getAllBooks(): Promise<Book[]> {
    const rows = await BookModel.findAll();
    
    return rows.map(row => row.toJSON());
}


export async function insertBook(bookData: NewBook): Promise<Book[]> {
    const row = await BookModel.create({
    title: bookData.title,
    year: bookData.year,
    author_id: bookData.author_id
    });

    return [row.toJSON()];
}

export async function patchBook(state:boolean, bookId:number) {
    const [affectedCount] = await BookModel.update(
        { available: state },
        {
            where:
            {
                id: bookId
            }
        }
    );

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


export async function getBooks(filters: any , pagination: any) {
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


export async function search(query:any) {
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 20
    const available = query.available === undefined ? undefined : query.available === 'true';

    const { rows } = await getBooks({ available }, { page, limit });

    return { data: rows,  page, limit };
}