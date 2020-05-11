import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import ReactDOM from 'react-dom';

import App from './App';

import './index.css';

// This is the official Uniswap v1 subgraph. You can replace it with your own, if you need to.
// See all subgraphs: https://thegraph.com/explorer/
const client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/graphprotocol/uniswap',
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root'),
);
