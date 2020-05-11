import React, { useState } from 'react';
import { DollarCircleOutlined } from '@ant-design/icons';
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';
import { Button, Divider, Modal } from 'antd';

export default function Ramp(props) {
    const [modalUp, setModalUp] = useState('down');

    const type = 'default';

    return (
        <div>
            <Button
                size="large"
                shape="round"
                onClick={() => {
                    setModalUp('up');
                }}
            >
                <DollarCircleOutlined style={{ color: '#52c41a' }} /> {props.price.toFixed(2)}
            </Button>
            <Modal
                title="Buy ETH"
                visible={modalUp === 'up'}
                onCancel={() => {
                    setModalUp('down');
                }}
                footer={[
                    <Button
                        key="back"
                        onClick={() => {
                            setModalUp('down');
                        }}
                    >
                        cancel
                    </Button>,
                ]}
            >
                <p>
                    <Button
                        type={type}
                        size="large"
                        shape="round"
                        onClick={() => {
                            window.open(
                                'https://pay.sendwyre.com/purchase?destCurrency=ETH&sourceAmount=25&dest=' +
                                    props.address,
                            );
                        }}
                    >
                        <span style={{ paddingRight: 15 }}>
                            <span role="img" aria-label="American flag emoji">
                                🇺🇸
                            </span>
                        </span>
                        Wyre
                    </Button>
                </p>
                <p>
                    {' '}
                    <Button
                        type={type}
                        size="large"
                        shape="round"
                        onClick={() => {
                            new RampInstantSDK({
                                hostAppName: 'scaffold-eth',
                                hostLogoUrl: 'https://scaffoldeth.io/scaffold-eth.png',
                                swapAmount: '100000000000000000', // 0.1 ETH in wei  ?
                                swapAsset: 'ETH',
                                userAddress: props.address,
                            })
                                .on('*', (event) => console.log(event))
                                .show();
                        }}
                    >
                        <span style={{ paddingRight: 15 }}>
                            <span role="img" aria-label="English flag emoji">
                                🇬🇧
                            </span>
                        </span>
                        Ramp
                    </Button>
                </p>

                <p>
                    <Button
                        type={type}
                        size="large"
                        shape="round"
                        onClick={() => {
                            window.open('https://www.coinbase.com/buy-ethereum');
                        }}
                    >
                        <span style={{ paddingRight: 15 }}>
                            <span role="img" aria-label="Bank emoji">
                                🏦
                            </span>
                        </span>
                        Coinbase
                    </Button>
                </p>

                <Divider />

                <p>
                    <Button
                        type={type}
                        size="large"
                        shape="round"
                        onClick={() => {
                            window.open(
                                'https://support.mycrypto.com/how-to/getting-started/where-to-get-testnet-ether',
                            );
                        }}
                    >
                        <span style={{ paddingRight: 15 }}>🛠</span> Testnet Faucets
                    </Button>
                </p>
            </Modal>
        </div>
    );
}
