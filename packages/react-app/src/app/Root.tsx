import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import ApolloClient from 'apollo-boost';
import { Provider as ReduxProvider } from 'react-redux';

import { POLLING_INTERVAL } from 'Constants';

import routing from './Routing';
import store from './store';

const client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/pooltogether/pooltogether-kovan',
});

const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc): Web3Provider => {
    const library = new Web3Provider(provider);
    library.pollingInterval = POLLING_INTERVAL;
    console.log('library', library);
    return library;
};

const Root = () => {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <ApolloProvider client={client}>
                <ReduxProvider store={store}>{routing}</ReduxProvider>
            </ApolloProvider>
        </Web3ReactProvider>
    );
};

export default Root;
