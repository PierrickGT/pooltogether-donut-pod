// import { useState } from 'react';
// import { abis, addresses, MAINNET_ID } from '@pooltogether-donut-pod/contracts';
// import { ethers } from 'ethers';

// import { usePoller } from '.';

export default function useExchangePrice(
) {
    // const [price, setPrice] = useState(0);

    // const pollPrice = () => {
    //     async function getPrice() {
    //         const ethDaiExchangeContract = new ethers.Contract(
    //             addresses[MAINNET_ID].exchanges['ETH-DAI'],
    //             abis.exchange,
    //             mainnetProvider,
    //         );
    //         const exchangeRate = await ethDaiExchangeContract.getEthToTokenInputPrice(
    //             '10000000000000000000',
    //         );
    //         setPrice(parseFloat(exchangeRate.div('100000000000000000')) / 100);
    //     }
    //     getPrice();
    // };
    // usePoller(pollPrice, pollTime);

    // return price;
}
