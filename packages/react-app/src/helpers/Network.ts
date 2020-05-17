import { KOVAN_NETWORK_ID, MAINNET_NETWORK_ID } from 'Constants';

export const isMainNetwork = (networkId: number) => networkId === MAINNET_NETWORK_ID;
export const isKovanNetwork = (networkId: number) => networkId === KOVAN_NETWORK_ID;
