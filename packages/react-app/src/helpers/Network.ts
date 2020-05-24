import { AbstractConnector } from '@web3-react/abstract-connector';
import { ethers } from 'ethers';

import { metamask } from 'components/Modal/RenderWallet/connectors';
import { KOVAN_NETWORK_ID, LOCAL_NETWORK_ID, MAINNET_NETWORK_ID } from 'Constants';

export const isMainNetwork = (networkId: number) => networkId === MAINNET_NETWORK_ID;
export const isKovanNetwork = (networkId: number) => networkId === KOVAN_NETWORK_ID;
export const isLocalNetwork = (networkId: number) => networkId === LOCAL_NETWORK_ID;

export const getProvider = (networkId: number) => {
    if (isMainNetwork(networkId)) {
        return new ethers.providers.EtherscanProvider(
            'mainnet',
            process.env.REACT_APP_ETHERSCAN_KEY,
        );
    }

    if (isKovanNetwork(networkId)) {
        return new ethers.providers.EtherscanProvider('kovan', process.env.REACT_APP_ETHERSCAN_KEY);
    }

    return new ethers.providers.JsonRpcProvider(process.env.REACT_APP_LOCAL_PROVIDER);
};

export const getWalletName = (walletProvider: AbstractConnector) => {
    if (walletProvider === metamask) {
        return 'Metamask';
    }
};
