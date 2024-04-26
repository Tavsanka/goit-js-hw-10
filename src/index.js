import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const errorDisplay = document.querySelector('.error');

const displayLoader = () => {
  loader.classList.remove('hidden');
};

const hideLoader = () => {
  loader.classList.add('fade-out');

  setTimeout(() => {
    loader.classList.add('hidden');
    loader.classList.remove('fade-out');
  }, 500);
};

const showError = message => {
  hideLoader();
  Notify.failure(message);
};

const hideError = () => {
  errorDisplay.classList.add('hidden');
  errorDisplay.textContent = '';
};

const populateBreeds = () => {
  displayLoader();
  hideError();

  return fetchBreeds()
    .then(breeds => {
      breedSelect.innerHTML = breeds
        .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
        .join('');
    })
    .catch(error => {
      showError('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      hideLoader();
      breedSelect.classList.remove('hidden');
    });
};

const displayCatInfo = breedId => {
  displayLoader();
  hideError();
  catInfo.classList.add('hidden');

  fetchCatByBreed(breedId)
    .then(data => {
      catInfo.innerHTML = '';
      const cat = data.breeds[0];
      catInfo.innerHTML = `
        <img src="${data.url}" alt="${data.breeds[0].name}" class="cat-image"/>
        <h2>${data.breeds[0].name}</h2>
        <p>${data.breeds[0].description}</p>
        <p>Temperament: ${data.breeds[0].temperament}</p>
      `;
    })
    .catch(error => {
      hideLoader();
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      hideLoader();
      catInfo.classList.remove('hidden');
    });
};

populateBreeds().then(() => {
  const slimSelect = new SlimSelect({
    select: '.breed-select',
  });
});

breedSelect.addEventListener('change', event => {
  const breedId = event.target.value;
  displayCatInfo(breedId);
});
