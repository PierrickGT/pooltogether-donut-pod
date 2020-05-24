import { abis, addresses } from '@pooltogether-donut-pod/contracts';
import { Contract, utils } from 'ethers';

import { ERC_20_DECIMALS } from 'Constants';
import { nonConstantMethodCall } from 'helpers/Contract';
import { sendTransaction } from 'helpers/sendTransactionSlice';

export const unlockDai = async (account: string, chainId: number, library: any, dispatch: any) => {
    const daiTokenAddress = addresses[chainId as number].tokens.dai;
    const donutPodAddress = addresses[chainId as number].contracts.donutPod;

    const daiTokenContract = new Contract(
        daiTokenAddress,
        abis.ERC20.abi,
        library.getSigner(account),
    );

    const params = [
        donutPodAddress,
        utils.parseUnits('1000000000', ERC_20_DECIMALS),
        {
            gasLimit: 200000,
        },
    ];

    dispatch(sendTransaction(daiTokenContract, 'approve', params));
};

export const depositDaiToDonutPod = async (
    account: string,
    chainId: number,
    library: any,
    dispatch: any,
) => {
    const donutPodAddress = addresses[chainId as number].contracts.donutPod;

    const donutPodContract = new Contract(
        donutPodAddress,
        abis.Pod.abi,
        library.getSigner(account),
    );

    const params = [
        utils.parseUnits('1', ERC_20_DECIMALS),
        utils.hashMessage(''),
        {
            gasLimit: 1500000,
        },
    ];

    dispatch(sendTransaction(donutPodContract, 'deposit', params));
};

export const getUserBalance = async (account: string, chainId: number, library: any) => {
    const donutPodAddress = addresses[chainId as number].contracts.donutPod;

    const donutPodContract = new Contract(
        donutPodAddress,
        abis.Pod.abi,
        library.getSigner(account),
    );

    const userBalance = await nonConstantMethodCall(donutPodContract, 'balanceOf', library, [
        account,
    ]);

    return userBalance;
};

export const getUserPendingDeposit = async (account: string, chainId: number, library: any) => {
    const donutPodAddress = addresses[chainId as number].contracts.donutPod;

    const donutPodContract = new Contract(
        donutPodAddress,
        abis.Pod.abi,
        library.getSigner(account),
    );

    const userPendingDeposit = await nonConstantMethodCall(
        donutPodContract,
        'pendingDeposit',
        library,
        [account],
    );

    return userPendingDeposit;
};

export const withdrawFromDonutPod = async (
    account: string,
    chainId: number,
    library: any,
    dispatch: any,
) => {
    const donutPodAddress = addresses[chainId as number].contracts.donutPod;

    const donutPodContract = new Contract(
        donutPodAddress,
        abis.Pod.abi,
        library.getSigner(account),
    );

    const params = [
        utils.parseUnits('1', ERC_20_DECIMALS),
        utils.hashMessage(''),
        {
            gasLimit: 700000,
        },
    ];

    dispatch(sendTransaction(donutPodContract, 'redeem', params));
};

export const redeemToDaiPool = async (
    account: string,
    chainId: number,
    library: any,
    dispatch: any,
) => {
    const donutPodAddress = addresses[chainId as number].contracts.donutPod;

    const donutPodContract = new Contract(
        donutPodAddress,
        abis.Pod.abi,
        library.getSigner(account),
    );

    const params = [
        utils.parseUnits('1', ERC_20_DECIMALS),
        utils.hashMessage(''),
        {
            gasLimit: 700000,
        },
    ];

    dispatch(sendTransaction(donutPodContract, 'redeemToPool', params));
};
