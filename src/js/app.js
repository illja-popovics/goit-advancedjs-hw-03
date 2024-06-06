import SlimSelect from 'slim-select';
import axios from 'axios';
import iziToast from 'izitoast';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

axios.defaults.headers.common['x-api-key'] = 'live_Ulsm6F3SSlU51M2azlKsbsbAMBysG1uwU9RenYiPoyCQUpcxTj6FRokyzr2tJxgc';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const catImage = document.querySelector('.cat-image');
const catBreed = document.querySelector('.cat-breed');
const catDescription = document.querySelector('.cat-description');
const catTemperament = document.querySelector('.cat-temperament');



async function initialize() {
    try {
        console.log('Initializing...');
        loader.style.display = 'block';
        error.style.display = 'none';

        const breeds = await fetchBreeds();
        console.log('Fetched breeds:', breeds);
        populateBreedSelect(breeds);
        
        console.log(document.querySelector('.breed-select'));

        loader.style.display = 'none';
        new SlimSelect({
            select: document.querySelector('.breed-select'),
        });
    } catch (err) {
        console.error('Error during initialization:', err);
        loader.style.display = 'none';
        error.style.display = 'block';
        iziToast.error({ title: 'Error', message: err.message });
    }
}

function populateBreedSelect(breeds) {
    breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
    });
}

breedSelect.addEventListener('change', async () => {
    try {
        console.log('Breed selected:', breedSelect.value);
        loader.style.display = 'block';
        catInfo.style.display = 'none';
        error.style.display = 'none';

        const breedId = breedSelect.value;
        const catData = await fetchCatByBreed(breedId);
        console.log('Fetched cat data:', catData);

        catImage.src = catData.url;
        catBreed.textContent = catData.breeds[0].name;
        catDescription.textContent = catData.breeds[0].description;
        catTemperament.textContent = catData.breeds[0].temperament;

        catInfo.style.display = 'flex';
        loader.style.display = 'none';
    } catch (err) {
        loader.style.display = 'none';
        error.style.display = 'block';
        iziToast.error({ title: 'Error', message: "there was a problem while fetching the data" });
    }
});

initialize();
