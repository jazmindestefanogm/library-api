import { deleteBook, getBookByID, insertBook, updateBook} from '../repositories/books.repository.js';
import {  Book, NewBook, } from '../types/books.js';


export async function getBookByIdService(id: number) {
    return getBookByID(id);
}

export async function postCreateBookService(bookData: NewBook): Promise<Book> {
    const [book] = await insertBook(bookData);
    return book;
}

export async function putBookService( id: number, bookData: NewBook ): Promise<Book | null> {
  return updateBook(id, bookData);
}

export async function deleteBookService(id: number): Promise<boolean> {
  return deleteBook(id);
}


