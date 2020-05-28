/**
 * See all ids below
 * https://ethereum.stackexchange.com/questions/17051/how-to-select-a-network-id-or-is-there-a-list-of-network-ids
 */
export const MAINNET_ID = 1;
export const KOVAN_ID = 42;
export const LOCAL_ID = 1337;

export default {
    [MAINNET_ID]: {
        contracts: {
            poolDai: '0x29fe7D60DdF151E5b52e5FAB4f1325da6b2bD958',
        },
        tokens: {
            cDai: '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643',
        },
    },
    [KOVAN_ID]: {
        contracts: {
            daiPod: '0x395fcB67ff8fdf5b9e2AeeCc02Ef7A8DE87a6677',
            donutPod: '0xa7cb37bAc06E9E8cf0B76Adb6bb554c68F0A4ac9',
            usdcPod: '0x9191Fd9f29cbbE73bA0e1B8959eC89Bc780e598b',
            poolDai: '0xC3a62C8Af55c59642071bC171Ebd05Eb2479B663',
            poolSai: '0x9B80beA68835e8E39b9CeaeF83B7b49e9D41661C',
            poolUsdc: '0xa0B2A98d0B769886ec06562ee9bB3572Fa4f3aAb',
        },
        tokens: {
            dai: '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa',
            cDai: '0xe7bc397dbd069fc7d0109c0636d06888bb50668c',
            poolDaiToken: '0x1237a9f1664895bc30cfe9eCD1e3f6C2A83700AD',
            poolSaiToken: '0xC9689253a545D0C4dc733620281bBdCbb9FA4A4D',
            poolUsdcToken: '0xf08d73ABC5E46811649380cCb02bF1aDCc37E59c',
        },
    },
    [LOCAL_ID]: {
        contracts: {
            daiPod: '0x991B6a64a604Bbe83683650b59144fA22862d80D',
            donutPod: '0x7E44227ECe047B9FeA3543542E1Ef7e1C4718831',
            usdcPod: '0xB1A8E55A46e4E5Ce1D3C6D9dc0D66e976677521d',
            poolDai: '0x5B63246Cae91E1bdB5bDcfF0191cba826748Db78',
            poolSai: '0x6818058D5BFE5Ff1b575CfDC6399c12c4488633D',
            poolUsdc: '0x51dd5aFEe6b977aE27951eaa2FeDF959a1F6e76c',
        },
        tokens: {
            dai: '0xC29D9C5de8821F561f7B2F535B2372D6d5746D7d',
            sai: '0x004601578956dD39E81A5328e35017D1113A33b7',
            usdc: '0x1CE0a954d82EdF9B7f3bc587C82E0Df965C7011f',
            cDai: '0x6C59CDcC42be7E0bdCc3f5169A378CC6445d9E91',
            cSai: '0x4c99DF9350c1777516bdf472C2a41c76c6eAD8FC',
            cUsdc: '0xEf5bC3b74826Edd87ed81c6b56d31DE681DDa8D8',
            poolDaiToken: '0x21E1dce2dA7aD92e575879eB76D5B9A2Fc7e6472',
        },
    },
};
