import Repository from "./repository.js";

class CartRepository extends Repository{}

export default new CartRepository('carts.json')