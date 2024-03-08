import {
  getDatabase,
  ref,
  onValue,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";

const db = getDatabase();
const starCountRef = ref(db, "Products/");

function removeItem(itemId) {
  const itemRef = ref(db, `Products/${itemId}`);

  remove(itemRef)
    .then(() => {
      console.log(`Item with ID ${itemId} successfully removed`);
    })
    .catch((error) => {
      console.error(`Error removing item with ID ${itemId}:`, error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  onValue(starCountRef, (snapshot) => {
    // Log the actual data
    console.log(snapshot.val());

    const data = snapshot.val();
    console.log(data);

    const ids = Object.keys(data);

    const price = [];

    // Iterate over each ID
    ids.forEach((id) => {
      // Access data for the current ID
      const childData = data[id];

      //Iterate and add price value

      price.push(parseInt(childData.Price));
      console.log(price);

      // Create and append table row for each record
      const row = document.createElement("tr");
      row.innerHTML = `<td>${childData.ProductName}</td>
                       <td>${childData.Date}</td>
                       <td>${childData.Quantity}</td>
                       <td>${childData.Price}</td>
                      
                       <td>
                         <button type="button"  id="Edit" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary">Edit</button>
                         <button type="button" onclick="UserView('${id}')" id="view" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#ViewModal">View</button>
                         <button type="button" class="btn btn-danger delete-button">Delete</button>
                       </td>`;
      const addtable = document.querySelector(".table_add");
      addtable.appendChild(row);

      // Attach event listener dynamically to the newly created "Delete" button
      const deleteButton = row.querySelector(".delete-button");
      deleteButton.addEventListener("click", function () {
        removeItem(id);
        console.log(id);
      });

      console.log(price);
      let total_price = 0;

      price.forEach((sum) => {
        console.log(sum);
        total_price += sum;
      });
      console.log(total_price);

      const EditButton = row.querySelector("#Edit");
      EditButton.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(id);
        // window.location = "./addproduct.html";
        const ProductName = document.querySelector("#Product_name");
        console.log(ProductName);

        // setTimeout(function() {
        const db = getDatabase();
        const starCountRef = ref(db, "Products/" + id);
        console.log(starCountRef);

        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          console.log(data);
          console.log(data.ProductName);
          // updateStarCount(postElement, data);

          // const create = document.querySelector("#create");
          // console.log(create);

          const panelBottom = document.querySelector(".panelBottom");
          console.log(panelBottom.style);
          panelBottom.style.display = "none";

          const panleEdit = document.querySelector(".panelEdit");
          panleEdit.style.display = "block";

          // const ProductName = document.querySelector("#Product_name");
          const Description = document.querySelector("#Description");
          const Brand = document.querySelector("#Brand");
          const Quantity = document.querySelector("#Quantity");
          const color = document.querySelector("#color");
          const category = document.querySelector("#dress");
          const Price = document.querySelector("#Price");
          const Update = document.querySelector("#create");
          const male = document.querySelector("#inlineRadio1");
          const Female = document.querySelector("#inlineRadio2");
          const Unisex = document.querySelector("#inlineRadio3");
          const Total_revenue = document.querySelector("#Total_revenue");
          // onValue(starCountRef, (snapshot) => {
          // Log the actual data
          console.log(snapshot.val());

          // const data = snapshot.val();
          // console.log(data);

          const ids = Object.keys(data);
          console.log(ids);

          // let idof = document.querySelector("#idof");
          // console.log(idof.textContent);

          // Iterate over each ID
          // ids.forEach((id) => {
          // Access data for the current ID
          const childData = data[id];
          console.log(childData);
          console.log(data);

          // const ProductName = document.querySelector("#Product_name");
          // const description = document.querySelector("#Description");
          // const brand = document.querySelector("#Brand");
          // const Quantity = document.querySelector("#Quantity");
          // const color = document.querySelector("#color");
          // const category = document.querySelector("#dress");
          // const price = document.querySelector("#Price");
          // const create = document.querySelector("#create");
          // const male = document.querySelector("#inlineRadio1");
          // const Female = document.querySelector("#inlineRadio2");
          // const Unisex = document.querySelector("#inlineRadio3");

          ProductName.value = data.ProductName;
          Description.value = data.Description;
          Brand.value = data.Brand;
          Quantity.value = data.Quantity;
          Price.value = data.Price;
          category.value = data.category;

          // });
          // }, 2000);

          // });

          Update.addEventListener("click", (e) => {
            e.preventDefault();
            const currentDate = new Date();
            const options = { month: "long", day: "numeric", year: "numeric" };

            const formattedDate = currentDate.toLocaleDateString(
              undefined,
              options
            );

            console.log(formattedDate);
            const updates = {};
            const products = {
              Date: formattedDate,
              ProductName: ProductName.value,
              Description: Description.value,
              Brand: Brand.value,
              Quantity: Quantity.value,
              Price: Price.value,
            };
            updates["Products/" + id] = products;
            update(ref(db), updates);

            console.log("success");
          });
        });
      });
    });
  });
});
