cartBoxTag = document.querySelector('.drop__cart');
const sampleProduct = {
    id_product: 1,
    product_name: 'MANGO PEOPLE T-SHIRT',
    price: 1000,
    quantity: 1,
    img_small: '',
    img_medium: 'img/Product_1.png',
    img_large: ''
};
const catalog = [
    {id_product: 14,
        product_name: 'MANGO PEOPLE T-SHIRT',
        price: 52,
        quantity: 1,
        img_small: 'img/product_mini/Product_14.jpg',
        img_medium: 'img/Product_14.jpg',
        img_large: ''},
    {id_product: 16,
        product_name: 'MANGO PEOPLE T-SHIRT',
        price: 52,
        quantity: 1,
        img_small: 'img/product_mini/Product_16.jpg',
        img_medium: 'img/Product_16.jpg',
        img_large: ''},
    {id_product: 3,
        product_name: 'MANGO PEOPLE T-SHIRT',
        price: 52,
        quantity: 1,
        img_small: 'img/product_mini/Product_3.png',
        img_medium: 'img/Product_3.png',
        img_large: ''},
    {id_product: 12,
        product_name: 'MANGO PEOPLE T-SHIRT',
        price: 52,
        quantity: 1,
        img_small: 'img/product_mini/Product_12.jpg',
        img_medium: 'img/Product_12.jpg',
        img_large: ''},
    {id_product: 8,
        product_name: 'MANGO PEOPLE T-SHIRT',
        price: 52,
        quantity: 1,
        img_small: 'img/product_mini/Product_8.png',
        img_medium: 'img/Product_8.png',
        img_large: ''},
    {id_product: 17,
        product_name: 'MANGO PEOPLE T-SHIRT',
        price: 52,
        quantity: 1,
        img_small: 'img/product_mini/Product_17.jpg',
        img_medium: 'img/Product_17.jpg',
        img_large: ''},
    {id_product: 6,
        product_name: 'MANGO PEOPLE T-SHIRT',
        price: 52,
        quantity: 1,
        img_small: 'img/product_mini/Product_6.png',
        img_medium: 'img/Product_6.png',
        img_large: ''},
    {id_product: 13,
        product_name: 'MANGO PEOPLE T-SHIRT',
        price: 52,
        quantity: 1,
        img_small: 'img/product_mini/Product_13.jpg',
        img_medium: 'img/Product_13.jpg',
        img_large: ''},
    {id_product: 15,
        product_name: 'MANGO PEOPLE T-SHIRT',
        price: 52,
        quantity: 1,
        img_small: 'img/product_mini/Product_15.jpg',
        img_medium: 'img/Product_15.jpg',
        img_large: ''},
];
const cart = {
    amount: 0,
    countGoods: 0,
    content: [],

    emptyCart() {
        this.amount = 0;
        this.countGoods = 0;
        this.content = [];
    },
    countCart() {
        this.countGoods = 0;
        this.amount = 0;
        if (this.content.length > 0) {
            this.content.forEach(element => {
                this.amount += element.price * element.quantity;
                this.countGoods += element.quantity;
            })
        }
    },
    renderDropCart() {
        let dropCartTag = document.querySelector('#dropCart');
        dropCartTag.innerHTML = '';
        dropCartTag.insertAdjacentHTML("afterbegin", cart.content.map(product => `<div class="cart__product"><img src="${product.img_small}" alt="" class="cart__prod_img"><div class="cart__prod_title">${product.product_name}</div><img src="img/stars5.jpg" alt="stars" class="cart__prod_stars"><div class="cart__prod_price">${product.quantity}&nbsp<span class="price_x">x</span>&nbsp$${product.price}</div><i class="cart__prod_del fa fa-times-circle"></i></div>`).join(''));
        dropCartTag.insertAdjacentHTML("beforeend",`<div class="cart__total"><span>TOTAL</span><span>$${this.amount}</span></div><a href="#" class="cart__check div_flex"><span>Checkout</span></a><a href="#" class="button_goto div_flex"><span>Go to cart</span></a>`);
    },
    init() {
        cart.emptyCart();
        cart.renderDropCart();
        document.querySelector('.products__box').addEventListener('click', event => this.productsBoxClickHandler(event));
    },
    productsBoxClickHandler(event) {
        if (event.target.className !== 'product__add') return;
        return this.addProduct(event.target.dataset.product__id);
    },
    addProduct(targetID) {
        let cartIndex = -1;
        if (this.content.length > 0) {
            cartIndex = this.content.map(obj => obj.id_product).indexOf(+targetID)
        }
        const catalogIndex = catalog.map(obj => obj.id_product).indexOf(+targetID);
        if (cartIndex < 0) {
            this.content.push(catalog[catalogIndex]);
        } else {
            this.content[cartIndex].quantity++
        }
        this.countCart();
        this.renderDropCart();
    },
};
cart.init();