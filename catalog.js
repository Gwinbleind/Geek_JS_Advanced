class ItemsList {
  constructor() {
    this.items = [];
  }

  fetchItems() {
    this.items = [
      { title: 'Компьютерная мышь', price: 400 },
      { title: 'Жесткий диск SSD 1Tb', price: 10000 },
      { title: 'Материнская плата', price: 4000 },
      { title: 'Видео-карта', price: 15000 },
    ];
  }

  render() {
    return this.items.map((item) => new Item(item.title, item.price).render()).join('');
  }
}

class Item {
  constructor(title, price) {
    this.price = price;
    this.title = title;
  }

  render() {
    return `<div class="item"><h3>${this.title}</h3><p>${this.price}</p></div>`
  }
}

const items = new ItemsList();
items.fetchItems();

document.querySelector('.catalog').innerHTML = items.render();