import { porcini, porciniWalletConfig } from "@/chains/porcini";
import { root, rootWalletConfig } from "@/chains/root";
import { NetworkName } from "@therootnetwork/api";
import { createPublicClient, http } from "viem";
import { porcini as porciniRns, root as rootRns } from "rootnameservice";

export const rootCLient = createPublicClient({
  chain: rootRns,
  transport: http(),
});

export const porciniClient = createPublicClient({
  chain: {
    ...porciniRns,
    subgraphs: {
      ens: {
        url: "https://subgraph-stage.rootnameservice.com/subgraphs/name/graphprotocol/ens",
      },
    },
  },
  transport: http(),
});

export const getNetworkConfig = (chainId: string) => {
  switch (chainId) {
    // Testnet - Porcini
    case "7672":
      return {
        network: "porcini" as NetworkName,
        name: "porcini",
        config: porcini,
        walletConfig: porciniWalletConfig,
        chainId: 7672,
        client: porciniClient,
      };
    // Mainnet - Root
    case "7668":
    default:
      return {
        network: "root" as NetworkName,
        name: "mainnet",
        config: root,
        walletConfig: rootWalletConfig,
        chainId: 7668,
        client: rootCLient,
      };
  }
};

export default function useNetworkConfig() {
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID;

  return getNetworkConfig(chainId || root.id.toString());
}
