import { BigNumber } from '@0x/utils';
import numbro from 'numbro';

import { NETWORK_ID, NETWORK_ID_BSC } from '../common/constants';

import { isWeth } from './known_tokens';
//import { ETHERSCAN_TRANSACTION_URL, ETHERSCAN_URL, getTransactionLink } from './transaction_link';
//import { RelayerFill, Token } from './types';

import { transactionHashUtils } from '@0x/order-utils';
import { getTransactionHashFromFill } from './fills';
import { ChainId } from './types/swap';

export const tokenAmountInUnitsToBigNumber = (amount: BigNumber, decimals: number): BigNumber => {
    const decimalsPerToken = new BigNumber(10).pow(decimals);
    return amount.div(decimalsPerToken);
};
export const tokenAmountInUnitsToBigNumberFills = (amount: BigNumber, digits = 4, round = true) => {
    if (amount === 0) { return '$0.00'; }
    if (!amount) { return '-'; }
    return numbro(amount).formatCurrency({ average: round, mantissa: digits, totalLength: 4, thousandSeparated: true});
};

export const tokenAmountInUnitsToBigNumberStats = (amount: number, decimals: number): BigNumber => {
    const decimalsPerToken = new BigNumber(1).pow(decimals);
    return amount.div(decimalsPerToken);
};
export const tokenAmountInUnitsToBigNumberStatsMarkets = (amount: number, decimals: number): BigNumber => {
    const decimalsPerToken = new BigNumber(100000000000000000000).pow(decimals);
    return amount.div(decimalsPerToken);
};
const DEFAULT_CURRENCY_DECIMALS = 2;
export const tokenAmountInUnits = (amount: BigNumber, decimals: number, toFixedDecimals = 2): string => {
    return tokenAmountInUnitsToBigNumber(amount, decimals).toFixed(Number(toFixedDecimals));
};
type NumericValue = string | number;
export const tokenAmountInUnitsFills = (amount: BigNumber, decimals = DEFAULT_CURRENCY_DECIMALS, decimals1: any) => {
    if (!amount || !Number(amount)) {
        return 0;
    }
    return tokenAmountInUnitsToBigNumberFills(amount);
};

export const tokenAmountInUnitsStats = (amount: number, decimals: number, toFixedDecimals = 2): string => {
    return tokenAmountInUnitsToBigNumberStats(amount, decimals).toFormat(Number(toFixedDecimals));
};
export const tokenAmountInUnitsStatsMarkteFills = (amount: number, decimals: number, toFixedDecimals = 100000000000000000000): string => {
    return tokenAmountInUnitsToBigNumberStatsMarkets(amount, decimals).toFormat(Number(toFixedDecimals));
};

export const unitsInTokenAmount = (units: string, decimals: number): BigNumber => {
    const decimalsPerToken = new BigNumber(10).pow(decimals);
    return new BigNumber(units).multipliedBy(decimalsPerToken);
};

export const tokenSymbolToDisplayString = (symbol: string): string => {
    return isWeth(symbol) ? 'wETH' : symbol.toUpperCase();
};

export const formatTokenSymbol = (symbol: string): string => {
    return isWeth(symbol.toLowerCase()) ? 'ETH' : symbol.toUpperCase();
};

export const formatTokenName = (name: string): string => {
    return name === 'Wrapped Ether' ? 'Ethereum' : name;
};

export const getEtherscanLinkForToken = (token: Token): string => {
    return `${ETHERSCAN_URL[NETWORK_ID]}token/${token.address}`;
};

export const getEtherscanLinkForTrade = (relayerFill: RelayerFill): string => {
    return `${ETHERSCAN_TRANSACTION_URL[NETWORK_ID]}/${relayerFill.order_hash}`; // the tx/txid
};

export function getEtherscanLink(
    chainId: ChainId,
    data: string,
    type: 'transaction' | 'token' | 'address' | 'block'
): string {
    const prefix = `https://${ETHERSCAN_PREFIXES[chainId] || ETHERSCAN_PREFIXES[1]}etherscan.io`

    switch (type) {
        case 'transaction': {
            return `${prefix}/tx/${data}`
        }
        case 'token': {
            return `${prefix}/token/${data}`
        }
        case 'block': {
            return `${prefix}/block/${data}`
        }
        case 'address':
        default: {
            return `${prefix}/address/${data}`
        }
    }
}
// TODO: Etherscan for Bsc and mulichain if aave is deploy in another chain
export const getEtherscanLinkForTokenBsc = (token: Token): string => {
    return `${ETHERSCAN_URL[NETWORK_ID_BSC]}token/${token.address}`;
};

export const getEtherscanLinkForTokenAndAddress = (token: Token, ethAccount: string): string => {
    return `${ETHERSCAN_URL[NETWORK_ID]}token/${token.address}?a=${ethAccount}`;
};

export const getEtherscanLinkForTokenAndAddressBsc = (token: Token, ethAccount: string): string => {
    return `${ETHERSCAN_URL[NETWORK_ID_BSC]}token/${token.address}?a=${ethAccount}`;
};

