import { check } from "express-validator";
import userRepo from "../../repositories/users.js"

export default {
    requireTitle: check("title")
    .trim()
    .isLength({min: 5, max: 30})
    .withMessage("Title must be between 5 and 30 characters"),
    requirePrice : check("price")
    .trim()
    .toFloat()
    .isFloat({min: 1})
    .withMessage("Price must be a number greater than 1"),
    requireEmail : 
    check("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage("Must be a valid Emial")
      .custom(async (email) => {
        const existedUser = await userRepo.getOneBy({ email });
        if (existedUser) {
          throw new Error("Email is already exists");
        }
      }),
    requirePassword :
    check("password")
      .trim()
      .notEmpty().withMessage("Password is required")
      .isLength({ min: 4, max: 20 })
      .withMessage("Must be between 4 and 20 characters"),

    requirePasswordConfirmation:
    check("passwordConfirmation")
      .trim()
      .notEmpty().withMessage("Password confirmation is required")
      .isLength({ min: 4, max: 20 })
      .withMessage("Must be between 4 and 20 characters")
      .custom((passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        throw new Error("Passwords must match");
      }
      return true;
    }),
    requireEmailExist:  
    check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must provide the valid Emial')
        .custom(async (email) => {
          const user = await userRepo.getOneBy({ email });
          if (!user) {
            throw new Error("Email not found");
      }
        }),
    requirePasswordExist:  
    check('password')
        .trim()
        .custom(async (password, {req}) => {
          const user = await userRepo.getOneBy({ email: req.body.email });
          if(!user){
            throw new Error("Invalid Password")
          }
          const validPassword = await userRepo.comparePasswords(user.password, password);
          if (!validPassword) {
            throw new Error("Password is incorrect");
      }
        })

}