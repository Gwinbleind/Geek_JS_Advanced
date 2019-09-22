const goods = [
    { title: 'Компьютерная мышь', price: 400 },
    { title: 'Жесткий диск SSD 1Tb', price: 10000 },
    { title: 'Материнская плата', price: 4000 },
    { title: 'Видео-карта', price: 15000 },
];
const renderList = (items) => {
    const renderedGoods = items.map(renderItem).join('');
    //Запятые стоят из-за того, что .map возвращает массив, разделенный запятыми. Чтобы их убрать, превратим массив в строку с помощью .join
    document.querySelector('.catalog').innerHTML = renderedGoods;
};
const renderItem = ({title, price}) => {
    return `<div class="item"><h3>${title}</h3><p>${price}</p></div>`;
};

renderList(goods);
