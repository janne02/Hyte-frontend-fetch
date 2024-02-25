const fetchbutton = document.getElementById('button5');
fetchbutton.addEventListener('click', showDiary);



// Fetch all users
async function showDiary() {

sessionStorage.setItem('jwt_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJjcmVhdGVkX2F0IjoiMjAyNC0wMS0wMVQwNzowMDowMC4wMDBaIiwidXNlcl9sZXZlbCI6InJlZ3VsYXIiLCJpYXQiOjE3MDg4NTg1NTMsImV4cCI6MTcwODk0NDk1M30.a1f42A84RaAxTRuJz3gtX5QNIxCK6Q-u5ULM3zrm9qw');

  try {
    const token = sessionStorage.getItem('jwt_token');


    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch('http://127.0.0.1:3000/api/entries/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Unauthorized');
    }

    const data = await response.json();
    console.log(data);

    const container = document.getElementById('container1');
    container.innerHTML = '';

    data.forEach(element => {
      const card = createCard(element);
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    
  }
}

function createCard(entry) {
  const card = document.createElement('div');
  card.classList.add('card');

  const entryId = document.createElement('p');
  entryId.textContent = `entry_id: ${entry.entry_id}`;
  card.appendChild(entryId);

  const userId = document.createElement('p');
  userId.textContent = `user_id: ${entry.user_id}`;
  card.appendChild(userId);

  const entryDate = document.createElement('p');
  entryDate.textContent = `user_id: ${entry.entry_date}`;
  card.appendChild(entryDate);

  const mood0 = document.createElement('p');
  mood0.textContent = `mood: ${entry.mood}`;
  card.appendChild(mood0);

  const weight0 = document.createElement('p');
  weight0.textContent = `weight: ${entry.weight}`;
  card.appendChild(weight0);

  const sleep_hours0 = document.createElement('p');
  sleep_hours0.textContent = `sleep_hours: ${entry.sleep_hours}`;
  card.appendChild(sleep_hours0);

  const notes0 = document.createElement('p');
  notes0.textContent = `notes: ${entry.notes}`;
  card.appendChild(notes0);

  console.log(entryId, userId,entryDate,mood0,weight0,sleep_hours0,notes0);

  return card;
}
export {showDiary,createCard};