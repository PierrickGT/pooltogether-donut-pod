import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Button, Typography } from 'antd';
import { rem } from 'polished';
import styled, { createGlobalStyle } from 'styled-components';

import Header from 'components/Header';
import Modal, { useModal } from 'components/Modal';
import RenderJoinModal from 'components/Modal/RenderJoin';
import RenderWalletModal from 'components/Modal/RenderWallet';
import RenderWithdrawModal from 'components/Modal/RenderWithdraw';
import { getNextAwardDate, getPoolDaiPrize } from 'helpers/Pool';
import Dai from 'images/Dai';
import backgroundDonut from 'images/DiamondBackground.png';
import Donut from 'images/Donut.png';
import Trophy from 'images/Trophy';
import { globalStyles } from 'styles/global';
import { spacingUnit } from 'styles/variables';

import 'antd/dist/antd.css';

const { Title } = Typography;

const GlobalStyle = createGlobalStyle`${globalStyles}`;

const StyledApp = styled.div`
    background-image: url(${backgroundDonut});
    background-color: #230548;
    background-position: center center;
    background-attachment: fixed;
    background-size: 187.85px;
    color: #fff;
    height: 100%;
    text-align: center;
`;

const LandingContent = styled.section`
    padding: ${spacingUnit(3)};
`;

const AppContent = styled.section`
    padding: ${spacingUnit(3)};
`;

const StyledButton = styled(Button)`
    margin: ${spacingUnit(3)} 0;
`;

const StyledDonut = styled.img`
    height: ${rem(48)};
    margin: 0 auto ${spacingUnit(3)};
    width: ${rem(48)};
`;

const StyledTitle = styled(Title)`
    color: #fff !important;
    max-width: ${rem(800)};
    margin: 0 auto;
`;

const StyledTitleApp = styled(Title)`
    color: #fff !important;
    max-width: ${rem(800)};
    margin: ${spacingUnit(4)} auto ${spacingUnit(6)} !important;
`;

const StyledTitlePrize = styled(StyledTitle)`
    margin-top: 0 !important;
`;

const PrizeContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 650px;
    margin: ${spacingUnit(5)} auto;
`;

const App: React.FC = () => {
    const { account, active: walletConnected, chainId, library } = useWeb3React();
    const { modalIsOpen: walletModalIsOpen, toggleModal: toggleWalletModal } = useModal();
    const { modalIsOpen: joinModalIsOpen, toggleModal: toggleJoinModal } = useModal();
    const { modalIsOpen: withdrawModalIsOpen, toggleModal: toggleWithdrawModal } = useModal();

    const [currentPrize, setCurrentPrize] = useState('');
    const [estimatedPrize, setEstimatedPrize] = useState('');

    const handleJoinPod = () => {
        toggleJoinModal();
    };

    const handleWithdrawFromPod = () => {
        toggleWithdrawModal();
    };

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
                {!walletConnected ? (
                    <LandingContent>
                        <StyledDonut src={Donut} />
                        <StyledTitle>Welcome to DONUT Pod!</StyledTitle>
                        <StyledButton type="primary" size="large" onClick={toggleWalletModal}>
                            Join the Pod
                        </StyledButton>
                        <StyledTitle level={2}>
                            DONUT Pod is a PoolTogether Pod built for the r/EthTrader Reddit
                            community.
                        </StyledTitle>
                        <StyledTitle level={3}>
                            You can buy tickets that will then be pooled into the DONUT Pod.
                        </StyledTitle>
                        <StyledTitle level={3}>
                            By grouping your tickets with other members of the community, you
                            increase your chances of winning the weekly DAI Prize!
                        </StyledTitle>
                        <StyledTitle level={4}>
                            This project is currently only available on Kovan test network and you
                            can only buy tickets with DAI. Ultimately, the goal of this project is
                            to allow you to buy DONUT Pod tickets with your hard earned DONUT on
                            r/EthTrader.
                        </StyledTitle>
                    </LandingContent>
                ) : (
                    <AppContent>
                        <Trophy width={65} />
                        <StyledTitleApp level={2}>{`Next prize is ${getNextAwardDate().format(
                            'MMM Do, YYYY',
                        )} at 12:00:00 PST`}</StyledTitleApp>
                        <Button type="primary" size="large" onClick={handleJoinPod}>
                            Deposit into the Pod
                        </Button>
                        <PrizeContainer>
                            <StyledTitlePrize level={3}>
                                Current Prize
                                <br />
                                <span className="vertical-align-middle">{currentPrize}</span>{' '}
                                <Dai width={20} />
                            </StyledTitlePrize>
                            <StyledTitlePrize level={3}>
                                Estimated prize
                                <br />
                                <span className="vertical-align-middle">{estimatedPrize}</span>{' '}
                                <Dai width={20} />
                            </StyledTitlePrize>
                        </PrizeContainer>
                        <Button type="primary" size="large" onClick={handleWithdrawFromPod}>
                            Withdraw from the Pod
                        </Button>
                    </AppContent>
                )}
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
            />
            <Modal
                component={RenderWithdrawModal}
                isOpen={withdrawModalIsOpen}
                toggleModal={toggleWithdrawModal}
                title="Weekly DONUT Pod: Withdraw Tickets"
            />
            <GlobalStyle />
        </StyledApp>
    );
};

export default App;
