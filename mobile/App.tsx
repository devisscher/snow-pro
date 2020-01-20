import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://localhost:8084',
});

const GET_WEATHER = gql`
  {
    weather {
      latitude
      longitude
      timezone
      currently {
        time
        summary
      }
    }
  }
`;

const getWeather = (latitude, longitude) => {
  console.log('calling gql endpont with: ', latitude, longitude)
  const { loading, error, data } = useQuery(GET_WEATHER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (<Text>
    {JSON.stringify(data)}
  </Text>);
}

export default function App() {
  const [location, setLocation] = useState()


  const getLocation = () => Geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
      setLocation(position.coords)
      getWeather(location.latitude, location.longitude)
      console.log('location: ', location)
    },
    (error) => {
      // See error code charts below.
      console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );




  useEffect(() => {
    console.log('getting location')
    getLocation()
  }, [])
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text>You are here</Text>
        <Text>
          {`${location.latitude} & ${location.longitude}`}
        </Text>
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
