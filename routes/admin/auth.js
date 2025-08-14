import express from "express";
import { check, validationResult } from "express-validator";
import userRepo from "../../repositories/users.js";
import signupTemplate from "../../views/admin/auth/signup.js";
import signinTemplate from "../../views/admin/auth/signin.js";
import validator from "./validators.js";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signupTemplate());
});

router.post(
  "/signup",
  [validator.requireEmail, validator.password, validator.passwordConfirmation],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(signupTemplate(errors));
    }

    const { email, password, passwordconfirmation } = req.body;
    const user = await userRepo.create({ email, password });
    req.session.userId = user.id;

    res.send("Account Created");
  }
);

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out");
});

router.get("/signin", (req, res) => {
  res.send(signinTemplate());
});

router.post(
  "/signin",
  [validator.requireEmialExist, validator.requirePassword],
  async (req, res) => {
    const errors = validationResult(req);
     if (!errors.isEmpty()) {
      return res.send(signinTemplate(errors));
    }
    const { email } = req.body;

    const user = await userRepo.getOneBy({ email });

    req.session.userId = user.id;
    res.send("You are logged in");
  }
);

export default router;
