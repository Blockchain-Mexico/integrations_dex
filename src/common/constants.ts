//import { ChainId } from '../util/types/swap';

export const INFURA_ID = process.env.REACT_APP_INFURA_ID || '';

// HACK(dekz): re-write the Ganache chain id which isn't network id
export const CHAIN_ID: number = process.env.REACT_APP_CHAIN_ID
    ? Number.parseInt(process.env.REACT_APP_CHAIN_ID as string, 10)
    : NETWORK_ID === 50
        ? 1337
        : NETWORK_ID;

//TODO: aave multi chain
const EXCLUDED_SOURCES = (() => {
    switch (CHAIN_ID) {
        case ChainId.Mainnet:
            return [];
        case ChainId.Kovan:
            return [ERC20BridgeSource.Kyber];
        default:
            return [ERC20BridgeSource.Eth2Dai, ERC20BridgeSource.Kyber, ERC20BridgeSource.Uniswap];
    }
})();