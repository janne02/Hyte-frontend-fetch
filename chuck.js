document.querySelector('.chuckbutton').addEventListener('click', function() {
    fetch('https://api.chucknorris.io/jokes/random')
        .then(response => response.json())
        .then(data => {
        document.querySelector
        ('.show_joke').innerText = data.value;
    });
});

  
