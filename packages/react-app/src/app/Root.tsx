import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { Web3ReactProvider } from '@web3-react/core';
import ApolloClient from 'apollo-boost';
import { ethers } from 'ethers';
import { Provider as ReduxProvider } from 'react-redux';

import { POLLING_INTERVAL } from 'Constants';

import routing from './Routing';
import store from './store';

const client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/pooltogether/pooltogether-kovan',
});

const getLibrary = (provider: any): any => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = POLLING_INTERVAL;
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
