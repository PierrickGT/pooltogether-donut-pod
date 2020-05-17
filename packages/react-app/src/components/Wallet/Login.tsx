import React, { useEffect } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import {
    InjectedConnector,
    InjectedConnector as MetamaskConnector,
} from '@web3-react/injected-connector';
import { Button } from 'antd';

import { useModal } from 'components/Modal';
import { KOVAN_NETWORK_ID, SUPPORTED_CHAIN_IDS } from 'Constants';
import { Web3ReactContextInterface } from 'types/web3-react';
// const {
//     active: walletIsConnected,
//     account,
//     chainId,
//     connector: walletProvider,
//     error,
// } = useWeb3React<Web3ReactContextInterface>();

export const metamask: InjectedConnector = new MetamaskConnector({
    supportedChainIds: SUPPORTED_CHAIN_IDS,
});

const Login: React.FC = () => {
    const { modalIsOpen: walletModalIsOpen, toggleModal: toggleWalletModal } = useModal();

    // const {
    //     activate: connectTo,
    //     active: walletIsConnected,
    //     account,
    //     chainId,
    //     connector: walletProvider,
    //     library,
    //     error,
    // } = useWeb3React<Web3ReactContextInterface>();

    // useEffect(() => {
    //     console.log('error', error);
    //     console.log('walletIsConnected', walletIsConnected);
    //     console.log('walletProvider', walletProvider);
    //     console.log('library', library);
    // }, [error, library, walletIsConnected, walletProvider]);

    return (
        <Button type="primary" onClick={toggleWalletModal}>
            Connect wallet
        </Button>
    );
};

export default Login;
