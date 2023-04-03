const fs = require('fs');

let productList = [
    {
        id: this.products.length + 1,
        title: 'producto1',
        description: 'Este es el producto uno',
        price: 30,
        thumbnail: 'Sin imagen',
        code: 'aaa123',
        stock: 10
    },
    {
        title: 'producto2',
        description: 'Este es el producto dos',
        price: 40,
        thumbnail: 'Sin imagen',
        code: 'bbb123',
        stock: 30
    },
    {
        title: 'producto3',
        description: 'Este es el producto tres',
        price: 50,
        thumbnail: 'Sin imagen',
        code: 'ccc123',
        stock: 20
    },
    {
        title: 'producto4',
        description: 'Este es el producto cuatro',
        price: 60,
        thumbnail: 'Sin imagen',
        code: 'ddd123',
        stock: 10
    },
    {
        title: 'producto5',
        description: 'Este es el producto cinco',
        price: 40,
        thumbnail: 'Sin imagen',
        code: 'eee123',
        stock: 50
    }
]

fs.writeFile('productArchive.json', JSON.stringify(productList), err => {
    if (err) {
    console.error(err);
    return;
    }
    console.log('Products data has been saved');
});