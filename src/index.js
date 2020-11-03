console.log('%c HI', 'color: firebrick')

function fetchImg() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/6"

    fetch(imgUrl)
        .then(response => response.json())
        .then(results => {
            results.message.forEach(json => renderImg(json))
        });
}

function renderImg(dogImg) {
    const container = document.getElementById('dog-image-container');
    const img = document.createElement('img');
    img.src = dogImg;
    container.appendChild(img);
}

function loadBreedOptions() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'

    fetch(breedUrl)
        .then(res => res.json())
        .then(results => {
            breeds = Object.keys(results.message);

            updateBreedList(breeds);
            addBreedSelectListener();
        });
}

function updateBreedList(breeds) {
    let ul = document.querySelector('#dog-breeds');

    removeChildren(ul);
    breeds.forEach(breed => addBreed(breed));
}

function removeChildren(element) {
    let child = element.lastElementChild;

    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}

function selectBreedsStartingWith(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectListener() {
    let breedDropdown = document.querySelector('#breed-dropdown');

    breedDropdown.addEventListener('change', function (event) {
        selectBreedsStartingWith(event.target.value);
    });
}

function addBreed(breed) {
    let ul = document.querySelector('#dog-breeds');
    let li = document.createElement('li');

    li.innerText = breed;
    li.style.cursor = 'pointer';
    ul.appendChild(li);
    li.addEventListener('click', updateColor);
}

function updateColor(event) {
    event.target.style.color = 'palevioletred';
}

document.addEventListener('DOMContentLoaded', function () {
    fetchImg();
    // loadBreedOptions();
});