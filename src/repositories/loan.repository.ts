import { Loan as LoanModel } from "../models/index.js";

export async function bookHasLoans(bookId: number): Promise<boolean> {
    const loan = await LoanModel.findOne(
        {
            where:
            {
                book_id: bookId
            }
        });
        return !!loan
    }




