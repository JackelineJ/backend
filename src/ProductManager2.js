const fs = require('fs');

class ProductManager {
    constructor() {
        this.products = [];
        const jsonData = fs.readFileSync('./productArchive.json', 'utf-8');
        const data = JSON.parse(jsonData);
        this.products.push(...data);
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

        const newProductId = this.products.length + 1;

        const product = {
            id: newProductId,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        };
        this.products.push(product);

        fs.writeFileSync('productArchive.json', JSON.stringify(this.products, null, 2));

        console.log(`Product with ID ${newProductId} has been added`);
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

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            console.log('Error: Product not found');
            return null;
        }

        const existingProduct = this.products[productIndex];

        if (updatedFields && (updatedFields.code && this.products.some(product => product.code === updatedFields.code && product.id !== id) || updatedFields.id)) {
            console.log('Error: Product id cannot be updated');
            return null;
        }

        if (updatedFields && this.products.some(product => product.code === updatedFields.code && product.id !== id)) {
            console.log(`Error: Product with code ${updatedFields.code} already exists`);
            return null;
        }

        const updatedProduct = {
            ...existingProduct,
            ...updatedFields
        }

        this.products[productIndex] = updatedProduct;
        return updatedProduct;
    }

    deleteProduct(id) {
        try {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error(`Error: Product with id ${id} was not found`);
        }
        this.products.splice(index, 1);
        console.log(`Product with id ${id} was deleted successfully`);
        return this.products;
        } catch (error) {
        console.log(error.message);
        }
    }
}


const productManager = new ProductManager();
/*
console.log(productManager.getProducts()); // This return the empty array because there are no products yet

productManager.addProducts('producto prueba', 'Este es un producto prueba', 200);
console.log(productManager.getProducts()); 
// This tries to add the new product but because it doesn't have all the fields complete yet it throws an error, because of that the array still shows as empty

productManager.addProducts('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
console.log(productManager.getProducts()); // This adds the new product because it fills all the fields

productManager.addProducts('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
console.log(productManager.getProducts()); // When adding this, it will throw an error because it's the same product listed above

productManager.getProductById(1); // This will return the added product that has 1 as id
productManager.getProductById(2); // This will return an error because there is no product 2

productManager.updateProduct(1, { price: 500, stock: 15}); //This changes the field values of the product and updates it
console.log(productManager.updateProduct(1));

productManager.deleteProduct(1); //This will delete the product that has 1 as id
productManager.deleteProduct(2); // This will return an error because there is no product 2
*/