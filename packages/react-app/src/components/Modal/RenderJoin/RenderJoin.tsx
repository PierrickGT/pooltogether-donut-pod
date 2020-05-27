import React, { useEffect } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { utils } from 'ethers';
import { rem } from 'polished';
import styled from 'styled-components';

import { ModalProps } from 'components/Modal';
import { ModalContent, ModalHeader, ModalTitle } from 'components/Modal/style';
import PurchaseTickets from 'components/Purchase';
import UnlockDai, { useUnlockedDai } from 'components/UnlockDai';
import { checkDaiAllowance } from 'helpers/Pod';

const StyledModalContent = styled(ModalContent)`
    min-height: ${rem(326)};
`;

const JoinModal: React.FC<ModalProps> = () => {
    const { account, chainId, library } = useWeb3React<Web3Provider>();

    const { isDaiUnlocked, setDaiUnlocked } = useUnlockedDai();

    const verifyDaiAllowance = async () => {
        const daiAllowance = await checkDaiAllowance(account as string, chainId as number, library);

        if (Number(utils.formatUnits(daiAllowance.toString(), 18)) !== 0) {
            setDaiUnlocked(true);
        }
    };

    // We only check when the modal open or if the account changes
    useEffect(() => {
        verifyDaiAllowance();
    }, [account]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <React.Fragment>
            <ModalHeader>
                <ModalTitle>
                    {isDaiUnlocked ? 'Weekly DONUT Pod: Purchase tickets' : 'Weekly DONUT Pod'}
                </ModalTitle>
            </ModalHeader>
            <StyledModalContent>
                {isDaiUnlocked ? <PurchaseTickets /> : <UnlockDai />}
            </StyledModalContent>
        </React.Fragment>
    );
};

export default JoinModal;
