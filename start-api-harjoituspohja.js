import "./style.css";
import { fetchData } from "./fetch.js";

let name = localStorage.getItem("name");
document.getElementById("name").innerHTML = name;

document.addEventListener("DOMContentLoaded", function () {
  // Get the logout
  const logoutLink = document.getElementById("logout");

  // Add click event listener to the logout link
  logoutLink.addEventListener("click", function (event) {
    // Prevent the default behavior of the link (e.g., navigating to "#")
    event.preventDefault();

    // Perform logout
    activelogout();
  });
});
//tyhjentää localStoragesta tokenin ja siirtyy takaisin kirjautumis/rekisteröitymissivulle
async function activelogout() {
  localStorage.clear();
  window.alert("Logout succesfully");
  window.location.href = "home.html";
}
//Haetaan käyttäjät
const button1 = document.querySelector(".get_users");
button1.addEventListener("click", getAllUsers);

async function getAllUsers() {
  console.log("Button clicked!");

  try {
    const tokeni = localStorage.getItem("token");

    const response = await fetch(
      "https://hyte-janne.northeurope.cloudapp.azure.com/api/users",
      {
        headers: {
          Authorization: "Bearer: " + tokeni,
        },
      }
    );

    const data = await response.json();
    console.log(data);

    // Clear table body
    const tbody = document.querySelector(".tbody");
    tbody.innerHTML = "";

    data.forEach((element) => {
      console.log(element.username);

      // Create table row element
      let tr = document.createElement("tr");

      // td1 Username
      let td1 = document.createElement("td");
      td1.innerText = element.username;

      // td2 userlvl
      let td2 = document.createElement("td");
      td2.innerText = element.user_level;

      // td3 info-button
      let td3 = document.createElement("td");
      let button1 = document.createElement("button");
      button1.className = "check";
      button1.setAttribute("data-id", "1");
      button1.innerText = "Info";
      button1.addEventListener("click", () =>
        getOneUserDialog(element.user_id)
      );
      td3.appendChild(button1);

      // td4 delete-button
      let td4 = document.createElement("td");
      let button2 = document.createElement("button");
      button2.className = "del";
      button2.setAttribute("data-id", "1");
      button2.innerText = "Delete";
      button2.innerText = "Delete";
      button2.addEventListener("click", () => confirmDelete(element.user_id));
      td4.appendChild(button2);

      // td5 user-id
      let td5 = document.createElement("td");
      td5.innerText = element.user_id;

      // Append table data elements to the table row element
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);

      // Append the table row element to the table body
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.log(error);
  }
}
//näyttää valitun käyttäjän tiedot
async function getOneUserDialog(userId) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://hyte-janne.northeurope.cloudapp.azure.com/api/users/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer: " + token,
        },
      }
    );

    const userData = await response.json();
    console.log(userData);
    // Open dialog and display user details
    openDialog(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}
