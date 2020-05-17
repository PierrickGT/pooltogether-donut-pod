import React from 'react';
import { Button } from 'antd';
import { createGlobalStyle } from 'styled-components';

import Modal, { useModal } from 'components/Modal';
import RenderWalletModal from 'components/Modal/RenderWallet';
import { globalStyles } from 'styles/global';

import { Header } from '../components';

// import { useExchangePrice, useGasPrice } from './hooks';
// import SmartContractWallet from './SmartContractWallet';
import 'antd/dist/antd.css';

// const mainnetProvider = new ethers.providers.InfuraProvider(
//     'mainnet',
//     '2717afb6bf164045b5d5468031b93f87',
// );
// const localProvider = new ethers.providers.JsonRpcProvider(
//     process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : 'http://localhost:8545',
// );

const GlobalStyle = createGlobalStyle`${globalStyles}`;

const App: React.FC = () => {
    const { modalIsOpen: walletModalIsOpen, toggleModal: toggleWalletModal } = useModal();

    // const {
    //     active: walletIsConnected,
    //     account,
    //     chainId,
    //     connector: walletProvider,
    //     error,
    // } = useWeb3React<Web3ReactContextInterface>();

    // const [injectedProvider, setInjectedProvider] = useState();
    // const price = useExchangePrice(mainnetProvider);
    // const gasPrice = useGasPrice('fast');

    return (
        <div className="App">
            <Header />
            <div style={{ position: 'fixed', textAlign: 'right', right: 0, top: 0, padding: 10 }}>
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
        </div>
    );
};

export default App;
