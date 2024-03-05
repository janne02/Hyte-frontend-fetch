
export function show_joke(element) {


    //fetch funktio
    async function getJoke() {
        console.log('Hello');
        try {
            //yritetään haku
            const response = await fetch('https://api.chucknorris.io/jokes/random');
            console.log(response);
            if(!response.ok) throw new Error('Huono haku!!');

            //Tämäki voi kestää
            const jokes = await response.json();
            console.log(jokes);
            console.log(jokes.value);
 

            //viedään se divii
            document.querySelector('.show_joke').innerHTML = jokes.values;
        } catch (error) {
            //Jos virhe niin tehdään jotain
            console.log(error);
        }
    } 
     // getData();
    console.log(element);

    element.addEventListener('click', () => getJoke());
}

    