import React, { useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Button } from 'antd';
import { utils } from 'ethers';
import { rem } from 'polished';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { ModalProps } from 'components/Modal';
import { ModalContent, ModalHeader, ModalTitle } from 'components/Modal/style';
import { checkDaiAllowance, unlockDai } from 'helpers/Pod';
import Lock from 'images/Lock';
import { purple } from 'styles/colors';
import { lineHeight, size as fontSize } from 'styles/fonts';
import { spacingUnit } from 'styles/variables';

interface RenderUnlockDaiProps {
    handleUnlockDai: () => void;
}

const RenderUnlockDai: React.FC<RenderUnlockDaiProps> = ({ handleUnlockDai }) => {
    const LockContainer = styled.div`
        align-items: center;
        background-color: ${purple[4]};
        border-radius: 50%;
        display: flex;
        height: ${rem(96)};
        justify-content: center;
        margin: 0 auto ${spacingUnit(3)};
        width: ${rem(96)};
    `;

    const StyledText = styled.p`
        font-size: ${fontSize.large};
        line-height: ${lineHeight.large};
        margin: 0 auto ${spacingUnit(3)};
        max-width: ${rem(410)};
        width: 100%;
    `;

    return (
        <React.Fragment>
            <LockContainer>
                <Lock />
            </LockContainer>
            <StyledText>
                PoolTogether requires your approval to transact DAI with the Pool
            </StyledText>
            <Button type="primary" size="large" onClick={handleUnlockDai}>
                Allow DAI
            </Button>
        </React.Fragment>
    );
};

const RenderPurchaseTickets: React.FC = (): any => {
    return (
        <React.Fragment>
            <p>Purchase tickets</p>
        </React.Fragment>
    );
};

const WalletModal: React.FC<ModalProps> = ({ title, toggleModal }) => {
    const { account, chainId, library } = useWeb3React<Web3Provider>();

    const dispatch = useDispatch();

    const [isDaiUnlocked, setDaiUnlocked] = useState(false);

    const verifyDaiAllowance = async () => {
        const daiAllowance = await checkDaiAllowance(account as string, chainId as number, library);

        if (Number(utils.formatUnits(daiAllowance.toString(), 18)) !== 0) {
            setDaiUnlocked(true);
        }
    };

    const handleUnlockDai = () => {
        unlockDai(account as string, chainId as number, library, dispatch);
    };

    // We only check when the modal open or if the account changes
    useEffect(() => {
        verifyDaiAllowance();
    }, [account]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <React.Fragment>
            <ModalHeader>
                <ModalTitle>
                    {isDaiUnlocked
                        ? 'Weekly DAI Pool: Purchase tickets'
                        : 'Weekly DONUT Pod: Allow'}
                </ModalTitle>
            </ModalHeader>
            <ModalContent>
                {isDaiUnlocked ? (
                    <RenderPurchaseTickets />
                ) : (
                    <RenderUnlockDai handleUnlockDai={handleUnlockDai} />
                )}
            </ModalContent>
        </React.Fragment>
    );
};

export default WalletModal;
