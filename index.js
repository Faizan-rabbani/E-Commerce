import express from "express";
import bodyParser from "body-parser"

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

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

app.post('/',(req, res) => {
    console.log(req.body)
    res.send("Account Created")
})

app.listen(3000, () => {
  console.log("listening");
});
