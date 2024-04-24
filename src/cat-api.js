import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
axios.defaults.headers.common['x-api-key'] =
  'live_UgVCYy4usqmKy3CIngcdFOebz8GEiRBrHMS0Fenl9kOM8Bsw5WiV4OcAoyP1XpvX';

export const fetchBreeds = () => {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      throw error;
    });
};

export const fetchCatByBreed = breedId => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      throw error;
    });
};
