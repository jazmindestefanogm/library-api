import { Router, Request, Response, NextFunction } from 'express';
import { findById } from '../repositories/books.repository.js'; 

const app = Router();

app.get('/books/:id', async (req, res) => { 
    const { id } = req.params; 
    const items = await findById(Number(id))
    res.json(items); 
});
