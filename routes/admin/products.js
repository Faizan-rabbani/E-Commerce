import express from 'express';
import { validationResult } from 'express-validator';
const router = express.Router();
import productRepo from '../../repositories/products.js'
import productNewTemplate from '../../views/admin/products/new.js'
import validators from './validators.js';

router.get('/admin/product', (req,res) => {

})

router.get('/admin/product/new', (req,res) => {
    res.send(productNewTemplate())
})

router.post('/admin/product/new',[validators.requireTitle,validators.requirePrice], (req,res) => {
    const errors = validationResult(req)
    console.log(errors)

    res.send('submitted')
})

export default router;