import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Button } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';

import Modal, { useModal } from 'components/Modal';
import RenderWalletModal from 'components/Modal/RenderWallet';
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
    const { account, active: walletConnected, chainId, library } = useWeb3React();
    const { modalIsOpen: walletModalIsOpen, toggleModal: toggleWalletModal } = useModal();

    const [currentPrize, setCurrentPrize] = useState('');
    const [estimatedPrize, setEstimatedPrize] = useState('');

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
        }
    }, [walletConnected]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <StyledApp>
            <Header />
            <div
                style={{
                    position: 'fixed',
                    textAlign: 'right',
                    right: 0,
                    top: 0,
                    padding: 10,
                }}
            >
                <Button type="primary" onClick={toggleWalletModal}>
                    Connect wallet
                </Button>
                {/* <Account
                    address={account as string}
                    localProvider={localProvider}
                    injectedProvider={injectedProvider}
                    setInjectedProvider={setInjectedProvider}
                    mainnetProvider={mainnetProvider}
                    price={price}
                /> */}
            </div>
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
