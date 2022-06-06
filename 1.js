//  get Elements
import { productData } from "./product.js"
// selectors
const productsDom = document.querySelector(".product-container");
const cartStore = document.querySelector(".cart");
const cartItems = document.querySelector(".cartItem");
const backdrop = document.querySelector(".backdrop");
const modalCart = document.querySelector(".modal-cart");
const totalPrice = document.querySelector(".totalPrice")
const modalcontainer = document.querySelector(".modalcontainer")


// motaghayer
let cartProduct = [];


// event listeners
cartStore.addEventListener("click", openCartstore);
backdrop.addEventListener("click", closeCartstore)

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
                const adedProduct = {...Storage.getProduct(id), quantity: 1 };
                cartProduct = [...cartProduct, adedProduct];
                this.setCartValue(cartProduct);
                Storage.saveCart(cartProduct);
                this.addCartItem(adedProduct);
            })
        })

    }
    setCartValue(cart) {
        let tempCartvalue = 0;
        const cartTotal = cart.reduce((acc, curr) => {
                tempCartvalue += curr.quantity;
                return acc + curr.quantity * curr.price;

            },
            0);

        totalPrice.innerHTML = `Total Price:${cartTotal}$`;
        cartItems.innerText = tempCartvalue;
    }
    addCartItem(cartItem) {
        const div = document.createElement("div");
        div.classList.add("modal-product");
        div.innerHTML = `<img src="${cartItem.images}" alt="">
        <div class="product-info">
            <span class="model">${cartItem.name}</span>
            <span class="price-product">${cartItem.price}$</span>
        </div>
        <div class="quentitiItem">
        <span class="chevron">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
      </svg>
      </span>
        <span>${cartItem.quantity}</span>
         <span class="chevron">        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
         </svg></span>
            </div>
        <div class="trash">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg></div>`
        modalcontainer.appendChild(div);
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
//  get Elements
import { productData } from "./product.js"
// selector
const cartBtn = document.querySelector(".cart");
const backdrop = document.querySelector(".backdrop");
const cartmodalFrame = document.querySelector(".modal-productcart")

const productContainer = document.querySelector(".product-container")
const totalPrice = document.querySelector(".totalPrice");
const cartItemNo = document.querySelector(".cartItemNo");
const modalContainer = document.querySelector(".modalcontainer")

// variables
let cartProduct = []



// add evenet listeners
cartBtn.addEventListener("click", openCartstore);
backdrop.addEventListener("click", closeCartstore);
// event loaded document



// classes
class Product {
    getProducts() {
        return productData;
    }
}

class UI {
    // display product
    displayProduct(product) {
        let result = "";
        product.forEach((item) => {
            result += `<div class="product">
    <div class="img"> <img src="${item.images}" alt=""></div>
    <div class="info">
        <span class="modelName">${item.name}</span>
        <span class="price">${item.price}$</span>
    </div>
   <button class="add-cart" data-id =${item.id}>Add to Cart</button>
</div>`
        })
        productContainer.innerHTML = result;

    }

    //    add to cart
    getAddtocartbtn() {
        const addTocartBtn = document.querySelectorAll(".add-cart");
        // spred operator
        const cartAdd = [...addTocartBtn];

        cartAdd.forEach(btn => {
            const id = btn.dataset.id;
            //    check id is in cart or not
            const isINcart = cartProduct.find(p => { p.id === id })
            if (isINcart) {
                btn.innertext = "IN CART";
                btn.Disabled = true;
            }
            btn.addEventListener("click", (event) => {

                event.target.innerHTML = "IN CART";
                event.target.Disabled = true;

                // get product from storage
                const addedProduct = {...storage.getProduct(id), quentity: 1 };
                // added to cart
                cartProduct = [...cartProduct, addedProduct]
                    // saved cart to local storage
                storage.savedCart(cartProduct);
                // update cart value
                this.setCertvalue(cartProduct)
                    // add to cartItem
                this.displayCartItem(addedProduct);
                // get cart from localstorage
            })
        })
    }
    setCertvalue(cart) {
        // cart Items
        // cart totalprice
        let tempCartitems = 0;
        const cartTotal = cart.reduce((acc, curr) => {
            tempCartitems += curr.quentity;
            return acc + curr.quentity * curr.price;
        }, 0)

        totalPrice.innerHTML = `Total price:${cartTotal}$`;
        cartItemNo.innerHTML = tempCartitems;
    }
    displayCartItem(cartItem) {
        const div = document.createElement("div");
        div.classList.add("modal-product");
        div.innerHTML = `
      <img src="${cartItem.images}" alt="">
                    <div class="product-info">
                        <span class="model">
                      ${cartItem.name}
                    </span>
                        <span class="price-product"> ${cartItem.price}$</span>
                    </div>
                    <div class="quentitiItem">
                        <span class="chevron">
                         <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
                          </svg>
                         </span>
                        <span>${cartItem.quentity}</span>
                        <span class="chevron">        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                       </svg></span>
                    </div>
                    <div class="trash">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>`
        modalContainer.appendChild(div);

    }
    setupApp() {
        // get cart from storage
        cartProduct = storage.getCart();
        console.log(cartProduct)
        this.displayCartItem(cartProduct);
        this.setCertvalue(cartProduct);

    }
}
class storage {
    static savedProduct(products) {
        localStorage.setItem("products", JSON.stringify(products))
    }
    static getProduct(id) {
        const _product = JSON.parse(localStorage.getItem("products"))
        return _product.find(p => p.id === parseInt(id))
    }
    static savedCart(cartProduct) {
        localStorage.setItem("cartProduct", JSON.stringify(cartProduct))
    }
    static getCart() {
        return localStorage.getItem("cartProduct") ?
            JSON.parse(localStorage.getItem("cartProduct")) : []
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // call class product
    const products = new Product;
    const productData = products.getProducts();
    //   call UI class
    const ui = new UI;
    // call cart
    ui.setupApp();
    ui.displayProduct(productData)
    ui.getAddtocartbtn();




    // call storage
    storage.savedProduct(productData)


})


// functions
function openCartstore() {
    backdrop.style.display = "block";
    cartmodalFrame.style.opacity = "1";
    cartmodalFrame.style.transform = "translateY(10vh)"
}

function closeCartstore() {
    backdrop.style.display = "none";
    cartmodalFrame.style.opacity = "0";
    cartmodalFrame.style.transform = "translateY(-100vh)"

}


// functions
function openCartstore() {
    backdrop.style.display = "block";
    modalCart.style.opacity = "1";
    modalCart.style.transform = "translateY(10vh)"
}

function closeCartstore() {
    backdrop.style.display = "none";
    modalCart.style.opacity = "0";
    modalCart.style.transform = "translateY(-100vh)"

}