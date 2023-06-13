import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import {
  getStorage,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";
import { ref as sRef } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyAmIzB43jsq4_gUvHGp32aMEIoj6RkJPK4",
    authDomain: "homew-ef803.firebaseapp.com",
    projectId: "homew-ef803",
    storageBucket: "homew-ef803.appspot.com",
    messagingSenderId: "688755949782",
    appId: "1:688755949782:web:6b8e36e63879e769ca4977",
    measurementId: "G-YWNX7QLXTW"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const openCart = document.getElementById("openCart");

openCart.addEventListener("click", () => {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
});

const Loading = (state) => {
  if (state == true) {
    const loader = document.getElementById("loader");
    loader.classList.remove("d-none"); // Show the loader
  } else {
    const loader = document.getElementById("loader");
    loader.classList.add("d-none"); // Hide the loader
  }
  console.log(state);
};

const product_container = document.getElementById("product_container");
get(ref(database, "products/"))
  .then((snapshot) => {
    if (snapshot.exists()) {
      Loading(true);
      const data = snapshot.val();
      Object.keys(data).map((product) => {
        const productEl = document.createElement("div");
        productEl.classList.add("col-3");
        productEl.innerHTML = `
        <div class="mt-5">
            <div class="product_image">
                <img src="${
                  data[product].img != "" && data[product].img != null
                    ? data[product].img
                    : "http://www.listercarterhomes.com/wp-content/uploads/2013/11/dummy-image-square.jpg"
                }"  width="150px" alt="">
            </div>
            <div class="product_info">
                <div class="product_name">${data[product].name}</div>
                <div class="product_price">$${data[product].price}</div>
                <div class="product_price">${data[product].brand}</div>
                <div class="product_price">${data[product].category}</div>
                <div class="product_price"${data[product].color}</div>
                <button class="btn btn-primary">Add to Cart</button>
            </div>
            </div>
            `;
        product_container.appendChild(productEl);
        Loading(false);
        productEl.addEventListener("click", () => {
          // add items as array to localstorage
          const cartItems = JSON.parse(localStorage.getItem("cartItems"));
          if (cartItems) {
            cartItems.push(data[product]);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            window.location.reload();
          } else {
            localStorage.setItem("cartItems", JSON.stringify([data[product]]));
          }
        });
      });
    } else {
      const productEl = document.createElement("div");
      productEl.classList.add("col-3");
      productEl.innerHTML = `
        <div class="mt-5">
            <div class="row">
                <div class="col-12">
                    <h1>No Products</h1>
                    <img src="https://cdn.dribbble.com/users/3512533/screenshots/14168376/media/1357b33cb4057ecb3c6f869fc977561d.jpg?compress=1&resize=1600x1200&vertical=center" />
                </div>
            </div>  
        </div>
            `;
      product_container.appendChild(productEl);
    }
  })
  .catch((error) => {
    console.error(error);
    alert(error);
  });

const cartItems = document.getElementById("cartItems");

const itemsToBuy = JSON.parse(localStorage.getItem("cartItems"));

console.log(itemsToBuy);

itemsToBuy.map((item) => {
  const itemEl = document.createElement("div");
  itemEl.classList.add("col-3");
  itemEl.innerHTML = `
 <div class="row">
       <div class="product_info">
                <div class="product_name text-white">${item.name}</div>
                <div class="product_price text-white">$${item.price}</div>
                <div class="product_price text-white">${item.brand}</div>
                <div class="product_price text-white">${item.category}</div>
                <div class="product_price text-white"${item.color}</div>
            </div>
    </div>
    `;
  cartItems.appendChild(itemEl);
});