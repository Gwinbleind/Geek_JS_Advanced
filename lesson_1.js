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
const renderList = (items) => {
    const renderedGoods = items.map(renderItem).join('');
    //Запятые стоят из-за того, что .map возвращает массив, разделенный запятыми. Чтобы их убрать, превратим массив в строку с помощью .join
    const catalogHeader = '<div class="products__box products__box_x3 div_flex"></div>';
    document.querySelector('.catalog').insertAdjacentHTML("beforeend", catalogHeader);
    document.querySelector('.products__box').insertAdjacentHTML("beforeend", renderedGoods);
};

const renderItem = ({title = 'Undefined product', price = 0, imgLink = 'img/Product_1.png'}) => {
    return `
<div class="product__element">
    <a href="" class="product__content">
        <img class="product__img" src="${imgLink}" alt="">
        <div class="product__name">${title}</div>
        <div class="product__price">$${price}</div>
    </a>
    <a href="#" class="product__add">Add to Cart</a>
</div>`;
};

renderList(goods);
