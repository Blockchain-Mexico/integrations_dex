import { createSelector } from 'reselect';
import {StoreState} from "../util /types";

export const getATokensData = (state: StoreState) => state.aave.aTokensData;
export const getAaveCurrency = (state: StoreState) => state.aave.currency;
export const getAaveLoadingState = (state: StoreState) => state.aave.aaveLoadingState;
export const getAaveReservesGQLResponse = (state: StoreState) => state.aave.aaveReservesGQLResponse;
export const getAaveUserAccountData = (state: StoreState) => state.aave.userAccountData;