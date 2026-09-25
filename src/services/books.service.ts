import * as BooksRepository from '../repositories/books.repository.js';
import { getAuthorByID } from '../repositories/authors.repository.js';
import { NewBook, Book, BookFilters } from '../types/books.js';
import { bookHasLoans } from '../repositories/loan.repository.js';
import { Page } from '../types/common.js';
import { Request } from 'express'


export async function getBookByIdService(id: number):Promise<Book|"BOOK_NOT_FOUND" > {
    const book = await BooksRepository.getBookByID(id);
    if (!book) return 'BOOK_NOT_FOUND'
    return book;
}


export async function createBookService(bookData: NewBook): Promise<NewBook | "AUTHOR_NOT_FOUND"> {
    const author = await getAuthorByID(bookData.author_id);
    if (!author) return "AUTHOR_NOT_FOUND"

    const newBook =await BooksRepository.insertBook(bookData);
    return newBook[0];
}

export async function listBooksService(query: Request['query']): Promise<Page<Book>> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const available = query.available === undefined ? undefined : query.available === 'true';

    const { rows } = await BooksRepository.getBooks({ available }, { page, limit });

    return { data: rows, page, limit };
}


export async function replaceBookService(bookData: NewBook, id: number): Promise< | "AUTHOR_NOT_FOUND" | "BOOK_NOT_FOUND" | NewBook> {
    const author = await getAuthorByID(bookData.author_id);
    if (!author) return 'AUTHOR_NOT_FOUND'
    const book = await BooksRepository.getBookByID(id);
    if (!book) return 'BOOK_NOT_FOUND';

    const replacedBook = await BooksRepository.putBook(bookData, id);
    return replacedBook[0];
}

export async function updateBookService(bookData: { available: boolean; author_id?: number }, id: number): Promise<"AUTHOR_NOT_FOUND" | "BOOK_NOT_FOUND" | Book> {    
    const book = await BooksRepository.getBookByID(id);
    if (!book) return 'BOOK_NOT_FOUND';

    if (bookData.author_id !== undefined) {
        const author = await getAuthorByID(bookData.author_id);
        if (!author) return 'AUTHOR_NOT_FOUND';
    }

    const updatedBook = await BooksRepository.patchBook(bookData, id);
    return updatedBook[0];
}

export async function deleteBookService(id:number):Promise<"BOOK_NOT_FOUND" | "DELETED"|"BOOK_HAS_LOANS" >{
    const book = await BooksRepository.getBookByID(id);
    if (!book) return 'BOOK_NOT_FOUND';
    const hasLoans = await bookHasLoans(id);
    if (hasLoans) return "BOOK_HAS_LOANS";
    await BooksRepository.deleteBook(id);
    return "DELETED";
}