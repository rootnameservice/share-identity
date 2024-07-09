/**
 * Root (mainnet) Network
 * 
 * Docs: https://wagmi.sh/core/api/chains#create-chain
 */

import { type Chain } from 'viem'
import { root as rnsRoot } from "rootnameservice"

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
} = rnsRoot.contracts

export const root = {
  ...rnsRoot,
  contracts
} as const satisfies Chain

/**
 * Use this config to programatically add this network to a wallet
 */
export const rootWalletConfig = {
  chainId: "0x1DF4",
  chainName: 'The Root Network',
  nativeCurrency: { name: 'Ripple', symbol: 'XRP', decimals: 18 },
  rpcUrls: ['https://root.rootnet.live/'],
  blockExplorerUrls: ['https://rootscan.io/'],
}