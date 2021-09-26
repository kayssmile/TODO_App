// GRAPHQL Anbindung

// Libary Import

import { GraphQLClient, gql } from 'graphql-request';
const graphQLClient_weather = new GraphQLClient('https://graphql-weather-api.herokuapp.com/');
const graphQLClient = new GraphQLClient('http://localhost:4000/graphql');


// Query Weather API 

var location = "Bern";

const query = gql`

    query {
        getCityByName(name: "${location}", config: {units:metric}){   
            weather{  
              temperature{
                actual
              }
            }
        }
    }
`;

const response = await graphQLClient_weather.request(query);

console.log(response.getCityByName.weather.temperature.actual);

var temperature = document.querySelector(".temp_api");
temperature.innerText = response.getCityByName.weather.temperature.actual;

var entry_test = "lachen";
var entry_test2 = "Open";

// Query Backend API 

const query_newtodo = gql`

    query{

        newtodo(Entry: "${entry_test}", State: "${entry_test2}")

    }

`
const response_backend = await graphQLClient.request(query_newtodo);

console.log(response_backend);