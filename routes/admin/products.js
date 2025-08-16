import express from "express";
import multer from "multer";

import middlewares from './middlewares.js'
import productRepo from "../../repositories/products.js";
import productNewTemplate from "../../views/admin/products/new.js";
import productIndexTemplate from "../../views/admin/products/index.js"
import productEditTemplate from "../../views/admin/products/edit.js"
import validators from "./validators.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
router.get("/admin/products", middlewares.requireAuth,async (req, res) => {
  const products = await productRepo.getAll()
  res.send(productIndexTemplate(products))
});

router.get("/admin/products/new", middlewares.requireAuth ,(req, res) => {
  res.send(productNewTemplate());
});

router.post(
  "/admin/product/new",
   middlewares.requireAuth,
   upload.single("image"),
  [validators.requireTitle, validators.requirePrice],
  middlewares.handleErrors(productNewTemplate),
  async(req, res) => {
    const image = req.file.buffer.toString('base64')
    const {title, price} = req.body
    await productRepo.create({title, price, image})

    res.redirect("/admin/products");
  }
);

router.get('/admin/products/:id/edit', middlewares.requireAuth,async(req,res) => {
  const product = await productRepo.getOne(req.params.id)

  if(!product){
    return res.send('product not find')
  }

  res.send(productEditTemplate(product))
})

router.post('/admin/products.:id/edit', middlewares.requireAuth,async(req,res) => {
  
})
export default router;
