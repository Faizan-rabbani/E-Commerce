import { check } from "express-validator";
import repo from "../../repositories/users.js"

export default {
    requireEmail : 
    check("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage("Must be a valid Emial")
      .custom(async (email) => {
        const existedUser = await repo.getOneBy({ email });
        if (existedUser) {
          throw new Error("Email is already exists");
        }
      }),
    password :
    check("password")
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage("Must be between 8 and 20 characters"),
    passwordConfirmation: 
    check("passwordConfirmation")
        .trim()
        .isLength({ min: 8, max: 20 })
        .withMessage("Must be between 8 and 20 characters")
        .custom((passwordconfirmation, { req }) => {
            if (passwordconfirmation !== req.body.password) {
                throw new Error("Passwords must match");
            }
        }),
    requireEmialExist:  
    check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must provide the valid Emial')
        .custom(async (email) => {
          const user = await repo.getOneBy({ email });
          if (!user) {
            throw new Error("Email not found");
      }
        }),
    requirePassword:  
    check('password')
        .trim()
        .custom(async (password, {req}) => {
          const user = await repo.getOneBy({ email: req.body.email });
          if(!user){
            throw new Error("Invalid Password")
          }
          const validPassword = await repo.comparePasswords(user.password, password);
          if (!validPassword) {
            throw new Error("Password is incorrect");
      }
        })

}