import {
  getDatabase,
  ref,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";

const db = getDatabase();
const starCountRef = ref(db, "Products/");

function removeItem(itemId) {
  const itemRef = ref(db, `Products/${itemId}`);

  return remove(itemRef);
}

onValue(starCountRef, (snapshot) => {
  // Log the actual data
  console.log(snapshot.val());

  const data = snapshot.val();
  console.log(data);

  const ids = Object.keys(data);
  const lastId = ids[ids.length - 1]; // Get the ID of the last object

  if (lastId) {
    const childData = data[lastId];
    console.log(childData);

    // Create and append table row for the last record
    const row = document.createElement("tr");
    row.innerHTML = `<td>${lastId}</td>
                       <td>${childData.Date}</td>
                       <td>${childData.Date}</td>
                       <td id="idof">${childData.Price}</td>
                       <td> <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                       <option selected>Delivered...</option>
                       <option value="1">Not Processed</option>
                       <option value="2">Shipped</option>
                      <option value="3">Delivered</option>
                     </select></td>
                       <td>
                         <button type="button" class="btn btn-danger delete-button">Delete</button>
                       </td>`;

    const addtable = document.querySelector(".table_add");

    addtable.appendChild(row);

    const deleteButton = row.querySelector(".delete-button");
    deleteButton.addEventListener("click", async function () {
      try {
        // Remove from Firebase
        await removeItem(lastId);
        
        // Remove from the table
        addtable.removeChild(row);
        
        console.log(`${lastId} successfully removed`);
      } catch (error) {
        console.error(`Error removing item with ID ${lastId}:`, error);
      }
    });
  }
});
