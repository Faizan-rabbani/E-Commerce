import express from "express";
import repo from '../../repositories/users.js'
import signupTemplate from '../../views/admin/auth/signup.js'
import signinTemplate from '../../views/admin/auth/signin.js'

const router = express.Router()

router.get("/signup", (req, res) => {
  res.send(signupTemplate());
});

router.post('/signup',async(req, res) => {
  const {email, password, passwordconfirmation} = req.body;

  const existedUser = await repo.getOneBy({email})
  if(existedUser) {
    return res.send("Email already exists")
  }

  if(password !== passwordconfirmation){
    return res.send("Passwords must match")
  }

  const user = await repo.create({email, password})
  req.session.userId = user.id

    res.send("Account Created")
})

router.get('/signout', (req,res) => {
  req.session = null
  res.send("You are logged out")
})

router.get('/signin', (req,res) => {
  res.send(signinTemplate())
})

router.post('/signin', async(req,res) => {
  const {email, password} = req.body
  const user = await repo.getOneBy({email})
  if(!user){
    return res.send("Email not found")
  }

  const validPassword = await repo.comparePasswords(
    user.password, 
    password
  )
  if(!validPassword){
    return res.send("Password is incorrect")
  }
  req.session.user = user.id
  res.send("You are logged in")
})
 
export default router