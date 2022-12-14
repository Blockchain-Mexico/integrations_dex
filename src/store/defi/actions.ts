import {iTokenData} from "../../util /types";
import {ATokenData} from "../../util /aave/types";


export const lendingDefiToken: ThunkCreator<Promise<any>> = (
    token: Token,
    defiToken: iTokenData | ATokenData,
    amount: BigNumber,
    isEth: boolean,
) => {
    return async (dispatch, getState) => {
        const state = getState();
        const protocol = getDefiProtocol(state);
        switch (protocol) {
            case Protocol.Aave:
                const txHash = dispatch(lendingAToken(token, defiToken, amount));
                return txHash;
            default:
                break;
        }
    };
};

export const borrowDefiToken: ThunkCreator<Promise<any>> = (
    token: Token,
    defiToken: iTokenData | ATokenData,
    amount: BigNumber,
    isEth: boolean,
) => {
    return async (dispatch, getState) => {
        const state = getState();
        const protocol = getDefiProtocol(state);
        switch (protocol) {
            case Protocol.Aave:
                const txHash = dispatch(borrowAToken(token, defiToken, amount));
                return txHash;
            default:
                break;
        }
    };
};

export const repayDefiToken: ThunkCreator<Promise<any>> = (
    token: Token,
    defiToken: iTokenData | ATokenData,
    amount: BigNumber,
    isEth: boolean,
) => {
    return async (dispatch, getState) => {
        const state = getState();
        const protocol = getDefiProtocol(state);
        switch (protocol) {
            case Protocol.Aave:
                const txHash = dispatch(repayAToken(token, defiToken, amount));
                return txHash;
            default:
                break;
        }
    };
};

export const unLendingDefiToken: ThunkCreator<Promise<any>> = (
    token: Token,
    defiToken: iTokenData | ATokenData,
    amount: BigNumber,
    isEth: boolean,
) => {
    return async (dispatch, getState) => {
        const state = getState();
        const protocol = getDefiProtocol(state);
        switch (protocol) {
            case Protocol.Aave:
                const txHash = dispatch(unLendingAToken(token, defiToken, amount));
                return txHash;
            default:
                break;
        }
    };
};

export const updateDefiTokenBalance: ThunkCreator<Promise<any>> = (defiToken: iTokenData | ATokenData) => {
    return async (dispatch, getState) => {
        const state = getState();
        const protocol = getDefiProtocol(state);
        const ethAccount = getEthAccount(state);
        switch (protocol) {
            case Protocol.Aave:
                const token = await getUpdateAToken(ethAccount, defiToken as ATokenData);
                dispatch(setATokenBalance(token));
                break;

            default:
                break;
        }
    };
};
