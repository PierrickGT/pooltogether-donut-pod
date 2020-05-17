import React from 'react';
// import WalletConnectProvider from '@walletconnect/web3-provider';
// import { Button } from 'antd';
// import BurnerProvider from 'burner-provider';
import { ethers } from 'ethers';
// import Web3Modal from 'web3modal';

// import { usePoller } from '../hooks';

// import { Address, Balance } from '.';

// const INFURA_ID = '2717afb6bf164045b5d5468031b93f87'; // MY INFURA_ID, SWAP IN YOURS!

// const web3Modal = new Web3Modal({
//     //network: "mainnet", // optional
//     cacheProvider: true, // optional
//     providerOptions: {
//         walletconnect: {
//             package: WalletConnectProvider, // required
//             options: {
//                 infuraId: INFURA_ID,
//             },
//         },
//     },
// });

interface AccountProps {
    address: string;
    setAddress: () => void;
    localProvider: ethers.providers.JsonRpcProvider;
    injectedProvider: string;
    setInjectedProvider: () => void;
    mainnetProvider: ethers.providers.InfuraProvider;
    price: number;
}

const Account: React.FC<AccountProps> = ({
    address,
    setAddress,
    localProvider,
    injectedProvider,
    setInjectedProvider,
    mainnetProvider,
    price,
}) => {
    // const pollInjectedProvider = useCallback(async () => {
    //     if (injectedProvider) {
    //         let accounts = await injectedProvider.listAccounts();
    //         if (accounts && accounts[0] && accounts[0] !== account) {
    //             //console.log("ADDRESS: ",accounts[0])
    //             if (typeof setAddress == 'function') setAddress(accounts[0]);
    //         }
    //     }
    // }, [injectedProvider, setAddress]);

    // usePoller(
    //     () => {
    //         pollInjectedProvider();
    //     },
    //     pollTime ? pollTime : 1999,
    // );

    // const loadWeb3Modal = useCallback(async () => {
    //     const provider = await web3Modal.connect();
    //     //console.log("GOT CACHED PROVIDER FROM WEB3 MODAL",provider)
    //     setInjectedProvider(new ethers.providers.Web3Provider(provider));
    //     pollInjectedProvider();
    // }, [pollInjectedProvider, setInjectedProvider]);

    // const logoutOfWeb3Modal = () => {
    //     web3Modal.clearCachedProvider();
    //     //console.log("Cleared cache provider!?!",clear)
    //     setTimeout(() => {
    //         window.location.reload();
    //     }, 1);
    // };

    // let modalButtons = [];
    // if (web3Modal.cachedProvider) {
    //     modalButtons.push(
    //         <Button
    //             key="logoutbutton"
    //             style={{ verticalAlign: 'top', marginLeft: 8, marginTop: 4 }}
    //             shape={'round'}
    //             size={'large'}
    //             onClick={logoutOfWeb3Modal}
    //         >
    //             logout
    //         </Button>,
    //     );
    // } else {
    //     modalButtons.push(
    //         <Button
    //             key="loginbutton"
    //             style={{ verticalAlign: 'top', marginLeft: 8, marginTop: 4 }}
    //             shape={'round'}
    //             size={'large'}
    //             type={'primary'}
    //             onClick={loadWeb3Modal}
    //         >
    //             connect
    //         </Button>,
    //     );
    // }

    // useEffect(() => {
    //     if (web3Modal.cachedProvider) {
    //         loadWeb3Modal();
    //     }
    // }, [loadWeb3Modal]);

    return (
        <div>
    {/* //         {address ? <Address value={address} ensProvider={mainnetProvider} /> : 'Connecting...'}
    //         <Balance address={address} provider={injectedProvider} dollarMultiplier={price} />
    //         {modalButtons} */}
        </div>
    );
};

export default Account;
