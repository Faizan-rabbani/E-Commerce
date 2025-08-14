import express from "express";
import { validationResult } from "express-validator";
import multer from "multer";

import productRepo from "../../repositories/products.js";
import productNewTemplate from "../../views/admin/products/new.js";
import validators from "./validators.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
router.get("/admin/product", (req, res) => {});

router.get("/admin/product/new", (req, res) => {
  res.send(productNewTemplate());
});

router.post(
  "/admin/product/new",
  [validators.requireTitle, validators.requirePrice],
  upload.single("image"),
  (req, res) => {
    const errors = validationResult(req);

    console.log(req.file)

    res.send("submitted");
  }
);

export default router;
