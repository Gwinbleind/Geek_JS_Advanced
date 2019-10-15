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
            if (!event.target.classList.contains('cart__prod_del')) return;
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
                    .then(() => {
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
                this.delete(id).then(() => {
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