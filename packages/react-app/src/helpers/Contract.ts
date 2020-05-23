import { Contract, providers } from 'ethers';

export const nonConstantMethodCall = async (
    contract: Contract,
    functionName: string,
    provider: providers.Provider,
) => {
    const contractFunction = contract.interface.functions[functionName];
    const callData = contractFunction.encode([]);
    const result = await provider.call({
        to: contract.address,
        data: callData,
    });

    return contractFunction.decode(result);
};
