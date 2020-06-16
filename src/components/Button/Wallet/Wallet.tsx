import React, { useEffect, useState } from 'react';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';
import { Button } from 'antd';
import styled from 'styled-components';

import { purple } from 'styles/colors';
import { size as fontSize } from 'styles/fonts';
import { borderRadius, spacingUnit } from 'styles/variables';
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

const StyledButton = styled(Button)`
    background-color: ${purple[2]};
    border-radius: ${borderRadius};
    border: none;
    color: #fff;
    height: auto;
    padding: ${spacingUnit(2)};

    &:active,
    &:focus,
    &:hover {
        background: ${purple[1]};
        background-color: ${purple[1]};
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

        span {
            color: #fff !important;
        }
    }

    &::before {
        background: ${purple[1]};
    }
`;

const StyledText = styled.span`
    color: ${purple[0]};
    font-size: ${fontSize.big};
    margin-left: ${spacingUnit()};
    text-align: center;
    vertical-align: middle;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition-property: all;
    transition-duration: 0.3s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
    transition-delay: 0s;
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

        if (selectedWallet) {
            setShowSpinner(true);
        }
    }, [active, error, selectedWallet, showSpinner]);

    const handleClick = async () => {
        if (!invalid && !selectedWallet) {
            setSelectedWallet(walletProvider);
            await activate(walletProvider);
        }
    };

    return (
        <StyledButton
            icon={React.cloneElement(logo, { fill: '#fff' })}
            onClick={handleClick}
            loading={showSpinner}
        >
            <StyledText>{`${title} ${
                invalid ? 'is not supported in offline mode.' : ''
            }`}</StyledText>
        </StyledButton>
    );
};

export default WalletButton;
