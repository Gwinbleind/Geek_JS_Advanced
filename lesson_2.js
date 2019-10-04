// const goods = [
//     { title: 'Mango People T-shirt 1', price: 400, imgLink: 'img/Product_1.png'},
//     { title: 'Mango People T-shirt 2', price: 400, imgLink: 'img/Product_2.png'},
//     { title: 'Mango People T-shirt 3', price: 400, imgLink: 'img/Product_3.png'},
//     { title: 'Mango People T-shirt 4', price: 400, imgLink: 'img/Product_4.png'},
//     { title: 'Mango People T-shirt 5', price: 400, imgLink: 'img/Product_5.png'},
//     { title: 'Mango People T-shirt 6', price: 400, imgLink: 'img/Product_6.png'},
//     { title: 'Mango People T-shirt 7', price: 400, imgLink: 'img/Product_7.png'},
//     { title: 'Mango People T-shirt 8', price: 400, imgLink: 'img/Product_8.png'},
//     { title: 'Mango People T-shirt 9', price: 400, imgLink: 'img/Product_9.jpg'},
// ]; //Меняем на catalog
const catalog = [
    // {id: 14,
    //     product_name: 'MANGO PEOPLE T-SHIRT',
    //     price: 52,
    //     quantity: 1,
    //     img_small: 'img/product_mini/Product_14.jpg',
    //     img_medium: 'img/Product_14.jpg',
    //     img_large: ''},
    // {id: 16,
    //     product_name: 'MANGO PEOPLE T-SHIRT',
    //     price: 52,
    //     quantity: 1,
    //     img_small: 'img/product_mini/Product_16.jpg',
    //     img_medium: 'img/Product_16.jpg',
    //     img_large: ''},
    // {id: 3,
    //     product_name: 'MANGO PEOPLE T-SHIRT',
    //     price: 52,
    //     quantity: 1,
    //     img_small: 'img/product_mini/Product_3.png',
    //     img_medium: 'img/Product_3.png',
    //     img_large: ''},
    // {id: 12,
    //     product_name: 'MANGO PEOPLE T-SHIRT',
    //     price: 52,
    //     quantity: 1,
    //     img_small: 'img/product_mini/Product_12.jpg',
    //     img_medium: 'img/Product_12.jpg',
    //     img_large: ''},
    // {id: 8,
    //     product_name: 'MANGO PEOPLE T-SHIRT',
    //     price: 52,
    //     quantity: 1,
    //     img_small: 'img/product_mini/Product_8.png',
    //     img_medium: 'img/Product_8.png',
    //     img_large: ''},
    // {id: 17,
    //     product_name: 'MANGO PEOPLE T-SHIRT',
    //     price: 52,
    //     quantity: 1,
    //     img_small: 'img/product_mini/Product_17.jpg',
    //     img_medium: 'img/Product_17.jpg',
    //     img_large: ''},
    // {id: 6,
    //     product_name: 'MANGO PEOPLE T-SHIRT',
    //     price: 52,
    //     quantity: 1,
    //     img_small: 'img/product_mini/Product_6.png',
    //     img_medium: 'img/Product_6.png',
    //     img_large: ''},
    // {id: 13,
    //     product_name: 'MANGO PEOPLE T-SHIRT',
    //     price: 52,
    //     quantity: 1,
    //     img_small: 'img/product_mini/Product_13.jpg',
    //     img_medium: 'img/Product_13.jpg',
    //     img_large: ''},
    // {id: 15,
    //     product_name: 'MANGO PEOPLE T-SHIRT',
    //     price: 52,
    //     quantity: 1,
    //     img_small: 'img/product_mini/Product_15.jpg',
    //     img_medium: 'img/Product_15.jpg',
    //     img_large: ''},
];

function sendRequest(URL) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET',URL);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status !== 200) {
                    reject();
                }
                const users = JSON.parse(xhr.responseText);
                resolve(users);
            }
        };
        xhr.send();
    });
}

class ProductsList {
    constructor() {
        this.amount = 0;
        this.countGoods = 0;
        this.items = [];
    }
    fetchItems(url) {
        return sendRequest(url).then((items) => {
            this.items = items
        })
    }
    renderCatalogList() {
        return this.items.map(item => new Product(item.id, item.product_name, item.price, 1, item.img_small, item.img_medium, item.img_large).renderCatalogElement()).join('');
        // return this.items.map(item => new Product(...item()).renderCatalogElement()).join(''); А можно ли будет так?
    }
    //Взято для корзины из Базового JS
    countCart() {
        this.countGoods = 0;
        this.amount = 0;
        if (this.items.length > 0) {
            this.items.forEach((element) => {
                this.amount += element.price * element.quantity;
                this.countGoods += element.quantity;
            })
        }
    }

    renderDropCart() {
        // return this.items.map((item) => {new Product(...item())}) // а можно ли так?
        return this.items.map((item) => {return new Product(item.id, item.product_name, item.price, item.quality, item.img_small,'','').renderDropCartElement()}).join('')
    }
    insertDropCart() {
        document.querySelector('#dropCart').innerHTML = this.renderDropCart()+`<div class="cart__total"><span>TOTAL</span><span>$${this.amount}</span></div><a href="#" class="cart__check div_flex"><span>Checkout</span></a><a href="#" class="button_goto div_flex"><span>Go to cart</span></a>`;
    }

    init() {
        this.items = [];
        this.insertDropCart();
        document.querySelector('.products__box').addEventListener('click', event => this.productsBoxClickHandler(event));
    }
    productsBoxClickHandler(event) {
        if (event.target.className !== 'product__add') return;
        return this.addProduct(event.target.dataset.product__id);
    }
    addProduct(targetID) {
        let cartIndex = -1;
        if (this.items.length > 0) {
            cartIndex = this.items.map(obj => obj.id).indexOf(+targetID)
        }
        const catalogIndex = catalog.map(obj => obj.id).indexOf(+targetID);
        if (cartIndex < 0) {
            this.items.push(catalog[catalogIndex]);
        } else {
            this.items[cartIndex].quantity++
        }
        this.countCart();
        this.insertDropCart();
    }
}

class Product {
    constructor(id = 1, product_name = 'test', price = 0, quantity = 1, img_small = '', img_medium = '', img_large = '') {
        this.id = id;
        this.product_name = product_name;
        this.price = price;
        this.quantity = quantity;
        this.img_small = img_small;
        this.img_medium = img_medium;
        this.img_large = img_large;
    }
    renderCatalogElement() {
        return `<div class="product__element"><a href="" class="product__content"><img class="product__img" src="${this.img_medium}" alt=""><div class="product__name">${this.product_name}</div><div class="product__price">$${this.price}.00</div></a><a href="#" class="product__add" data-product__id=${this.id}>Add to Cart</a><img src="img/stars5.jpg" alt="stars" class="product__stars"></div>`;
    }
    renderDropCartElement() {
        return `<div class="cart__product"><img src="${this.img_small}" alt="" class="cart__prod_img"><div class="cart__prod_title">${this.product_name}</div><img src="img/stars5.jpg" alt="stars" class="cart__prod_stars"><div class="cart__prod_price">${this.quantity}&nbsp<span class="price_x">x</span>&nbsp$${this.price}</div><i class="cart__prod_del fa fa-times-circle"></i></div>`
    }
}


const goodsList = new ProductsList();
goodsList.fetchItems('/catalog').then(() => {
    document.querySelector('.products__box').innerHTML = goodsList.renderCatalogList()
});

const cart = new ProductsList();
cart.init();