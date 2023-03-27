class ProductManager {
    constructor() {
        this.products = [];
    }

    addProducts(title, description, price, thumbnail, code, stock) {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Error: All fields must be provided for adding a new product');
            return;
        }

        const productAlredyExists = this.products.find(item => item.code === code);
        if (productAlredyExists) {
            console.log(`Error: A product with code ${code} already exists`);
            return;
        }

        const product = {
            id: this.products.length + 1,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        };
        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(element => element.id === id);
        if (!product) {
            console.log('Error: Product not found');
            return null;
        }
        return product;
    }
}

const productManager = new ProductManager();
console.log(productManager.getProducts()); // This return the empty array because there are no products yet

productManager.addProducts('producto prueba', 'Este es un producto prueba', 200);
console.log(productManager.getProducts()); 
// This tries to add the new product but because it doesn't have all the fields complete yet it throws an error

productManager.addProducts('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
console.log(productManager.getProducts()); // This adds the new product because it fills all the fields

productManager.addProducts('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
console.log(productManager.getProducts()); // When adding this, it will throw an error because it's the same product listed above

productManager.getProductById(1); // This will return the added product that has 1 as id
productManager.getProductById(2); // This will return an error because there is no product 2
