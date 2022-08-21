import {
    ERC20BridgeSource,
} from '@0x/asset-swapper';
import { SignedOrder } from '@0x/connect';
import { OrderStatus } from '@0x/types';
import { BigNumber } from '@0x/utils';
import { RouterState } from 'connected-react-router';
import { Styles } from 'react-modal';
import { ActionCreator, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { TokenMetaData } from '../common/tokens_meta_data';
// import { ExtraArgument } from '../store';
// import { ThemeUI, ThemeProperties } from '../themes/commons';


import { AaveState, ATokenData } from './aave/types';

export interface TabItem {
    active: boolean;
    onClick: any;
    text: string;
}

export type Maybe<T> = T | undefined;

export enum Network {
    Mainnet = 1,
    Ropsten = 3,
    Rinkeby = 4,
    Kovan = 42,
    Ganache = 50,
}

export enum NetworkBsc {
    Mainnet,
    Testnet,
}

export interface Token {
    address: string;
    decimals: number;
    name: string;
    symbol: string;
    primaryColor: string;
    id?: string;
    c_id?: string; // coingecko id
    icon?: string;
    displayDecimals: number;
    minAmount?: number;
    maxAmount?: number;
    precision?: number;
    website?: string;
    description?: string;
    verisafe_sticker?: string;
    price_usd?: BigNumber | null;
    price_usd_24h_change?: BigNumber | null;
    listed: boolean;
    isStableCoin: boolean;
}

export interface BlockchainNetwork {
    name: string;
    symbol: string;
    id?: string;
}

export interface TokenPrice {
    c_id: string; // coingecko id
    price_usd: BigNumber;
    price_usd_24h_change: BigNumber;
}

export interface TokenBalance {
    balance: BigNumber;
    isUnlocked: boolean;
    token: Token;
}

export interface OrderFeeData {
    makerFee: BigNumber;
    takerFee: BigNumber;
    makerFeeAssetData: string;
    takerFeeAssetData: string;
}

export interface SearchTokenBalanceObject {
    tokenBalances: TokenBalance[];
    tokenToFind: Token | null;
    wethTokenBalance: TokenBalance | null;
}

export enum Web3State {
    Done = 'Done',
    Error = 'Error',
    Loading = 'Loading',
    NotInstalled = 'NotInstalled',
    Connect = 'Connect',
    Connecting = 'Connecting',
    Locked = 'Locked',
}

export enum ServerState {
    Done = 'Done',
    Error = 'Error',
    Loading = 'Loading',
    NotLoaded = 'NotLoaded',
}

export interface BlockchainState {
    readonly ethAccount: string;
    readonly wallet: Wallet | null;
    readonly web3State: Web3State;
    readonly tokenBalances: TokenBalance[];
    readonly ethBalance: BigNumber;
    readonly wethTokenBalance: TokenBalance | null;
    readonly gasInfo: GasInfo;
    readonly convertBalanceState: ConvertBalanceState;
}

export interface RelayerState {
    readonly orders: UIOrder[];
    readonly userOrders: UIOrder[];
    readonly orderBookState: ServerState;
    readonly marketsStatsState: ServerState;
    readonly marketFillsState: ServerState;
    readonly minOrderExpireTimeOnBooks?: number;
    readonly userIEOOrders?: UIOrder[];
    readonly ieoOrders?: SignedOrder[];
    readonly feeRecipient?: string;
    readonly feePercentage?: number;
    readonly orderExpireTime?: number;
}

export interface UIState {
    readonly notifications: Notification[];
    readonly hasUnreadNotifications: boolean;
    readonly stepsModal: StepsModalState;
    readonly startTour: boolean;
    readonly orderPriceSelected: BigNumber | null;
    readonly orderBuyPriceSelected: BigNumber | null;
    readonly orderSellPriceSelected: BigNumber | null;
    readonly makerAmountSelected: BigNumber | null;
    readonly sidebarOpen: boolean;
    readonly isAffiliate: boolean;
    readonly openFiatOnRampModal: boolean;
    readonly openFiatOnRampChooseModal: boolean;
    readonly fiatType: 'APPLE_PAY' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'CARDS';
    readonly erc20Theme: ThemeUI;
    readonly erc20Layout: string;
    readonly isDynamicLayout: boolean;
    readonly themeName: string;
    readonly generalConfig?: GeneralConfig;
    readonly userConfigData: UserConfigData | null;
    readonly configData?: ConfigData | null;
    readonly orderSecondsExpirationTime?: BigNumber | null;
}

export interface StoreState {
    readonly router: RouterState;
    readonly blockchain: BlockchainState;
    readonly relayer: RelayerState;
    readonly ui: UIState;
    readonly aave: AaveState;
}

export enum StepKind {
    WrapEth = 'WrapEth',
    ToggleTokenLock = 'ToggleTokenLock',
    TransferToken = 'TransferToken',
    LendingToken = 'LendingToken',
    BorrowToken = 'BorrowToken',
    RepayToken = 'RepayToken',
    UnLendingToken = 'UnLendingToken',
    BuySellLimit = 'BuySellLimit',
    BuySellLimitMatching = 'BuySellLimitMatching',
    BuySellMarket = 'BuySellMarket',
    UnlockCollectibles = 'UnlockCollectibles',
    SellCollectible = 'SellCollectible',
    BuyCollectible = 'BuyCollectible',
    SubmitConfig = 'SubmitConfig',
}

export interface StepWrapEth {
    kind: StepKind.WrapEth;
    currentWethBalance: BigNumber;
    newWethBalance: BigNumber;
    context: 'order' | 'standalone' | 'lending';
}

export interface StepToggleTokenLock {
    kind: StepKind.ToggleTokenLock;
    token: Token;
    isUnlocked: boolean;
    context: 'order' | 'standalone' | 'lending';
    address?: string;
}

export interface StepUnlockCollectibles {
    kind: StepKind.UnlockCollectibles;
    isUnlocked: boolean;
}

export interface StepBuySellLimitOrder {
    kind: StepKind.BuySellLimit;
    amount: BigNumber;
    price: BigNumber;
    token: Token;
    is_ieo?: boolean;
}

export interface StepTransferToken {
    kind: StepKind.TransferToken;
    amount: BigNumber;
    address: string;
    token: Token;
    isEth: boolean;
}

export interface StepLendingToken {
    kind: StepKind.LendingToken;
    amount: BigNumber;
    token: Token;
    defiToken: iTokenData | ATokenData;
    isEth: boolean;
    isLending: boolean;
}

export interface StepBorrowToken {
    kind: StepKind.BorrowToken;
    amount: BigNumber;
    token: Token;
    defiToken: iTokenData | ATokenData;
    isEth: boolean;
    isBorrow: boolean;
}

export interface StepRepayToken {
    kind: StepKind.RepayToken;
    amount: BigNumber;
    token: Token;
    defiToken: iTokenData | ATokenData;
    isEth: boolean;
    isBorrow: boolean;
}

export interface StepUnLendingToken {
    kind: StepKind.UnLendingToken;
    amount: BigNumber;
    token: Token;
    defiToken: iTokenData | ATokenData;
    isEth: boolean;
    isLending: boolean;
}

export interface StepSubmitConfig {
    kind: StepKind.SubmitConfig;
    config: ConfigFile;
}

export type Step =
    | StepWrapEth
    | StepToggleTokenLock
    | StepBuySellLimitOrder
    | StepUnlockCollectibles
    | StepTransferToken
    | StepLendingToken
    | StepUnLendingToken
    | StepSubmitConfig
    | StepRepayToken
    | StepBorrowToken;

export interface StepsModalState {
    readonly doneSteps: Step[];
    readonly currentStep: Step | null;
    readonly pendingSteps: Step[];
}

export interface UIOrder {
    rawOrder: SignedOrder;
    size: BigNumber;
    filled: BigNumber | null;
    price: BigNumber;
    status: OrderStatus | null;
}

export interface Spread {
    absolute: BigNumber;
    percentage: BigNumber;
}

export interface CurrencyPair {
    base: string;
    quote: string;
    config: {
        basePrecision: number;
        pricePrecision: number;
        minAmount: number;
        maxAmount: number;
        quotePrecision: number;
    };
}
export interface CurrencyPairMetaData {
    base: string;
    quote: string;
    config?: {
        basePrecision?: number;
        pricePrecision?: number;
        minAmount?: number;
        maxAmount?: number;
        quotePrecision?: number;
    };
}

export enum NotificationKind {
    OrderFilled = 'OrderFilled',
    TokenTransferred = 'TokenTransferred',
    LendingComplete = 'LendingComplete',
    UnLendingComplete = 'UnLendingComplete',
    BorrowComplete = 'BorrowComplete',
    RepayComplete = 'RepayComplete',
}

export interface LiquidityPerToken {
    txns24h: string;
    txns24hChange: string;
    verified: boolean;
    decimals: string;
    volume24h: string;
    volume24hUSD: string;
    volume24hETH: string;
    volumeChange24h: string;
    liquidityUSD: string;
    liquidityETH: string;
    liquidityChange24h: string;
    priceUSD: string;
    priceETH: string;
    priceChange24h: string;
    timestamp: Date;
    blockNumber: BigNumber;
    AMM: string;
    network: string;
}

export interface BasePriceResponse extends QuoteBase {
    sellTokenAddress: string;
    buyTokenAddress: string;
    value: BigNumber;
    gas: BigNumber;
    priceComparisons?: SourceComparison[];
}
export interface SourceComparison {
    name: ERC20BridgeSource | '0x';
    price: BigNumber | null;
    gas: BigNumber | null;
    savingsInEth: BigNumber | null;
}

export interface GetSwapQuoteResponseLiquiditySource {
    name: string;
    proportion: BigNumber;
    intermediateToken?: string;
    hops?: string[];
}

interface BaseNotification {
    id: string;
    kind: NotificationKind;
    timestamp: Date;
}

interface TransactionNotification extends BaseNotification {
    tx: Promise<any>;
}

interface CancelOrderNotification extends TransactionNotification {
    kind: NotificationKind.CancelOrder;
    amount: BigNumber;
    token: Token;
}

interface MarketNotification extends TransactionNotification {
    kind: NotificationKind.Market;
    amount: BigNumber;
    token: Token;
    side: OrderSide;
}

interface TransferTokenNotification extends TransactionNotification {
    kind: NotificationKind.TokenTransferred;
    amount: BigNumber;
    token: Token;
    address: string;
}

interface LimitNotification extends BaseNotification {
    kind: NotificationKind.Limit;
    amount: BigNumber;
    token: Token;
    side: OrderSide;
}

export interface OrderFilledNotification extends BaseNotification {
    kind: NotificationKind.OrderFilled;
    amount: BigNumber;
    token: Token;
    side: OrderSide;
}

interface LendingTokenNotification extends TransactionNotification {
    kind: NotificationKind.LendingComplete;
    amount: BigNumber;
    token: Token;
}

interface UnLendingTokenNotification extends TransactionNotification {
    kind: NotificationKind.UnLendingComplete;
    amount: BigNumber;
    token: Token;
}

interface BorrowTokenNotification extends TransactionNotification {
    kind: NotificationKind.BorrowComplete;
    amount: BigNumber;
    token: Token;
}

interface RepayTokenNotification extends TransactionNotification {
    kind: NotificationKind.RepayComplete;
    amount: BigNumber;
    token: Token;
}

export type Notification =
    | CancelOrderNotification
    | TransferTokenNotification
    | LendingTokenNotification
    | UnLendingTokenNotification
    | RepayTokenNotification
    | BorrowTokenNotification;

export enum OrderType {
    Limit = 'Limit',
    Market = 'Market',
}

export interface GasInfo {
    gasPriceInWei: BigNumber;
    estimatedTimeMs: number;
}

export enum ModalDisplay {
    InstallMetamask = 'INSTALL_METAMASK',
    EnablePermissions = 'ACCEPT_PERMISSIONS',
    ConnectWallet = 'CONNECT_WALLET',
}

export enum MARKETPLACES {
    ERC20 = 'ERC20',
    Defi = 'Defi',
    Markets = 'Markets',
}

export enum Wallet {
    Network = 'Network',
    Metamask = 'Metamask',
    WalletConnect = 'WalletConnect',
}

export enum AllCollectiblesFetchStatus {
    Request = 'Request',
    Success = 'Success',
}

export enum ConvertBalanceState {
    Failure = 'Failure',
    Request = 'Request',
    Success = 'Success',
}

export interface CollectiblesState {
    readonly allCollectibles: { [tokenId: string]: Collectible };
    readonly isCollectionLoaded: boolean;
    readonly allCollectiblesFetchStatus: AllCollectiblesFetchStatus;
}

export type ThunkCreator<R = Promise<any>> = ActionCreator<ThunkAction<R, StoreState, ExtraArgument, AnyAction>>;

export enum ButtonVariant {
    Balance = 'balance',
    Buy = 'buy',
    Error = 'error',
    Primary = 'primary',
    Quaternary = 'quaternary',
    Secondary = 'secondary',
    Sell = 'sell',
}

export enum ButtonIcons {
    Warning = 'warning',
}

export interface Filter {
    text: string;
    value: null | string;
}

export interface PartialTheme {
    componentsTheme?: Partial<ThemeProperties>;
    modalTheme?: Partial<Styles>;
}

export interface GeneralConfig {
    title?: string;
    icon?: string;
    domain?: string;
    feeRecipient?: string;
    feePercentage?: number;
    social?: {
        facebook_url?: string;
        reddit_url?: string;
        twitter_url?: string;
        telegram_url?: string;
        discord_url?: string;
        bitcointalk_url?: string;
        youtube_url?: string;
        medium_url?: string;
    };
}

interface WalletsConfig {
    metamask: boolean;
}

export interface ConfigFile {
    tokens: TokenMetaData[];
    pairs: CurrencyPairMetaData[];
    marketFilters?: Filter[];
    wallets?: WalletsConfig;
    theme_name?: string;
    layout?: string;
    theme?: PartialTheme;
    theme_light?: PartialTheme;
    theme_dark?: PartialTheme;
    theme_light2?: PartialTheme;
    theme_dark2?: PartialTheme;
    general?: GeneralConfig;
}

export interface ConfigData {
    config: ConfigFile;
    owner: string;
    signature: string;
    message: string;
    slug?: string;
    createdAt?: number;
}

export interface UserConfigData {
    config: ConfigFile;
}

export interface ConfigRelayerData {
    config: string;
    owner: string;
    signature: string;
    message: string;
    slug?: string;
    createdAt?: number;
}

export interface ConfigFileTipBot {
    tokens: AssetBot[];
}

export interface AssetBot {
    ticker: string;
    name: string;
    contract: string;
    decimals: number;
    whitelistAddresses: string[];
    feePercentage: string;
}

export enum ProviderType {
    MetaMask = 'META_MASK',
    Fallback = 'FALLBACK',
}


export interface iTokenData {
    token: Token;
    address: string;
    name: string;
    symbol: string;
    price: BigNumber;
    checkpointPrice: BigNumber;
    avgBorrowInterestRate: BigNumber;
    marketLiquidity: BigNumber;
    balance: BigNumber;
    supplyInterestRate: BigNumber;
    isUnlocked: boolean;
}
