import express from "express";
import bodyParser from "body-parser"
import cookieSession from "cookie-session";
import repo from './repositories/users.js'

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieSession({keys: ['key1']}))

app.get("/", (req, res) => {
  res.send(`
        <div>
            <form method="POST">
                <input name= "email" placeholder= "email" />
                <input name= "password" placeholder= "password" />
                <input name= "passwordconfirmation" placeholder= "confirm Password" />
                <button>Submit</button>
            </form>
        </div>
        `);
});

app.post('/',async(req, res) => {
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

app.listen(3000, () => {
  console.log("listening");
});
