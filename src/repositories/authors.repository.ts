import { Author as AuthorModel } from "../models/index.js";
import { Author  } from "../types/author.js";



export async function getAuthorByID(id: number): Promise<Author | null> {
    const row = await AuthorModel.findByPk(id);
    return row ? row.toJSON() : null;
}