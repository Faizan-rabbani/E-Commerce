import layout from '../layout.js';
import getError from '../../helper.js'

export default (errors) => {
 return layout({
     content: `
     <form method= "POST" enctype = "multipart/form-data">
        <input name = "title" placeholder = "Title"/>
        <input name = "price" placeholder = "Price"/>
        <input name = "image" type = "file"/>
        <button type = "submit">Add Product</button>
     </form>
     `
 })
}