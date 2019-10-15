// function sendRequest(URL) {
//     return fetch(URL).then(response => response.json())
// }
//
// class Product {
//     constructor(id = 1, product_name = 'test', price = 0, amount = 1, img_small = '', img_medium = '', img_large = '') {
//         this.id = id;
//         this.product_name = product_name;
//         this.price = price;
//         this.amount = amount;
//         this.img_small = img_small;
//         this.img_medium = img_medium;
//         this.img_large = img_large;
//     }
//     renderCatalogElement() {
//         return `<div class="product__element"><a href="" class="product__content"><img class="product__img" src="${this.img_medium}" alt=""><div class="product__name">${this.product_name}</div><div class="product__price">$${this.price}.00</div></a><a href="#" class="product__add" data-product__id=${this.id}>Add to Cart</a><img src="img/stars5.jpg" alt="stars" class="product__stars"></div>`;
//     }
//     renderDropCartElement() {
//         return `<div class="cart__product"><img src="${this.img_small}" alt="" class="cart__prod_img"><div class="cart__prod_title">${this.product_name}</div><img src="img/stars5.jpg" alt="stars" class="cart__prod_stars"><div class="cart__prod_price">${this.amount}&nbsp<span class="price_x">x</span>&nbsp$${this.price}</div><i class="cart__prod_del fa fa-times-circle"></i></div>`
//     }
// }
//
// class Catalog {
//     constructor() {
//         this.items = []
//     }
//
//     init() {
//         this.fetchItems('/catalog').then(() => {
//             this.insertHTML();
//         });
//     }
//     insertHTML() {
//         let $catalog = document.querySelector('.products__box');
//         $catalog.innerHTML = this.render();
//         // console.log(this);
//     }
//     fetchItems(URL) {
//         return sendRequest(URL).then(items => {
//             this.items = items
//         })
//     }
//     render() {
//         return this.items.map(item => new Product(item.id, item.product_name, item.price, 1, item.img_small, item.img_medium, item.img_large).renderCatalogElement()).join('');
//     }
// }
//
// class Cart {
//     constructor() {
//         this.amount = 0;
//         this.totalCost = 0;
//         this.items = [];
//     }
//
//     init() {
//         //Загрузка с DB
//         this.count();
//         this.insertHTML();
//         document.querySelector('.products__box').addEventListener('click', event => this.productsBoxClickHandler(event));
//     }
//     productsBoxClickHandler(event) {
//         if (event.target.className !== 'product__add') return;
//         return this.addItem(+event.target.dataset.product__id);
//     }
//
//     count() {
//         this.amount = 0;
//         this.totalCost = 0;
//         if (this.items.length > 0) {
//             this.items.forEach(item => {
//                 this.amount += item.amount;
//                 this.totalCost += item.price * this.amount;
//             })
//         }
//     }
//     addItem(id) {
//         let index = this.searchById(id);
//         if (index+1) {
//             //Обновление записи
//             this.items[index].amount++
//         } else {
//             //Добавление записи
//             let catalogIndex = catalog.items.map(item => item.id).indexOf(id);
//             let item = catalog.items[catalogIndex];
//             this.items.push(item);
//         }
//         this.count();
//         this.insertHTML();
//     }
//     searchById(id) {
//         return this.items.map(item => +item.id).indexOf(+id)
//     }
//     render() {
//         return this.items.map((item) => {
//             return new Product(item.id, item.product_name, item.price, item.amount, item.img_small,'','')
//                 .renderDropCartElement()
//         }).join('')
//     }
//     insertHTML() {
//         let $cart = document.querySelector('#dropCart');
//         $cart.innerHTML = this.render() + `<div class="cart__total"><span>TOTAL</span><span>$${this.totalCost}</span></div><a href="#" class="cart__check div_flex"><span>Checkout</span></a><a href="#" class="button_goto div_flex"><span>Go to cart</span></a>`;
//     }
// }

// const catalog = new Catalog();
// catalog.init();
// const cart = new Cart();
// cart.init();

const app = new Vue({
    el: '#root',
    data: {
        catalog: [],
        query: '',
        filteredCatalog: [],
        cart: {
            amount: 0,
            totalCost: 0,
            items: [],
        },
    },
    methods: {
        fetchRequest(url) {
            return fetch(url)
                .then(response => response.json())
        },
        fetchCatalog() {
            this.fetchRequest('/catalog').then(items => {
                this.catalog = items;
                this.filteredCatalog = items;
            })
        },
        fetchCart() {
            this.fetchRequest('/cart').then(items => {
                    this.cart.items = items
                });
        },
        filterCatalog() {
            const regExp = new RegExp(this.query,'i');
            this.filteredCatalog = this.catalog.filter(item => {
                return regExp.test(item.product_name)
            });
        },
        productsBoxClickHandler(event) {
            if (event.target.className !== 'product__add') return;
            return this.addToCart(+event.target.dataset.product__id);
        },
        cartXClickHandler(event) {
            if (event.target.className !== 'cart__prod_del') return;
            return this.deleteFromCart(event.target.dataset.product__id);
        },
        searchById(array,id) {
            let index = array.map(item => +item.id).indexOf(+id);
            return index
        },
        addToCart(id) {
            let index = this.searchById(this.cart.items,id);
            if (index+1) {
                this.update(id,this.cart.items[index].amount+1)
                    .then(index => {
                        this.cart.items[index].amount++
                    })
            } else {
                let item = this.catalog[this.searchById(this.catalog,id)];
                this.add(item).then(item => {
                    this.cart.items.push(item);
                });
            }
        },
        deleteFromCart(id) {
            if (confirm('Are you serious?')) {
                this.delete(id).then(id => {
                    let index = this.searchById(this.cart.items,id);
                    if (index+1) {
                        this.cart.items.splice(index,1);
                    }
                })
            }
        },
        update(id, value) {
            return fetch(`/cart/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({amount: value}),
                headers: {
                    'Content-type': 'application/json',
                }
            }).then(response => response.json())
        },
        add(item) {
            return fetch('/cart', {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-type': 'application/json',
                }
            }).then(response => response.json())
        },
        delete(id) {
            return fetch(`/cart/${id}`, {
                method: 'DELETE',
            }).then(response => response.json())
        },
    },
    computed: {
        amountCart: function() {
            return this.cart.items.reduce((amount, item) => {
                return amount += item.amount;
            },0)
        },
        totalCostCart: function () {
            return this.cart.items.reduce((cost, item) => {
                return cost += item.amount * item.price;
            },0)
        },
        showCart: function () {
            return this.cart.items.length > 0
        },
        showCatalog: function () {
            return this.filteredCatalog.length > 0
        }
    },
    mounted: function () {
        this.fetchCatalog();
        this.fetchCart();
    },
});