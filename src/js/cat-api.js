import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_Ulsm6F3SSlU51M2azlKsbsbAMBysG1uwU9RenYiPoyCQUpcxTj6FRokyzr2tJxgc';

export async function fetchBreeds() {
    try {
        const response = await axios.get('https://api.thecatapi.com/v1/breeds');
        return response.data;
    } catch (err) {
        throw new Error('Failed to fetch breeds');
    }
}

export async function fetchCatByBreed(breedId) {
    try {
        const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
        return response.data[0];
    } catch (err) {
        throw new Error('Failed to fetch cat information');
    }
}
