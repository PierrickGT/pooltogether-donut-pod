import { Contract, utils } from 'ethers';
import moment from 'moment-timezone';
import * as pt from 'pooltogetherjs';

import { abis, addresses } from 'contracts';
import { nonConstantMethodCall } from 'helpers/Contract';

export const getNextAwardDate = () => {
    const currentPSTDate = moment(new Date().getTime()).tz('America/Los_Angeles');
    const weeklyAwardPSTDate = moment()
        .tz('America/Los_Angeles')
        .day(5)
        .hour(12)
        .minute(0)
        .second(0)
        .millisecond(0);

    if (currentPSTDate.isBefore(weeklyAwardPSTDate)) {
        return weeklyAwardPSTDate;
    } else {
        return weeklyAwardPSTDate.add(1, 'weeks');
    }
};

export const getPoolDaiPrize = async (account: string, chainId: number, library: any) => {
    const poolDaiContract = new Contract(
        // @ts-ignore
        addresses[chainId as number].contracts.poolDai,
        abis.BasePool.abi,
        library.getSigner(account),
    );

    const poolDaiBalance = await nonConstantMethodCall(poolDaiContract, 'balance', library);
    const poolDaiAccountedBalance = await poolDaiContract.accountedBalance();

    const currentOpenDrawId = await poolDaiContract.currentOpenDrawId();
    const currentDraw = await poolDaiContract.getDraw(currentOpenDrawId);

    const prize = pt.utils.calculatePrize(
        poolDaiBalance,
        poolDaiAccountedBalance,
        currentDraw.feeFraction,
    );

    const prizeInDai = utils.formatUnits(prize.toString(), 18);

    const nextAwardDate = Date.parse(
        getNextAwardDate().format('DD MMM YYYY HH:mm:ss').concat(' PST'),
    );

    const remainingTimes = (nextAwardDate - new Date().getTime()) / 1000;
    const remainingBlocks = remainingTimes / 15.0;
    const blocksFixedPoint18 = utils.parseEther(remainingBlocks.toString());

    const supplyRatePerBlock = await poolDaiContract.supplyRatePerBlock();

    const prizeSupplyRate = pt.utils.calculatePrizeSupplyRate(
        supplyRatePerBlock,
        currentDraw.feeFraction,
    );

    const prizeEstimate = pt.utils.calculatePrizeEstimate(
        poolDaiBalance,
        prize,
        blocksFixedPoint18,
        prizeSupplyRate,
    );

    const prizeEstimateInDai = utils.formatUnits(prizeEstimate.toString(), 18);

    return {
        prizeInDai,
        prizeEstimateInDai,
    };
};
