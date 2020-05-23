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
            poolDai: '0xC3a62C8Af55c59642071bC171Ebd05Eb2479B663',
        },
        tokens: {
            dai: '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa',
            cDai: '0xe7bc397dbd069fc7d0109c0636d06888bb50668c',
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
