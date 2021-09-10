class CartItem {
    constructor (quantity, title, price, pushToken, sum) {
        this.quantity = quantity;
        this.title = title;
        this.price = price;
        this.pushToken = pushToken
        this.sum = sum;
    }
}

export default CartItem;