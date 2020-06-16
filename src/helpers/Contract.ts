import { Contract, providers } from 'ethers';

export const nonConstantMethodCall = async (
    contract: Contract,
    methodName: string,
    provider: providers.Provider,
    data: any[] = [],
) => {
    const contractFunction = contract.interface.functions[methodName];
    const callData = contractFunction.encode(data);
    const result = await provider.call({
        to: contract.address,
        data: callData,
    });

    return contractFunction.decode(result);
};
