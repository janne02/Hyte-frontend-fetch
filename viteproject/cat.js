const button = document.createElement('kissabutton');
document.querySelector('ImageContainer');       // get element whose id is 'example'

    const i = document.createElement('img');                // create img element
    i.src = 'http://placekitten.com/321/241';               // set src attribute
    i.alt = 'Cat';                                        // set alt attribute
    
    const t = document.createTextNode('Here is some of text with a picture.');  // create text node

    const p = document.createElement('p');                  // create p element
    p.appendChild(t);                                       // add text to p element
    p.appendChild(i);                                       // add image to p element

    div.appendChild(p);