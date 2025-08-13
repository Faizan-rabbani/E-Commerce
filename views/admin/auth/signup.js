import layout from "../layout.js"
import getError from "../../helper.js"

export default (errors) => {
    return layout({
        content: `
            <div>
                <form method="POST">
                    <input name= "email" placeholder= "email" />
                    ${getError(errors, 'email')}
                    <input name= "password" placeholder= "password" />
                    ${getError(errors, 'password')}
                    <input name= "passwordconfirmation" placeholder= "confirm Password" />
                    ${getError(errors, 'passwordconfirmation')}
                    <button>Sign up</button>
                </form>
            </div>
       `
    }) 
}