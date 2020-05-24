import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';

import Modal, { useModal } from 'components/Modal';
import RenderWalletModal from 'components/Modal/RenderWallet';
import { depositDaiToDonutPod, unlockDai } from 'helpers/Pod';
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

    const [currentPrize, setCurrentPrize] = useState('');
    const [estimatedPrize, setEstimatedPrize] = useState('');

    const handleUnlockDai = () =>
        unlockDai(account as string, chainId as number, library, dispatch);

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
                {/* <Account
                    address={account as string}
                    localProvider={localProvider}
                    injectedProvider={injectedProvider}
                    setInjectedProvider={setInjectedProvider}
                    mainnetProvider={mainnetProvider}
                    price={price}
                /> */}
                {currentPrize}
                <br />
                {estimatedPrize}
                {/* <div style={{ padding: 40, textAlign: 'left' }}>
                <SmartContractWallet
                    address={address}
                    injectedProvider={injectedProvider}
                    localProvider={localProvider}
                    price={price}
                    gasPrice={gasPrice}
                />
            </div>
            <div
                style={{
                    position: 'fixed',
                    textAlign: 'right',
                    right: 0,
                    bottom: 20,
                    padding: 10,
                }}
            >
                <Row align="middle" gutter={4}>
                    <Col span={10}>
                        <Provider name={'mainnet'} provider={mainnetProvider} />
                    </Col>
                    <Col span={6}>
                        <Provider name={'local'} provider={localProvider} />
                    </Col>
                    <Col span={8}>
                        <Provider name={'injected'} provider={injectedProvider} />
                    </Col>
                </Row>
            </div>
            <div
                style={{
                    position: 'fixed',
                    textAlign: 'left',
                    left: 0,
                    bottom: 20,
                    padding: 10,
                }}
            >
                <Row align="middle" gutter={4}>
                    <Col span={9}>
                        <Ramp price={price} address={address} />
                    </Col>
                    <Col span={15}>
                        <Faucet localProvider={localProvider} dollarMultiplier={price} />
                    </Col>
                </Row>
            </div> */}
                <Button type="primary" onClick={handleUnlockDai}>
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
            <GlobalStyle />
        </StyledApp>
    );
};

export default App;
