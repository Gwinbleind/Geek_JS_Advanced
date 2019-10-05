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

class Product {
    constructor(id = 1, product_name = 'test', price = 0, amount = 1, img_small = '', img_medium = '', img_large = '') {
        this.id = id;
        this.product_name = product_name;
        this.price = price;
        this.amount = amount;
        this.img_small = img_small;
        this.img_medium = img_medium;
        this.img_large = img_large;
    }
    renderCatalogElement() {
        return `<div class="product__element"><a href="" class="product__content"><img class="product__img" src="${this.img_medium}" alt=""><div class="product__name">${this.product_name}</div><div class="product__price">$${this.price}.00</div></a><a href="#" class="product__add" data-product__id=${this.id}>Add to Cart</a><img src="img/stars5.jpg" alt="stars" class="product__stars"></div>`;
    }
    renderDropCartElement() {
        return `<div class="cart__product"><img src="${this.img_small}" alt="" class="cart__prod_img"><div class="cart__prod_title">${this.product_name}</div><img src="img/stars5.jpg" alt="stars" class="cart__prod_stars"><div class="cart__prod_price">${this.amount}&nbsp<span class="price_x">x</span>&nbsp$${this.price}</div><i class="cart__prod_del fa fa-times-circle"></i></div>`
    }
}

class Catalog {
    constructor() {
        this.items = []
    }

    init() {
        this.fetchItems('/catalog').then(() => {
            this.insertHTML();
        });
    }
    insertHTML() {
        let $catalog = document.querySelector('.products__box');
        $catalog.innerHTML = this.render();
        // console.log(this);
    }
    fetchItems(URL) {
        return sendRequest(URL).then(items => {
            this.items = items
        })
    }
    render() {
        return this.items.map(item => new Product(item.id, item.product_name, item.price, 1, item.img_small, item.img_medium, item.img_large).renderCatalogElement()).join('');
    }
}

class Cart {
    constructor() {
        this.amount = 0;
        this.totalCost = 0;
        this.items = [];
    }

    init() {
        //Загрузка с DB
        this.count();
        this.insertHTML();
        document.querySelector('.products__box').addEventListener('click', event => this.productsBoxClickHandler(event));
    }
    productsBoxClickHandler(event) {
        if (event.target.className !== 'product__add') return;
        return this.addItem(+event.target.dataset.product__id);
    }

    count() {
        this.amount = 0;
        this.totalCost = 0;
        if (this.items.length > 0) {
            this.items.forEach(item => {
                this.amount += item.amount;
                this.totalCost += item.price * this.amount;
            })
        }
    }
    addItem(id) {
        let index = this.searchById(id);
        if (index+1) {
            //Обновление записи
            this.items[index].amount++
        } else {
            //Добавление записи
            let catalogIndex = catalog.items.map(item => item.id).indexOf(id);
            let item = catalog.items[catalogIndex];
            this.items.push(item);
        }
        this.count();
        this.insertHTML();
    }
    searchById(id) {
        return this.items.map(item => +item.id).indexOf(+id)
    }
    render() {
        return this.items.map((item) => {
            return new Product(item.id, item.product_name, item.price, item.amount, item.img_small,'','')
                .renderDropCartElement()
        }).join('')
    }
    insertHTML() {
        let $cart = document.querySelector('#dropCart');
        $cart.innerHTML = this.render() + `<div class="cart__total"><span>TOTAL</span><span>$${this.totalCost}</span></div><a href="#" class="cart__check div_flex"><span>Checkout</span></a><a href="#" class="button_goto div_flex"><span>Go to cart</span></a>`;
    }
}

const catalog = new Catalog();
catalog.init();
const cart = new Cart();
cart.init();