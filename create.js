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
  apiKey: "AIzaSyAmJyDk5JlDiPZUqOjU-wUifJJPkDgDqgY",

  authDomain: "comm101-cf4f0.firebaseapp.com",

  projectId: "comm101-cf4f0",

  storageBucket: "comm101-cf4f0.appspot.com",

  messagingSenderId: "1074741211265",

  appId: "1:1074741211265:web:ae1eadcfc1a716993a5d80",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);
const productSubmit = document.getElementById("createProd");
// aq minda event listeneris damateba ro yvelaepri wamoigos

productSubmit.addEventListener("click", (e) => {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const brand = document.getElementById("brand").value;
  const category = document.getElementById("category").value;
  const color = document.getElementById("color").value;
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  console.log(file);

  let timestamp = new Date().getTime();
  const fileName = timestamp + file?.name;
  console.log("test", fileName);
  if (file === undefined) {
    const uid = Math.floor(Math.random() * 100000000000000000);
    set(ref(database, "products/" + uid), {
      name: name,
      price: price,
      brand: brand,
      category: category,
      color: color,
      img: null,
      random: uid,
    })
      .then(() => {
        alert("Product Added");
      })
      .catch((error) => {
        console.error(error);
        alert(error);
      });
  } else {
    const uid = Math.floor(Math.random() * 100000000000000000);
    const storageRef = sRef(storage, "images/" + fileName);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log(snapshot);
        console.log("Uploaded a blob or file!");
      })
      .then(() => {
        getDownloadURL(storageRef).then((url) => {
          console.log(url);
          document.getElementById("image").innerHTML = `
      <img src="${url}" alt="" />
      `;
          set(ref(database, "products/" + uid), {
            name: name,
            price: price,
            brand: brand,
            category: category,
            color: color,
            img: url ? url : "",
            random: uid,
          })
            .then(() => {
              alert("Product Added");
            })
            .catch((error) => {
              console.error(error);
              alert(error);
            });
        });
      });
  }
});