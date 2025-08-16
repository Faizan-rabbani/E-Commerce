import express from "express";
import userRepo from "../../repositories/users.js";
import signupTemplate from "../../views/admin/auth/signup.js";
import signinTemplate from "../../views/admin/auth/signin.js";
import validator from "./validators.js";
import middlewares from "./middlewares.js";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signupTemplate());
});

router.post(
  "/signup",
  [validator.requireEmail, validator.requirePassword, validator.requirePasswordConfirmation],
  middlewares.handleErrors(signupTemplate),
  async (req, res) => {
    const { email, password, passwordConfirmation } = req.body;
    const user = await userRepo.create({ email, password });
    req.session.userId = user.id;

    res.redirect("/admin/products");
  }
);

router.get("/signout", (req, res) => {
  req.session = null;
  res.redirect('/signin');
});

router.get("/signin", (req, res) => {
  res.send(signinTemplate());
});

router.post(
  "/signin",
  [validator.requireEmailExist, validator.requirePasswordExist],
  middlewares.handleErrors(signinTemplate),
  async (req, res) => {
    const { email } = req.body;

    const user = await userRepo.getOneBy({ email });

    req.session.userId = user.id;
    res.redirect("/admin/products");
  }
);

export default router;