//Opens dialog and shows user_id, username, email, user_level
function openDialog(userData) {
  // Get the dialog element
  const dialog = document.querySelector(".info_dialog");
  // Get the spans inside the dialog for each user data
  const spans = dialog.querySelectorAll("span");

  // Populate the spans with user data
  spans[0].innerText = userData.user_id;
  spans[1].innerText = userData.username;
  spans[2].innerText = userData.email;
  spans[3].innerText = userData.user_level;

  // Show the dialog
  dialog.showModal();

  //button to close dialog
  const closeButton = dialog.querySelector("button[autofocus]");
  closeButton.addEventListener("click", () => {
    dialog.close();
  });
}
async function confirmDelete(userId) {
  try {
    const token = localStorage.getItem("token");

    //confirm user delete
    const isConfirmed = confirm(
      `Are you sure you want to delete the user with ID: ${userId}?`
    );

    if (!isConfirmed) {
      //if confirm button is not pressed, goes back
      return;
    }

    // Delete request
    const response = await fetch(
      `https://hyte-janne.northeurope.cloudapp.azure.com/api/users/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer: " + token,
        },
      }
    );

    if (!response.ok) {
      alert("Error: User has diaryentries, delete them first");
      throw new Error("Failed to delete user");
    }

    console.log("User deleted successfully");
    //when confirm button is pressed it refresh table as well
    await getAllUsers();
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}
//Function to confirm entry deletion, if ok is pressed entry is deleted if not then window closes and nothing happens
async function confirmEntryDelete(entry_id) {
  try {
    const token = localStorage.getItem("token");
    //confirm entry delete
    const isConfirmed = confirm(
      `Are you sure you want to delete entry with ID: ${entry_id}?`
    );
    //if confirm button is not pressed, goes back
    if (!isConfirmed) {
      return;
    }

    // Delete request
    const response = await fetch(
      `https://hyte-janne.northeurope.cloudapp.azure.com/api/entries/${entry_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer: " + token,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete entry");
    }

    console.log("Entry deleted successfully");
  } catch (error) {
    console.error("Error deleting entry:", error);
  }
}
//User can only update his own info, admin cant update user info
const userput = document.getElementById("putUserButton");
userput.addEventListener("click", async () => {
  const tokeni = localStorage.getItem("token");
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  const formData = {
    username: username,
    password: password,
    email: email,
  };

  try {
    const response = await fetch(
      `https://hyte-janne.northeurope.cloudapp.azure.com/api/users/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokeni, // Assuming token is stored in localStorage
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update user");
    }
    window.alert("User updated successfully");

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("email").value = "";
  } catch (error) {
    window.alert(
      "Error updating user: Input information is not valid or doesnt meet requirements."
    );
  }
});

//User can get his own diaryentry with this, admin can get all users diaryentries
const button7 = document.querySelector(".get_entry");
button7.addEventListener("click", getEntry);
async function getEntry() {
  console.log("Button clicked!");

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      "https://hyte-janne.northeurope.cloudapp.azure.com/api/entries/",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const data = await response.json();
    console.log(data);

    if (data.length == 0) {
      alert("No diaryentries found!!");
      return;
    }

    // Clear table body
    const tbody = document.querySelector(".tbody1");
    tbody.innerHTML = "";
    data.forEach((entry) => {
      // Create table row element
      let tr = document.createElement("tr");

      // tde0 entry_id
      let tde0 = document.createElement("td");
      tde0.innerText = entry.entry_id;

      // tde1 user_id

      // tde2 entry_date
      let tde2 = document.createElement("td");
      tde2.innerText = entry.entry_date;
      // tde3 mood
      let tde3 = document.createElement("td");
      tde3.innerText = entry.mood;
      // tde4 weight
      let tde4 = document.createElement("td");
      tde4.innerText = parseFloat(entry.weight).toFixed(2);
      // tde5 sleep_hours
      let tde5 = document.createElement("td");
      tde5.innerText = parseInt(entry.sleep_hours);
      // tde6 notes
      let tde6 = document.createElement("td");
      tde6.innerText = entry.notes;
      // td7 created_at
      let tde7 = document.createElement("td");
      tde7.innerText = entry.created_at;

      // tde9 button to delete dialog
      let tde8 = document.createElement("td");
      let button3 = document.createElement("button");
      button3.className = "del";
      button3.setAttribute("data-id", "1");
      button3.innerText = "Delete";
      button3.addEventListener("click", () =>
        confirmEntryDelete(entry.entry_id)
      ); // Add click event listener
      tde8.appendChild(button3);

      // td5

      // Append table data elements to the table row element
      tr.appendChild(tde0);
      tr.appendChild(tde2);
      tr.appendChild(tde3);
      tr.appendChild(tde4);
      tr.appendChild(tde5);
      tr.appendChild(tde6);
      tr.appendChild(tde7);
      tr.appendChild(tde8);

      // Append the table row element to the table body
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.log(error);
  }
}
//User can add new diaryentry
const addButton = document.getElementById("addEntry");

const entryForm = document.querySelector(".addform1");

addButton.addEventListener("click", async (event) => {
  event.preventDefault();
  console.log(addButton);

  const entryDateInput = document.getElementById("entry_date").value;
  const entryDate = formatDate(entryDateInput);
  const mood = document.getElementById("mood").value;
  const weight = parseFloat(document.getElementById("weight").value);
  const sleephours = parseInt(document.getElementById("sleep_hours").value);
  const notes = document.getElementById("notes").value;

  const entryData = {
    entry_date: entryDate,
    mood: mood,
    weight: weight,
    sleep_hours: sleephours,
    notes: notes,
  };
  console.log(entryData);
  try {
    const tokeni = localStorage.getItem("token");

    const response = await fetch(
      "https://hyte-janne.northeurope.cloudapp.azure.com/api/entries",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokeni,
        },
        body: JSON.stringify(entryData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add entry");
    }

    alert("Entry added successfully");

    // input field reset
    document.getElementById("entry_date").value = "";
    document.getElementById("mood").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("sleep_hours").value = "";
    document.getElementById("notes").value = "";
  } catch (error) {
    console.error("Error adding entry:", error);
    alert("Error adding entry: " + error.message);
  }
});
//date format so it works on database
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  //format date as year-date-month
  return `${year}-${month}-${day}`;
}
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("darkModeToggle");

  toggleButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // Save user preference
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
  });

  // Check user preference on load
  const isDarkMode = JSON.parse(localStorage.getItem("darkMode"));
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
  }
});
