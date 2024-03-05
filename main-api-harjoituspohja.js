import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';
import { fetchData } from './fetch.js';

document.querySelector('#app').innerHTML = 'Moi tässä oman APIn harjoituksia';

const button1 = document.querySelector('.get_users');
button1.addEventListener('click', getAllUsers);

const postUserButton = document.getElementById('postUserButton');
postUserButton.addEventListener('click', handleAddUserButtonClick);

async function getAllUsers() {
    sessionStorage.setItem('jwt_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJjcmVhdGVkX2F0IjoiMjAyNC0wMS0wMVQwNzowMDowMC4wMDBaIiwidXNlcl9sZXZlbCI6InJlZ3VsYXIiLCJpYXQiOjE3MDkwMTk5MDQsImV4cCI6MTcwOTEwNjMwNH0.HVrsjukx8OB-WtM9K1ite2FN6XMlVbOJd3zd8vFLeTc');

    console.log('toimii!');
    
    try {
        //poistetaan tyhjät idt
        const token = sessionStorage.getItem('jwt_token');
        await removeEmptyIds();
        const response = await fetch('http://127.0.0.1:3000/api/users', {
            method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

        const data = await response.json();
        console.log(data);

        
        // tänne tiedot
        const tbody = document.querySelector('.tbody');
        tbody.innerHTML = '';

        data.forEach((element) => {
            
            
            console.log(element.username);

            // Create table row element
            const tr = document.createElement('tr');

            // td1 Username
            const td1 = document.createElement('td');
            td1.innerText = element.username;

            // td2
            const td2 = document.createElement('td');
            td2.innerText = element.user_level;

            // td3
            const td3 = document.createElement('td');
            const button1 = document.createElement('button');
            button1.className = 'check';
            button1.setAttribute('data-id', element.user_id); // Set user ID as data-id
            button1.innerText = 'Info';
            button1.addEventListener('click', () => getOneUserDialog(element.user_id)); // Add click event listener
            td3.appendChild(button1);

            // td4
            const td4 = document.createElement('td');
            const button2 = document.createElement('button');
            button2.className = 'del';
            button2.setAttribute('data-id', element.user_id); // Set user ID as data-id
            button2.innerText = 'Delete';
            button2.addEventListener('click', () => confirmDelete(element.user_id)); // Add click event listener
            td4.appendChild(button2);

            // td5
            const td5 = document.createElement('td');
            td5.innerText = element.user_id;

            // Append table data elements to the table row element
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);

            // Append the table row element to the table (assuming you have a table with the class 'tbody')
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.log(error);
    }
}
async function removeEmptyIds() {
    try {
        // Tee pyyntö tietokantaan tyhjien ID:iden poistamiseksi
        const response = await fetch('http://127.0.0.1:3000/api/users/removeEmptyIds', {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to remove empty IDs');
        }

        console.log('Empty IDs removed successfully');
    } catch (error) {
        console.error('Error removing empty IDs:', error);
    }
}
async function handleAddUserButtonClick() {
    const form = document.querySelector('.addform');
    const formData = new FormData(form);
    const username = formData.get('username');
    const password = formData.get('password'); // Adjusted to match the field name in your form
    const email = formData.get('email'); // Adjusted to match the field name in your form
    try {
        
        const response = await fetch('http://127.0.0.1:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, email }), // Adjusted to include password and email
        });

        if (!response.ok) {
            throw new Error('Failed to add user');
        }


        // Log the new user data to console
        console.log('New user added:', newUser);
    } catch (error) {
        console.error('Error adding user:', error);
    }
}
async function getOneUserDialog(userId) {
    sessionStorage.setItem('jwt_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJjcmVhdGVkX2F0IjoiMjAyNC0wMS0wMVQwNzowMDowMC4wMDBaIiwidXNlcl9sZXZlbCI6InJlZ3VsYXIiLCJpYXQiOjE3MDkwMTk5MDQsImV4cCI6MTcwOTEwNjMwNH0.HVrsjukx8OB-WtM9K1ite2FN6XMlVbOJd3zd8vFLeTc');
    try {
        const token = sessionStorage.getItem('jwt_token');
        const response = await fetch(`http://127.0.0.1:3000/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
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
        // Vahvistetaan, että käyttäjä haluaa varmasti poistaa käyttäjän
        const isConfirmed = confirm(`Are you sure you want to delete the user with ID: ${userId}?`);

        if (!isConfirmed) {
            // Jos käyttäjä ei vahvista, poistutaan funktiosta
            return;
        }

        // Lähetetään DELETE-pyyntö
        const response = await fetch(`http://127.0.0.1:3000/api/users/${userId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete user');
        }

        console.log('User deleted successfully');
        
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}