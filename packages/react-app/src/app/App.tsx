import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';

import Modal, { useModal } from 'components/Modal';
import RenderJoinModal from 'components/Modal/RenderJoin';
import RenderWalletModal from 'components/Modal/RenderWallet';
import { depositDaiToDonutPod } from 'helpers/Pod';
import { getPoolDaiPrize } from 'helpers/Pool';
import backgroundDonut from 'images/DiamondBackground.png';
import { globalStyles } from 'styles/global';

import { Header } from '../components';

// import { useExchangePrice, useGasPrice } from './hooks';
// import SmartContractWallet from './SmartContractWallet';
import 'antd/dist/antd.css';

const GlobalStyle = createGlobalStyle`${globalStyles}`;

const StyledApp = styled.div`
    background-image: url(${backgroundDonut});
    background-color: #230548;
    background-position: center center;
    background-attachment: fixed;
    background-size: 187.85px;
    height: 100%;
`;

const App: React.FC = () => {
    const dispatch = useDispatch();

    const { account, active: walletConnected, chainId, library } = useWeb3React();
    const { modalIsOpen: walletModalIsOpen, toggleModal: toggleWalletModal } = useModal();
    const { modalIsOpen: joinModalIsOpen, toggleModal: toggleJoinModal } = useModal();

    const [currentPrize, setCurrentPrize] = useState('');
    const [estimatedPrize, setEstimatedPrize] = useState('');

    const handleJoinPod = () => {
        toggleJoinModal();
    };

    const handleDepositDai = () =>
        depositDaiToDonutPod(account as string, chainId as number, library, dispatch);

    useEffect(() => {
        if (walletConnected) {
            const getPrize = async () => {
                const { prizeInDai, prizeEstimateInDai } = await getPoolDaiPrize(
                    account as string,
                    chainId as number,
                    library,
                );

                setCurrentPrize(Number(prizeInDai).toFixed(4));
                setEstimatedPrize(Number(prizeEstimateInDai).toFixed());
            };

            getPrize();

            if (walletModalIsOpen) {
                toggleWalletModal();
            }
        }
    }, [walletConnected]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <StyledApp>
            <div className="container full-height-viewport">
                <Header toggleWalletModal={toggleWalletModal} />
                {currentPrize}
                <br />
                {estimatedPrize}
                <Button type="primary" onClick={handleJoinPod}>
                    Join the Pod
                </Button>
                <Button type="primary" onClick={handleDepositDai}>
                    Deposit DAI to the Pod
                </Button>
            </div>
            <Modal
                component={RenderWalletModal}
                isOpen={walletModalIsOpen}
                toggleModal={toggleWalletModal}
                title="Select a Wallet"
            />
            <Modal
                component={RenderJoinModal}
                isOpen={joinModalIsOpen}
                toggleModal={toggleJoinModal}
                title=""
            />
            <GlobalStyle />
        </StyledApp>
    );
};

export default App;
