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
    const token = localStorage.getItem('token');
    
    const response = await fetch('http://127.0.0.1:3000/api/users', {
      headers: {
        Authorization: 'Bearer: ' + token,
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
      let tr = document.createElement('tr');

      // td1 Username
      let td1 = document.createElement('td');
      td1.innerText = element.username;

      // td2 userlevel
      let td2 = document.createElement('td');
      td2.innerText = element.user_level;

      // td3 button to info dialog
      let td3 = document.createElement('td');
      let button1 = document.createElement('button');
      button1.className = 'check';
      button1.setAttribute('data-id', '1');
      button1.innerText = 'Info';
      button1.addEventListener('click', () => getOneUserDialog(element.user_id)); // Add click event listener
      td3.appendChild(button1);

      // td4 button to delete dialog
      let td4 = document.createElement('td');
      let button2 = document.createElement('button');
      button2.className = 'del';
      button2.setAttribute('data-id', '1');
      button2.innerText = 'Delete';
      button2.innerText = 'Delete';
      button2.addEventListener('click', () => confirmDelete(element.user_id)); // Add click event listener
      td4.appendChild(button2);

      // td5 user_id
      let td5 = document.createElement('td');
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
    const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:3000/api/users/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer: ' + token,
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
//Opens dialog and shows user_id, username, email, user_level
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

    //button to close dialog
    const closeButton = dialog.querySelector('button[autofocus]');
    closeButton.addEventListener('click', () => {
        dialog.close();
    });
}
async function getOneEntryDialog(entryId) {
  try {
    const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:3000/api/entries/${entryId}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer: ' + token,
      }
    });

      const entryData = await response.json();
      console.log(entryData);
      // Open dialog and display user details
      openEntryDialog(entryData);
  } catch (error) {
      console.error('Error fetching user data:', error);
  }
}
function openEntryDialog(entryData) {
  // Get the dialog element
  const dialog = document.querySelector('.info_dialog');
  // Get the spans inside the dialog for each user data
  const spans = dialog.querySelectorAll('span');

  // Populate the spans with user data
  spans[0].innerText = entryData.entry_id;
  spans[1].innerText = entryData.entry_date;
  spans[2].innerText = entryData.mood;
  spans[3].innerText = entryData.sleep_hours;
  spans[4].innerText = entryData.notes;
  spans[5].innerText = entryData.created_at;

  // Show the dialog
  dialog.showModal();

  //button to close dialog
  const closeButton = dialog.querySelector('button[autofocus]');
  closeButton.addEventListener('click', () => {
      dialog.close();
  });
}
//Function to confirm user deletion
async function confirmDelete(userId) {
  try {
    const token = localStorage.getItem('token');
      //confirm user delete
      const isConfirmed = confirm(`Are you sure you want to delete the user with ID: ${userId}?`);

      if (!isConfirmed) {
          //if confirm button is not pressed, goes back
          return;
      }

      // Delete request
      const response = await fetch(`http://127.0.0.1:3000/api/users/${userId}`, {
        method: 'DELETE',
      headers: {
        Authorization: 'Bearer: ' + token,
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
async function confirmEntryDelete(entry_id) {
  try {
    const token = localStorage.getItem('token');
      //confirm entry delete
      const isConfirmed = confirm(`Are you sure you want to delete entry with ID: ${entry_id}?`);

      if (!isConfirmed) {
          //if confirm button is not pressed, goes back
          return;
      }

      // Delete request
      const response = await fetch(`http://127.0.0.1:3000/api/entries/${entry_id}`, {
        method: 'DELETE',
      headers: {
        Authorization: 'Bearer: ' + token,
      }
    });
     
      if (!response.ok) {
          throw new Error('Failed to delete entry');
      }

      console.log('Entry deleted successfully');
      
  } catch (error) {
      console.error('Error deleting entry:', error);
  }
}
const userpost = document.getElementById('postUserButton');
userpost.addEventListener('click', async () => {


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

    window.alert('User added successfully');
  } catch (error) {
    window.alert('Error adding user:', error);
  }
});
const userput = document.getElementById('putUserButton');
userput.addEventListener('click', async () => {
  const tokeni = localStorage.getItem('token');
 // const UserId = document.getElementById('userId').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;

  const formData = {
    
    username: username,
    password: password,
    email: email
  };

  try {
    
    const response = await fetch(`http://localhost:3000/api/users/`, {
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
const postEntry = document.getElementById('postEntryButton');
postEntry.addEventListener('click', async () => {


  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const formData = {
    username: username,
    password: password,
    email: email,
  };

  try {
    const response = await fetch('http://127.0.0.1:3000/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
      
    });

    if (!response.ok) {
      throw new Error('Failed to add entry');
    }

    console.log('Entry added successfully');
  } catch (error) {
    console.error('Error adding Entry:', error);
  }
});
const putEntry = document.getElementById('putEntryButton');
putEntry.addEventListener('click', async () => {
  const token = localStorage.getItem('token');
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;

  const formData = {
    
    username: username,
    password: password,
    email: email
  };

  try {
    
    const response = await fetch(`http://localhost:3000/api/entries/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token, // Assuming token is stored in localStorage
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Failed to update entry');
    }

    window.alert('Entry updated successfully');
  } catch (error) {
    window.alert('Error updating entry:', error);
  }
});
const button7 = document.querySelector('.get_entry');
button7.addEventListener('click', getEntry);
async function getEntry() {
  console.log('Button clicked!');

  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch('http://127.0.0.1:3000/api/entries/', {
      headers: {
        Authorization: 'Bearer: ' + token,
      }
    });

    const data = await response.json();
    console.log(data);

    // Clear table body
    const tbody = document.querySelector('.tbody1');
    tbody.innerHTML = '';

    // Create table row element
    let tr = document.createElement('tr');

    // tde0 entry_id
    let tde0 = document.createElement('td');
    tde0.innerText = data.entry_id;

    // tde1 user_id


    // tde2 entry_date
    let tde2 = document.createElement('td');
    tde2.innerText = data.entry_date;
    // tde3 mood
    let tde3 = document.createElement('td');
    tde3.innerText = data.mood;
    // tde4 weight
    let tde4 = document.createElement('td');
    tde4.innerText = parseFloat(data.weight).toFixed(2);
    // tde5 sleep_hours
    let tde5 = document.createElement('td');
    tde5.innerText = parseInt(data.sleep_hours);
    // tde6 notes
    let tde6 = document.createElement('td');
    tde6.innerText = data.notes;
    // td7 created_at
    let tde7 = document.createElement('td');
    tde7.innerText = data.created_at;
    

    // tde8 button to info dialog
    let tde8 = document.createElement('td');
    let button7 = document.createElement('button');
    button7.className = 'check';
    button7.setAttribute('data-id', '1');
    button7.innerText = 'Info';
    button7.addEventListener('click', () => getOneEntryDialog(data.entry_id)); // Add click event listener
    tde8.appendChild(button7);

    // tde9 button to delete dialog
    let tde9 = document.createElement('td');
    let button2 = document.createElement('button');
    button2.className = 'del';
    button2.setAttribute('data-id', '1');
    button2.innerText = 'Delete';
    button2.addEventListener('click', () => confirmEntryDelete(data.entry_id)); // Add click event listener
    tde9.appendChild(button2);

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
    tr.appendChild(tde9);

    
    

    // Append the table row element to the table body
    tbody.appendChild(tr);
  } catch (error) {
    console.log(error);
  }
}