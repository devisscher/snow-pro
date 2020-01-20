import axios from 'axios';


export let allBooks = () => {
    return [{ title: "The Prince", author: 'Machiavelli' }];
};

export async function weather(): Promise<any> {
    return axios.get('https://api.darksky.net/forecast/c35b09c58ee432c47606b9a3a8ac87ba/37.8267,-122.4233').then(result => result.data);
}