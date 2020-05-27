import React, { useEffect, useState } from 'react';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { Button, PageHeader } from 'antd';
import { utils } from 'ethers';
import pluralize from 'pluralize';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from 'app/rootReducer';
import { NETWORK_CHAIN_ID } from 'Constants';
import { getWalletName } from 'helpers/Network';
import { getUserPendingDeposit, getUserPodBalance, getUserPodShares } from 'helpers/Pod';
import EthTraderLogo from 'images/EthTraderLogo.png';
import PoolTogetherLogo from 'images/PoolTogetherLogo';

const PoolTogetherLogoContainer = styled.span`
    vertical-align: middle;
`;

const StyledEthTraderLogo = styled.img`
    border-radius: 50%;
    vertical-align: middle;
    height: 42px;
`;

const StyledPageHeader = styled(PageHeader)`
    color: #fff;

    .ant-page-header-heading-sub-title {
        color: #fff;
    }

    .ant-page-header-heading {
        align-items: center;
    }

    .ant-page-header-heading-left,
    .ant-page-header-heading-extra {
        margin: 0;
    }

    .ant-page-header-heading-extra {
        align-items: center;
        display: flex;
        height: 66px;
    }
`;

const StyledWalletInfo = styled.div`
    text-align: right;
`;

const Title = () => {
    return (
        <React.Fragment>
            <PoolTogetherLogoContainer>
                <PoolTogetherLogo />
            </PoolTogetherLogoContainer>
            <CloseOutlined style={{ color: '#fff', padding: '0 8px', verticalAlign: 'middle' }} />
            <StyledEthTraderLogo src={EthTraderLogo} />
        </React.Fragment>
    );
};

interface HeaderProps {
    toggleWalletModal: () => void;
}

const ToggleWalletModalButton: React.FC<HeaderProps> = ({ toggleWalletModal }): any => {
    const {
        account,
        active: walletConnected,
        chainId,
        connector: walletProvider,
        deactivate: disconnectWallet,
        library,
    } = useWeb3React();

    const { completed: transactionCompleted } = useSelector(
        (state: RootState) => state.transaction,
    );

    const [userBalance, setUserBalance] = useState(0);

    useEffect(() => {
        if (walletConnected) {
            const calculateBalance = async () => {
                const userBalance = await getUserPodBalance(
                    account as string,
                    chainId as number,
                    library,
                );

                const userPendingDeposit = await getUserPendingDeposit(
                    account as string,
                    chainId as number,
                    library,
                );

                const userPodShares = await getUserPodShares(
                    account as string,
                    chainId as number,
                    library,
                );

                console.log(
                    'userPodShares',
                    Number(utils.formatUnits(userPodShares.toString(), 18)),
                );

                const formattedUserBalance = Number(utils.formatUnits(userBalance.toString(), 18));

                console.log('formattedUserBalance', formattedUserBalance);

                const formattedUserPendingDeposit = Number(
                    utils.formatUnits(userPendingDeposit.toString(), 18),
                );

                console.log('formattedUserPendingDeposit', formattedUserPendingDeposit);

                setUserBalance(formattedUserBalance + formattedUserPendingDeposit);
            };

            calculateBalance();
        }
    }, [account, chainId, library, transactionCompleted, walletConnected]);

    return walletConnected ? (
        <StyledWalletInfo>
            <div className="inline-block margin-right-double vertical-align-middle">
                <p className="ellipsis no-margin">
                    {account &&
                        account.substr(0, 6) +
                            '...' +
                            account.substr(account.length - 4, account.length)}
                </p>
                <p className="no-margin">
                    {walletProvider && (
                        <span className="margin-right">{getWalletName(walletProvider)}</span>
                    )}
                    {chainId && <span>{NETWORK_CHAIN_ID[chainId]}</span>}
                </p>
                <p className="no-margin">{`You have ${userBalance} Pod ${pluralize(
                    'ticket',
                    userBalance,
                )}`}</p>
            </div>
            <CloseCircleOutlined onClick={disconnectWallet} style={{ fontSize: '16px' }} />
        </StyledWalletInfo>
    ) : (
        <Button type="primary" onClick={toggleWalletModal}>
            Connect wallet
        </Button>
    );
};

const Header: React.FC<HeaderProps> = ({ toggleWalletModal }) => {
    return (
        <div>
            <StyledPageHeader
                title={<Title />}
                subTitle="r/EthTrader Pod"
                extra={[<ToggleWalletModalButton key="1" toggleWalletModal={toggleWalletModal} />]}
            />
        </div>
    );
};

export default Header;
