/**
 * Porcini (Testnet) Network
 * 
 * Docs: https://wagmi.sh/core/api/chains#create-chain
 */

import { type Chain } from 'viem'
import { porcini as rnsPorcini } from "rootnameservice"

/**
 * Remove the following contracts as it is causing issues
 * with getting the account address and ens name using wagmi
 * 
 * TODO: Find out why
 */
const {
    ensDnsRegistrar,
    ensDnssecImpl,
    multicall3,
    ...contracts
} = rnsPorcini.contracts

export const porcini = {
    ...rnsPorcini,
    contracts
} as const satisfies Chain

/**
 * Use this config to programatically add this network to a wallet
 */
export const porciniWalletConfig = {
    chainId: "0x1DF8",
    chainName: 'The Root Network - Porcini Testnet',
    nativeCurrency: { name: 'Ripple', symbol: 'XRP', decimals: 18 },
    rpcUrls: ['https://porcini.rootnet.app/archive'],
    blockExplorerUrls: ['https://porcini.rootscan.io/'],
}