export function showPics(element) {

    //versio 1, haetaan kissakuvat json tiedostosta
    //ja muokataan index.html  tietoja
    async function getPics() {
        console.log('Haetaan kuvat paikallisesta json tiedostosta');
        
        try {
            //fetch 
            const response = fetch('catpics.json');
            if(!response.ok) throw new Error('Huono haku!!');
            const images = (await response).json();

            console.log(images);
            const alt = images[1].name;
            const figurecap = images[1].description;
            const imagesrc = images[1].address;

                //haetaan kuvaelementti html tiedostosta
            const kuva = document.querySelector('img');
            kuva.src = imagesrc;
            kuva.alt = alt;
                //haetaan kuvateksti html tiedostosta
            const kuvateksti = document.querySelector('figcaption');
            kuvateksti.innerText = figurecap;

        }catch (error) {
            console.log(error);
        }
    } 
    //versio 2, jossa luodaan dom elementit itse
    async function createPics() {
        console.log('Haetaan kuvat paikallisesta json tiedostosta');
        
        try {
            //fetch 
            const response = fetch('catpics.json');
            if(!response.ok) throw new Error('Huono haku!!');
            const images = await response.json();
            // loopataan kaikki kissakuvat läpi ja generoidaan
            // jokaisesta figure, img ja figcaptionelementit
            images.forEach(element => {
                console.log(`Nimi: ${element.name}`);
            });
            console.log(images);

            //luodaan yksi figure
            //haetaan ensin elementti johon haluat että kuvat lisätään
            const kart = document.querySelector('#kart');
            kart.innerHTML = '';

            const alt = images[1].name;
            const figurecap = images[1].description;
            const imagesrc = images[1].address;

            // luo uusi figure elementti
            const figure = document.createElement('figure');
            kart.appendChild(figure);

            // luodaan img elementti
            const image = document.createElement('img');
            image.src = imagesrc;
            image.alt = alt;

            figure.appendChild(image);

            // luodaan figcaption elementti
            const figurecaption = document.createElement('figurecaption');
            // luodaan teksti figcaptionni sisälle
            const node = document.createTextNode(figurecap);
            // lisätään se figcaptionin lapseksi
            figurecaption.appendChild(node);

            figure.appendChild(figurecaption);

        } catch(error) {
            console.log(error);
        }
    } 
    //versio 3 loopataan kaikki kuvat
    async function createPics2() {
        console.log('Luodaan kuvat lennossa!');
    
        try {
          // fetch
          const response = await fetch('catpics.json');
          if (!response.ok) throw new Error('Huono haku!!');
          const images = await response.json();
    
          console.log(images);
          console.log('Tehdään loopissa');
    
          // luodaan yksi figure
          // haetaan ensin elementti jojhon haluat että kuvat lisätään
          const cards = document.querySelector('#cards');
          cards.innerHTML = '';
    
          // loopataan kaikki kissakuvat läpi ja generoidaan
          // jokaisesta figure, img ja figcaption elementit
          images.forEach((item) => {
            console.log(`Nimi: ${item.name}`);
    
            // luo uusi figure elementti
            const figure = document.createElement('figure');
            cards.appendChild(figure);
    
            // luodaan img elementti
            const image = document.createElement('img');
            image.src = item.address;
            image.alt = item.name;
    
            figure.appendChild(image);
    
            // luodaan figcaption elementti
            const figurecaption = document.createElement('figurecaption');
            // luodaa teksti figcaptionin sisälle
            const node = document.createTextNode(item.description);
            // lisätää se figcaptionin lapseksi
            figurecaption.appendChild(node);
    
            figure.appendChild(figurecaption);
          });
    
          // kommentti
        } catch (error) {
          console.log(error);
        }
      }
    console.log(element);
    //element.addEventListener('click', () => getPics());
    element.addEventListener('click', () => createPics2());
}

    