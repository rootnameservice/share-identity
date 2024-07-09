import { http, createConfig } from '@wagmi/core'
import { injected, walletConnect, coinbaseWallet } from '@wagmi/connectors'
import { root } from './root'
import { porcini } from './porcini'

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || ""

export const config = createConfig({
    chains: [porcini, root],
    connectors: [
        injected({
            shimDisconnect: true,
            target: "metaMask"
        }),
        walletConnect({
            projectId,
            qrModalOptions: {
                explorerExcludedWalletIds: "ALL",
                explorerRecommendedWalletIds: [
                    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96", // metamask
                    "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa", // coinbase
                    "19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927", // ledger
                ],
            }
        }),
        coinbaseWallet({
            appName: 'Root Name Services',
            darkMode: true,
        }),
    ],
    transports: {
        [porcini.id]: http(),
        [root.id]: http()
    },
    ssr: true
})