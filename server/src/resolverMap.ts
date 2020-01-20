// resolverMap.ts
import { IResolvers } from 'graphql-tools';
import { allBooks, weather } from './controllers'
import axios from 'axios';

const latitude = '45.470175';
const longitude = '-75.7689021';

const resolverMap: IResolvers = {
    Query: {
        weather(latitude, longitude): any {
            return axios.get(`https://api.darksky.net/forecast/c35b09c58ee432c47606b9a3a8ac87ba/${latitude},${longitude}`).then(result => {
                return result.data
            });
        }
    },
};
export default resolverMap;