//  get Elements
import { productData } from "./product.js"
// selectors
const productsDom = document.querySelector(".product-container");

// motaghayer
let cartProduct = [];

// event listeners
document.addEventListener("DOMContentLoaded", () => {
    const products = new Product;
    const productData = products.getProduct();
    const ui = new UI;
    ui.displayProduct(productData);
    ui.getAddtocartbtn();
    Storage.savedProduct(productData);

})


// classses

class Product {
    getProduct() {
        return productData;
    }
}
class Storage {
    static savedProduct(products) {
        localStorage.setItem("products", JSON.stringify(products))
    }
    static getProduct(id) {
        const _product = JSON.parse(localStorage.getItem("products"))
        return _product.find(p => (p.id === parseInt(id)))
    }
    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart))
    }
}
class UI {
    displayProduct(products) {
        let result = "";
        products.forEach(item => {
            result += `<div class="product">
            <div class="img"> <img src=${item.images} alt=""></div>
            <div class="info">
                <span class="modelName">${item.name}</span>
                <span class="price">$ ${item.price}</span>
            </div>
            <button class="add-cart" data-id=${item.id}>
            <svg xmlns="http://www.w3.org/2000/svg" class="buttonsvg" viewBox="0 0 20 20" fill="currentColor">
  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
</svg>
            Add to Cart</button>
        </div>`
            productsDom.innerHTML = result;

        });
    }
    getAddtocartbtn() {
        const addTocartBtn = document.querySelectorAll(".add-cart");
        const cartBtn = [...addTocartBtn];
        cartBtn.forEach(btn => {

            const id = btn.dataset.id;
            const isINcart = cartProduct.find(p => { p.id === id })
            if (isINcart) {
                btn.innerText = "In Cart";
                btn.disabled = true;
            }

            btn.addEventListener("click", (event) => {
                event.target.innerText = "IN Cart";
                event.target.disabled = true;
                const adedProduct = Storage.getProduct(id);
                cartProduct = [...cartProduct, {...adedProduct, quantity: 1 }]
                Storage.saveCart(cartProduct);
            })
        })
    }
}



// functions