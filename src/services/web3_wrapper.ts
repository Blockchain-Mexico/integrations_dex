// tslint:disable-next-line: no-implicit-dependencies
import { Web3Wrapper } from '@0x/web3-wrapper';

import {
    CHAIN_ID,
    INFURA_ID,
} from '../common/constants';
import { providerFactory } from '../util/provider_factory';
import { sleep } from "../util /sleep";
import { Wallet } from "../util /types";

import { LocalStorage } from './local_storage';
let web3Wrapper: Web3Wrapper | null = null;

const localStorage = new LocalStorage(window.localStorage);

export const isMetamaskInstalled = (): boolean => {
    const { ethereum, web3 } = window;
    return ethereum || web3;
};

export const initializeWeb3Wrapper = async (wallet: Wallet): Promise<Web3Wrapper | null> => {
    switch (wallet) {
        case Wallet.Metamask:
            web3Wrapper = await initMetamask();
            break;
        case Wallet.WalletConnect:
            web3Wrapper = await initWalletConnect();
            break;
    }
    if (web3Wrapper) {
        return web3Wrapper;
    } else {
        return null;
    }
};

export const initMetamask = async (): Promise<Web3Wrapper | null> => {
    const { ethereum, web3, location } = window;
    if (ethereum) {
        try {
            web3Wrapper = new Web3Wrapper(ethereum);
            // Request account access if needed
            await ethereum.enable();
            // Subscriptions register
            ethereum.on('accountsChanged', async (accounts: []) => {
                // Reload to avoid MetaMask bug: "MetaMask - RPC Error: Internal JSON-RPC"
                location.reload();
            });
            ethereum.on('networkChanged', async (network: number) => {
                location.reload();
            });
            localStorage.saveWalletConnected(Wallet.Metamask);

            return web3Wrapper;
        } catch (error) {
            // The user denied account access
            return null;
        }
    } else if (web3) {
        web3Wrapper = new Web3Wrapper(web3.currentProvider);
        return web3Wrapper;
    } else {
        localStorage.resetWalletConnected();
        //  The user does not have metamask installed
        return null;
    }
};

const initProviderWallet = async (wallet: Wallet): Promise<Web3Wrapper | null> => {
    const provider = providerFactory.getInjectedProviderIfExists();

    if (provider) {
        try {
            web3Wrapper = new Web3Wrapper(provider);
            if (provider.enable !== undefined) {
                await provider.enable();
            }
            localStorage.saveWalletConnected(wallet);
            return web3Wrapper;
        } catch (error) {
            // The user denied account access
            return null;
        }
    } else {
        localStorage.resetWalletConnected();
        return null;
    }
};

export const initWalletConnect = async (): Promise<Web3Wrapper | null> => {
    const { location } = window;
    const WalletConnectProvider = (await import('@walletconnect/web3-provider')).default;
    // WalletConnectProvider for Binance smart chain is so diferrent needs another approach
    const provider = new WalletConnectProvider({ infuraId: INFURA_ID, chainId: CHAIN_ID });
    try {
        await provider.enable();
        localStorage.saveWalletConnected(Wallet.WalletConnect);
    } catch {
        localStorage.resetWalletConnected();
        location.reload();
        return null;
    }

    web3Wrapper = new Web3Wrapper(provider);

    // Subscribe to accounts change
    provider.on('accountsChanged', (accounts: string[]) => {
        location.reload();
    });

    // Subscribe to chainId change
    provider.on('chainChanged', (chainId: number) => {
        location.reload();
    });

    // Subscribe to networkId change
    provider.on('networkChanged', (networkId: number) => {
        location.reload();
    });

    // Subscribe to session connection/open
    provider.on('open', () => {
        localStorage.saveWalletConnected(Wallet.WalletConnect);
        console.log('open');
    });

    // Subscribe to session disconnection/close
    provider.on('close', (code: number, reason: string) => {
        deleteWeb3Wrapper();
        localStorage.resetWalletConnected();
        location.reload();
    });

    return web3Wrapper;
};

export const getWeb3Wrapper = async (): Promise<Web3Wrapper> => {
    while (!web3Wrapper) {
        // if web3Wrapper is not set yet, wait and retry
        await sleep(100);
    }

    return web3Wrapper;
};

export const deleteWeb3Wrapper = (): void => {
    web3Wrapper = null;
};

export const isWeb3Wrapper = (): Web3Wrapper | null => {
    return web3Wrapper;
};