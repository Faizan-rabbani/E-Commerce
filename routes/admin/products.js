import express from "express";
import multer from "multer";

import middlewares from './middlewares.js'
import productRepo from "../../repositories/products.js";
import productNewTemplate from "../../views/admin/products/new.js";
import productIndexTemplate from "../../views/admin/products/index.js"
import validators from "./validators.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
router.get("/admin/products",async (req, res) => {
  const products = await productRepo.getAll()
  res.send(productIndexTemplate(products))
});

router.get("/admin/product/new", (req, res) => {
  res.send(productNewTemplate());
});

router.post(
  "/admin/product/new",
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

export default router;
