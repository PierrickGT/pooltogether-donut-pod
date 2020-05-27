import { abis, addresses } from '@pooltogether-donut-pod/contracts';
import { Contract } from 'ethers';

import { nonConstantMethodCall } from 'helpers/Contract';

export const getUserDaiBalance = async (account: string, chainId: number, library: any) => {
    const daiTokenAddress = addresses[chainId as number].tokens.dai;

    const daiTokenContract = new Contract(
        daiTokenAddress,
        abis.ERC20.abi,
        library.getSigner(account),
    );

    const userBalance = await nonConstantMethodCall(daiTokenContract, 'balanceOf', library, [
        account,
    ]);

    return userBalance;
};
