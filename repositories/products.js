import Repository from "./repository.js";

class ProductRepository extends Repository{}

export default new ProductRepository('products.json')