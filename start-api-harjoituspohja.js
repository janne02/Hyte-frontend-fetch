import './style.css';
import { fetchData } from './fetch.js';

const bt1 = document.querySelector('.get_entry');
bt1.addEventListener('click', async () => {
  console.log('Klikki toimii');
  const muntokeni = localStorage.getItem('token');
  const url = 'http://localhost:3000/api/entries/1';

  const options = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      Authorization: 'Bearer: '+ muntokeni,
    },
  };
  fetchData(url, options).then((data) => {
    // käsitellään fetchData funktiosta tullut JSON
    console.log(data);
  });
});
  let name = localStorage.getItem('name');
  document.getElementById('name').innerHTML = name;
 
  // # Get entries by id
  // # GET http://localhost:3000/api/entries/:id


// 1. testataan ensin YKSI endpoint joka ei vaadi tokenia
// 2. uudelleen strukturoidaan koodi jotta se on modulaarisempi

// tämä toimi ennen autentikaatiota, nyt tarvitsee tokenin, siistitään pian!
// sivuille on nyt myös lisätty navigaatio html sivuun, sekä siihen sopiva CSS koodi, hae siis uusi HTML ja UUSI CSS ennen kun aloitat
const button1 = document.querySelector('.get_users');
button1.addEventListener('click', getAllUsers);


async function getAllUsers() {
  console.log('Button clicked!');

  try {
    const tokeni = localStorage.getItem('token');
    
    const response = await fetch('http://127.0.0.1:3000/api/users', {
      headers: {
        Authorization: 'Bearer: ' + tokeni,
      }
    });

    const data = await response.json();
    console.log(data);

    // Clear table body
    const tbody = document.querySelector('.tbody');
    tbody.innerHTML = '';

    data.forEach((element) => {
      console.log(element.username);

      // Create table row element
      var tr = document.createElement('tr');

      // td1 Username
      var td1 = document.createElement('td');
      td1.innerText = element.username;

      // td2
      var td2 = document.createElement('td');
      td2.innerText = element.user_level;

      // td3
      var td3 = document.createElement('td');
      var button1 = document.createElement('button');
      button1.className = 'check';
      button1.setAttribute('data-id', '1');
      button1.innerText = 'Info';
      button1.addEventListener('click', () => getOneUserDialog(element.user_id)); // Add click event listener
      td3.appendChild(button1);

      // td4
      var td4 = document.createElement('td');
      var button2 = document.createElement('button');
      button2.className = 'del';
      button2.setAttribute('data-id', '1');
      button2.innerText = 'Delete';
      button2.innerText = 'Delete';
      button2.addEventListener('click', () => confirmDelete(element.user_id)); // Add click event listener
      td4.appendChild(button2);

      // td5
      var td5 = document.createElement('td');
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

async function getOneUserDialog(userId) {
  try {
    const tokeni = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:3000/api/users/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer: ' + tokeni,
      }
    });

      const userData = await response.json();
      console.log(userData);
      // Open dialog and display user details
      openDialog(userData);
  } catch (error) {
      console.error('Error fetching user data:', error);
  }
}
function openDialog(userData) {
    // Get the dialog element
    const dialog = document.querySelector('.info_dialog');
    // Get the spans inside the dialog for each user data
    const spans = dialog.querySelectorAll('span');

    // Populate the spans with user data
    spans[0].innerText = userData.user_id;
    spans[1].innerText = userData.username;
    spans[2].innerText = userData.email;
    spans[3].innerText = userData.user_level;

    // Show the dialog
    dialog.showModal();

    // add event listener to close button
    const closeButton = dialog.querySelector('button[autofocus]');
    closeButton.addEventListener('click', () => {
        dialog.close();
    });
}
async function confirmDelete(userId) {
  try {
    const tokeni = localStorage.getItem('token');
      // Vahvistetaan, että käyttäjä haluaa varmasti poistaa käyttäjän
      const isConfirmed = confirm(`Are you sure you want to delete the user with ID: ${userId}?`);

      if (!isConfirmed) {
          // Jos käyttäjä ei vahvista, poistutaan funktiosta
          return;
      }

      // Lähetetään DELETE-pyyntö
      const response = await fetch(`http://127.0.0.1:3000/api/users/${userId}`, {
        method: 'DELETE',
      headers: {
        Authorization: 'Bearer: ' + tokeni,
      }
    });
     
      if (!response.ok) {
          throw new Error('Failed to delete user');
      }

      console.log('User deleted successfully');
      
  } catch (error) {
      console.error('Error deleting user:', error);
  }
}
const post = document.getElementById('postUserButton');
post.addEventListener('click', async () => {


  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;

  const formData = {
    username: username,
    password: password,
    email: email
  };

  try {
    const response = await fetch('http://127.0.0.1:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Failed to add user');
    }

    console.log('User added successfully');
  } catch (error) {
    console.error('Error adding user:', error);
  }
});
const put = document.getElementById('putUserButton');
put.addEventListener('click', async () => {
  const tokeni = localStorage.getItem('token');
  const UserId = document.getElementById('userId').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;

  const formData = {
    userId: UserId,
    username: username,
    password: password,
    email: email
  };

  try {
    
    const response = await fetch(`http://localhost:3000/api/users/${UserId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokeni, // Assuming token is stored in localStorage
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    console.log('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
  }
});