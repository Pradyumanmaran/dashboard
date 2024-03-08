import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";

const db = getDatabase();
const starCountRef = ref(db, "Products/");
const Total_revenue = document.querySelector("#Total_revenue");
const Total_Products = document.querySelector(".Total_Products");

onValue(starCountRef, (snapshot) => {
  // Log the actual data
  console.log(snapshot.val());

  const data = snapshot.val();
  console.log(data);

  const ids = Object.keys(data);
  console.log(ids);
  const NoOFPRoducts = ids.length;
  console.log(NoOFPRoducts);
  Total_Products.textContent = NoOFPRoducts;
  const price = [];

  // Iterate over each ID
  ids.forEach((id) => {
    // Access data for the current ID
    const childData = data[id];

    //Iterate and add price value

    price.push(parseInt(childData.Price));
    console.log(price);
    console.log(price);
    let total_price = 0;

    price.forEach((sum) => {
      console.log(sum);
      total_price += sum;
    });
    console.log(total_price);
    Total_revenue.textContent = "$" + total_price;
  });

  const lastId = ids[ids.length - 1]; // Get the ID of the last object

  if (lastId) {
    const childData = data[lastId];
    console.log(childData);

    // Create and append table row for the last record
    const row = document.createElement("tr");
    row.innerHTML = `<td>${lastId}</td>
                         <td id="idof">${childData.Price}</td>
                         <td id="idof">Delivered</td>
                         `;

    const addtable = document.querySelector(".table_add");

    addtable.appendChild(row);
  }
});

const orders = document.querySelector(".orders");

orders.addEventListener("click", (e) => {
  e.preventDefault();
  window.location = "./orders.html";
});

const Users = document.querySelector(".Users");
Users.addEventListener("click", (e) => {
  e.preventDefault();
  window.location = "./users.html";
});
