import { getMarketPriceTokens } from '../services/markets';
import { getWeb3Wrapper } from '../services/web3_wrapper';
import { getKnownTokens } from '../util/known_tokens';
import { BZXLoadingState, MARKETPLACES } from '../util/types';

import { fetchAave } from './aave/actions';
import {
    fetchMarketPriceTokensUpdate,
    setMarketTokens,
    updateMarketPriceEther,
    updateMarketPriceQuote,
} from './market/actions';
import {
    getBZXLoadingState,
    getCurrencyPair,
    getCurrentMarketPlace,
    getSwapBaseTokenBalance,
    getSwapQuoteTokenBalance,
} from './selectors';

export * from './aave/actions';
export * from './defi/actions';

const logger = getLogger('Store::Actions');

export const updateStore = () => {
    return async (dispatch: any, getState: any) => {
        const state = getState();
        const web3Wrapper = await getWeb3Wrapper();
        if (web3Wrapper) {
            const [ethAccount] = await web3Wrapper.getAvailableAddressesAsync();

            dispatch(updateTokenBalances());
            dispatch(updateGasInfo());
            dispatch(updateMarketPriceEther());

            // Updates based on the current app
            const currentMarketPlace = getCurrentMarketPlace(state);
            switch (currentMarketPlace) {
                case MARKETPLACES.ERC20:
                    dispatch(updateERC20Store(ethAccount));
                    dispatch(updateMarketPriceQuote());
                    break;
                case MARKETPLACES.ERC721:
                    dispatch(updateERC721Store(ethAccount));
                    break;
                case MARKETPLACES.LaunchPad:
                    dispatch(updateLaunchpadStore());
                    break;
                case MARKETPLACES.Margin:
                    // Updated in market price tokens
                    // dispatch(updateBZXStore());
                    break;
                case MARKETPLACES.Defi:
                    // Updated in market price tokens
                    dispatch(updateDefiStore());
                    break;

                case MARKETPLACES.MarketTrade:
                    // Updated in market price tokens
                    dispatch(updateSwapStore());
                    break;
                default:
                    break;
            }
        }
    };
};

export const updateERC721Store = (ethAccount: string) => {
    return async (dispatch: any) => {
        dispatch(getAllCollectibles(ethAccount));
    };
};

export const updateERC20Store = (ethAccount: string) => {
    return async (dispatch: any, getState: any) => {
        const state = getState();
        try {
            const knownTokens = getKnownTokens();
            const currencyPair = getCurrencyPair(state);
            const baseToken = knownTokens.getTokenBySymbol(currencyPair.base);
            const quoteToken = knownTokens.getTokenBySymbol(currencyPair.quote);

            dispatch(setMarketTokens({ baseToken, quoteToken }));
            dispatch(getOrderbookAndUserOrders());

            // await dispatch(fetchMarkets());
        } catch (error) {
            const knownTokens = getKnownTokens();
            const currencyPair = getCurrencyPair(state);
            const baseToken = knownTokens.getTokenBySymbol(currencyPair.base);
            const quoteToken = knownTokens.getTokenBySymbol(currencyPair.quote);

            dispatch(setMarketTokens({ baseToken, quoteToken }));
            dispatch(getOrderBook());
        }
    };
};

export const updateLaunchpadStore = () => {
    return async (dispatch: any, _getState: any) => {
        try {
            dispatch(fetchLaunchpad());
        } catch (error) {
            logger.error('Failed to update Launchpad', error);
        }
    };
};

export const updateSwapStore = () => {
    return async (dispatch: any, getState: any) => {
        const state = getState();
        try {
            const baseTokenBalance = getSwapBaseTokenBalance(state);
            const quoteTokenBalance = getSwapQuoteTokenBalance(state);
            if (baseTokenBalance && quoteTokenBalance) {
                const tokensPrices = await getMarketPriceTokens([baseTokenBalance, quoteTokenBalance]);
                dispatch(fetchMarketPriceTokensUpdate(tokensPrices));
            }
        } catch (error) {
            logger.error('Failed to update Swap', error);
        }
    };
};

export const updateBZXStore = () => {
    return async (dispatch: any, getState: any) => {
        const state = getState();
        const loading = getBZXLoadingState(state);

        try {
            if (loading !== BZXLoadingState.Done) {
                dispatch(initBZX());
            } else {
                dispatch(fetchBZX());
            }
        } catch (error) {
            logger.error('Failed to update BZX', error);
        }
    };
};

export const updateDefiStore = () => {
    return async (dispatch: any, getState: any) => {
        try {
            dispatch(fetchAave());
        } catch (error) {
            logger.error('Failed to update Defi Store', error);
        }
    };
};
