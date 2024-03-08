import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";

const ProductName = document.querySelector("#Product_name");
const description = document.querySelector("#Description");
const brand = document.querySelector("#Brand");
const Quantity = document.querySelector("#Quantity");
const color = document.querySelector("#color");
const category = document.querySelector("#dress");
const price = document.querySelector("#Price");
const create = document.querySelector("#create");
const male = document.querySelector("#inlineRadio1");
const Female = document.querySelector("#inlineRadio2");
const Unisex = document.querySelector("#inlineRadio3");

const black = document.querySelector("#inlineCheckbox1");
console.log(black);

const White = document.querySelector("#inlineCheckbox2");

const blue = document.querySelector("#inlineCheckbox3");

// let Colors = [];
let colorof;

let checkboxes = document.querySelectorAll(".form-check-input-colors");

checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("click", function () {
    // console.log(checkbox.value);
    // let Colors = [];
    // Colors.push(checkbox.value);
    // console.log(Colors);
  });
});
let Colors = [];
checkboxes.forEach((find)=>{
  Colors.push(find.value)
})
// Colors.push(checkbox.value);
console.log(Colors);

black.addEventListener("click", (e) => {
  colorof = e.target.value;
  // console.log(Color);
});

White.addEventListener("click", (e) => {
  colorof = e.target.value;
});

blue.addEventListener("click", (e) => {
  colorof = e.target.value;
});

let Gender = "";

male.addEventListener("click", (e) => {
  Gender = e.target.value;
  console.log(Gender);
});

Female.addEventListener("click", (e) => {
  Gender = e.target.value;
});

Unisex.addEventListener("click", (e) => {
  Gender = e.target.value;
});

let userId;
const currentDate = new Date();
const options = { month: "long", day: "numeric", year: "numeric" };

const formattedDate = currentDate.toLocaleDateString(undefined, options);

console.log(formattedDate);

// let checkboxes = document.querySelectorAll(".form-check-input");
// const selectedGenders = [];

// checkboxes.forEach(function (checkbox) {
//   checkbox.addEventListener("click", function () {
//     console.log(checkbox.value);
//   });
// });

create.addEventListener("click", (e) => {
  e.preventDefault();

  // let checkboxes = document.querySelectorAll(".form-check-input");
  // const selectedGenders = [];

  // checkboxes.forEach(function (checkbox) {
  //   checkbox.addEventListener("click", function () {
  //     console.log(checkbox.value);
  //   });
  // });

  let checkboxes = document.querySelectorAll(".form-check-input-colors");

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("click", function () {
      // console.log(checkbox.value);

      var Colors = [];
      Colors.push(checkbox.value);
      console.log(Colors);
    });
  });

  const Product_details = {
    id: Math.random().toString(16).split(".")[1],
    Date: formattedDate,
    ProductName: ProductName.value,
    Description: description.value,
    Brand: brand.value,
    Quantity: Quantity.value,
    Gender,
    Color: Colors,
    Category: category.value,
    Price: price.value,
  };
  console.log(Product_details);

  userId = Product_details.id;

  // Call the writeUserData function with the correct parameters
  writeUserData(userId, ProductName);
});

function writeUserData(Id, Name) {
  const db = getDatabase();
  set(ref(db, "Products/" + Id), {
    ProductName: Name.value,
    Date: formattedDate,
    Description: description.value,
    Brand: brand.value,
    Quantity: Quantity.value,
    Gender,
    // Color: color.value,
    Category: category.value,
    Price: price.value,
  })
    .then(() => {
      console.log("Product data stored successfully");
    })
    .catch((error) => {
      console.error("Error storing product data", error);
    });
}
