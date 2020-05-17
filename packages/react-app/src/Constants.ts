export const POLLING_INTERVAL = 12000;

// Networks
export const MAINNET_NETWORK_ID = 1;
export const ROPSTEN_NETWORK_ID = 3;
export const RINKEBY_NETWORK_ID = 4;
export const GÖERLI_NETWORK_ID = 5;
export const KOVAN_NETWORK_ID = 42;

export enum NETWORK_CHAIN_ID {
    'Mainnet' = MAINNET_NETWORK_ID,
    'Ropsten' = ROPSTEN_NETWORK_ID,
    'Rinkeby' = RINKEBY_NETWORK_ID,
    'Göerli' = GÖERLI_NETWORK_ID,
    'Kovan' = KOVAN_NETWORK_ID,
}

// For UI purposes, all networks are "supported", but an error message
// is displayed when the user is not connected to the "allowed" network
export const SUPPORTED_CHAIN_IDS = [
    MAINNET_NETWORK_ID,
    ROPSTEN_NETWORK_ID,
    RINKEBY_NETWORK_ID,
    GÖERLI_NETWORK_ID,
    KOVAN_NETWORK_ID,
];
export const SUPPORTED_NETWORKS = ['Kovan'];
