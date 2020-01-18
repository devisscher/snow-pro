// resolverMap.ts
import { IResolvers } from 'graphql-tools';
import { allBooks, weather } from './controllers'
import axios from 'axios';
const resolverMap: IResolvers = {
    Query: {
        weather(): any {
            return axios.get('https://api.darksky.net/forecast/c35b09c58ee432c47606b9a3a8ac87ba/37.8267,-122.4233').then(result => {
                return result.data
            });
        }
    },
};
export default resolverMap;