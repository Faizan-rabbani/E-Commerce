import layout from "../layout.js"
export default () => {
    return layout({
        content: `
            <div>
                <form method="POST">
                    <input name= "email" placeholder= "email" />
                    <input name= "password" placeholder= "password" />
                    <input name= "passwordconfirmation" placeholder= "confirm Password" />
                    <button>Sign up</button>
                </form>
            </div>
       `
    }) 
}