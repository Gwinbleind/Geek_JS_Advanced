const goods = [
    { title: 'Mango People T-shirt 1', price: 400, imgLink: 'img/Product_1.png'},
    { title: 'Mango People T-shirt 2', price: 400, imgLink: 'img/Product_2.png'},
    { title: 'Mango People T-shirt 3', price: 400, imgLink: 'img/Product_3.png'},
    { title: 'Mango People T-shirt 4', price: 400, imgLink: 'img/Product_4.png'},
    { title: 'Mango People T-shirt 5', price: 400, imgLink: 'img/Product_5.png'},
    { title: 'Mango People T-shirt 6', price: 400, imgLink: 'img/Product_6.png'},
    { title: 'Mango People T-shirt 7', price: 400, imgLink: 'img/Product_7.png'},
    { title: 'Mango People T-shirt 8', price: 400, imgLink: 'img/Product_8.png'},
    { title: 'Mango People T-shirt 9', price: 400, imgLink: 'img/Product_9.jpg'},
];

class ProductsList {
    constructor() {
        this.items = [];
    }
    fetchItems(goods) {
        this.items = goods;
    }
    render() {
        return this.items.map(item => new Product(item.title, item.price, item.imgLink).render()).join('');
    }
}

class Product {
    constructor(title, price, imgLink) {
        this.title = title;
        this.price = price;
        this.imgLink = imgLink;
    }
    render() {
        return `<div class="product__element"><a href="" class="product__content"><img class="product__img" src="${this.imgLink}" alt=""><div class="product__name">${this.title}</div><div class="product__price">$${this.price}</div></a><a href="#" class="product__add">Add to Cart</a></div>`;
    }
}

const GoodsList = new ProductsList();
GoodsList.fetchItems(goods);
document.querySelector('.catalog').insertAdjacentHTML("beforeend", '<div class="products__box products__box_x3 div_flex"></div>');
document.querySelector('.products__box').insertAdjacentHTML("beforeend", GoodsList.render());