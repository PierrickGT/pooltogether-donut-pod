import React, { useEffect, useState } from 'react';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';
import { Card } from 'antd';
import styled from 'styled-components';

import Spinner from 'components/Spinner';
import { size as fontSize } from 'styles/fonts';
import { Web3ReactContextInterface } from 'types/web3-react';

interface WalletButtonProps {
    error: Error | undefined;
    invalid?: boolean;
    logo: React.ReactElement;
    selectedWallet: AbstractConnector;
    setSelectedWallet(wallet?: AbstractConnector): void;
    title: string;
    walletProvider: any; //TODO: find a better type
}

const StyledText = styled.p`
    margin: auto;
    font-size: ${(p: { invalid?: boolean }) => (p.invalid ? fontSize.small : fontSize.large)};
    text-align: center;
`;

const WalletButton: React.FC<WalletButtonProps> = ({
    error,
    invalid,
    logo,
    selectedWallet,
    setSelectedWallet,
    title,
    walletProvider,
}) => {
    const { activate, active } = useWeb3React<Web3ReactContextInterface>();
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        if (error || active) {
            setShowSpinner(false);
        }
    }, [active, error]);

    const handleClick = async () => {
        if (!invalid && !selectedWallet) {
            setShowSpinner(true);
            setSelectedWallet(walletProvider);
            await activate(walletProvider);
        }
    };

    return (
        <Card onClick={handleClick}>
            {React.cloneElement(logo, { fill: '#000' })}
            <StyledText invalid={invalid}>
                {`${title} ${invalid ? 'is not supported in offline mode.' : ''}`}
            </StyledText>
            {showSpinner && <Spinner />}
        </Card>
    );
};

export default WalletButton;
