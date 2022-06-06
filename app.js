 // get API 
 import { productData } from "./product.js";

 // selectors
 const DomProduct = document.querySelector(".product-container");
 const cartContainer = document.querySelector(".modalcontainer");
 const Cartbtn = document.querySelector(".cart");
 const backdrop = document.querySelector(".backdrop");
 const modalCart = document.querySelector(".modal-productcart");
 const cartItems = document.querySelector(".cartItemNo");
 const TotalPrice = document.querySelector(".totalPrice");
 const clearCart = document.querySelector(".clear-cart");

 // variable 
 let cart = [];
 let btnDom = [];
 // // classes 

 class product {
     getproductData() {
         // get from api
         return productData;
     }
 }
 class UI {
     // show product in DOM
     displayProduct(products) {
         let data = "";
         products.forEach(p => {
             data += ` <div class="product">
                 <div class="img"> <img src="${p.images}" alt=""></div>
                 <div class="info">
                     <span class="modelName">${p.name}</span>
                     <span class="price">${p.price}$</span>
                 </div>
                <button class="add-cart" data-id="${p.id}">Add to Cart</button>
             </div> `

         });
         DomProduct.innerHTML = data;

     }
     addBTN() {
         const addtoCart = document.querySelectorAll(".add-cart");


         const addBtn = [...addtoCart];
         btnDom = addBtn;
         addBtn.forEach(btn => {
             const id = btn.dataset.id;
             const isINcart = cart.find(p => {
                 p.id === id;
             })
             if (isINcart) {
                 btn.innerHTML = "IN CART";
                 btn.disabled = true;
             }
             btn.addEventListener("click", (event => {
                 event.target.innerHTML = "IN CART";
                 event.target.disabled = true;
                 //  get Product from product
                 const addedproduct = {...storage.getproduct(id), quentity: 1 };

                 // add to cart
                 cart = [...cart, addedproduct];

                 // save cart to local storage
                 storage.savedCart(cart);
                 //  update cart value
                 this.setCartValue(cart);
                 // add to modal cart
                 this.addCartItem(addedproduct);

                 //  get cart from local storage
             }))
         })

     }
     setCartValue(cart) {
         //  1.cart items

         // 2.totalvalue
         let tempItem = 0;
         const cartTotal = cart.reduce((acc, curr) => {
             tempItem += curr.quentity;
             return acc + curr.quentity * curr.price;
         }, 0);
         TotalPrice.innerHTML = `TOTAL PRICE: ${cartTotal} $`;
         cartItems.innerHTML = tempItem;
     }
     addCartItem(cartItem) {
         const div = document.createElement("div");
         div.classList.add("modal-product");
         div.innerHTML = `  <img src="${cartItem.images}" alt="">
                 <div class="product-info">
                     <span class="model">
                     ${cartItem.name}
                 </span>
                     <span class="price-product">${cartItem.price}$</span>
                 </div>
                 <div class="quentitiItem" >
                     
                      <svg data-id=${cartItem.id} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6  chevron up" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
                       </svg>
                      
                     <span>${cartItem.quentity}</span>
                          <svg data-id=${cartItem.id} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 chevron down" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                 </div>
              
                     <svg class="trash" data-id=${cartItem.id} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                   </svg>`

         cartContainer.appendChild(div);

     }
     setUpApp() {
         //  get cart from storage
         cart = storage.getCart() || [];
         //  add cart Item
         cart.forEach(cartItem => {
                 this.addCartItem(cartItem);
             })
             //  set value
         this.setCartValue(cart);

     }
     cartLogic() {
         // clear Cart
         clearCart.addEventListener("click", () => {
             // remove
             this.clearCart();
             closeCartstore();
         })
         cartContainer.addEventListener("click", (event => {

             if (event.target.classList.contains("up")) {
                 const addQuantity = event.target;
                 //  console.log(event.target.dataset.id)
                 // get Item from cart
                 const addedItem = cart.find(cItem => cItem.id == addQuantity.dataset.id);
                 addedItem.quentity++;
                 //  update cartValue
                 this.setCartValue(cart);
                 // save cart
                 storage.savedCart(cart);
                 addQuantity.nextElementSibling.innerText = addedItem.quentity;
             } else if (event.target.classList.contains("trash")) {

                 const removeItem = event.target;
                 const _removedItem = cart.find((c) => c.id == removeItem.dataset.id);
                 this.removeItem(_removedItem.id);
                 storage.savedCart(cart);
                 cartContainer.removeChild(removeItem.parentElement)
             } else if (event.target.classList.contains("down")) {
                 const subQuantity = event.target;
                 //  console.log(event.target.dataset.id)
                 // get Item from cart
                 const subQuantityItem = cart.find(cItem => cItem.id == subQuantity.dataset.id);
                 if (subQuantityItem.quentity === 1) {
                     this.removeItem(subQuantityItem.id);
                     cartContainer.removeChild(subQuantity.parentElement.parentElement)
                 }
                 subQuantityItem.quentity--;
                 //  update cartValue
                 this.setCartValue(cart);
                 // save cart
                 storage.savedCart(cart);
                 subQuantity.previousElementSibling.innerText = subQuantityItem.quentity;


             }
         }))
     }
     clearCart() {
         cart.forEach(cItem => { this.removeItem(cItem.id) });
         while (cartContainer.children.length) {
             cartContainer.removeChild(cartContainer.children[0])

         }
     }
     removeItem(id) {
         //  update cart
         cart = cart.filter((cItem) => cItem.id !== id)
             //  target price and cartItem
         this.setCartValue(cart);
         // update string
         storage.savedCart(cart);
         //  get add to cart btn =>update text and disabled
         const button = btnDom.find((btn) => parseInt(btn.dataset.id) === parseInt(id));
         button.innerText = "Add To cart";
         button.disabled = false;

     }
 }
 class storage {
     // saved product
     static savedproduct(productData) {
         localStorage.setItem("productData", JSON.stringify(productData))
     }
     static getproduct(id) {
         const _product = JSON.parse(localStorage.getItem("productData"));
         return _product.find(p => p.id === parseInt(id));

     }
     static savedCart(cart) {
         localStorage.setItem("cart", JSON.stringify(cart));
     }
     static getCart() {
         return JSON.parse(localStorage.getItem("cart"));
     }
 }


 // DOM loaded
 document.addEventListener("DOMContentLoaded", () => {



     // call product 
     const products = new product;
     const productData = products.getproductData();
     // call UIProduct
     const ui = new UI;
     //  set up : get cart and set up app :
     ui.setUpApp();
     ui.displayProduct(productData);
     ui.cartLogic();
     // call addBTN 
     ui.addBTN();
     storage.savedproduct(productData);

 })
 Cartbtn.addEventListener("click", openCartstore);
 backdrop.addEventListener("click", closeCartstore)

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