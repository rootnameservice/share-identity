import "@therootnetwork/api-types"; // optional, for Typescript support
import { ApiPromise } from "@polkadot/api";
import { getApiOptions, getPublicProvider } from "@therootnetwork/api";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useRootNetworkState } from "@/redux/rootNetwork/rootNetworkSlice";
import { parseCookie } from "@/utils/common";
import { Address } from "viem";
import { isEmpty } from "lodash";

import useNetworkConfig from "./useNetworkConfig";

export interface ConnectProps {
  state: "initialize" | "reinitialize";
}

export default function useConnectRoot(props?: ConnectProps) {
  const { network } = useNetworkConfig();
  const { address: walletAddress } = useAccount();
  const { updateRootDetails } = useRootNetworkState();

  const isFpActive = parseCookie("isFpActive") === "true";
  const [api, setApi] = useState<ApiPromise>();

  const getApiPromise = async () => {
    const api = await ApiPromise.create({
      ...getApiOptions(),
      ...getPublicProvider(network),
    });

    setApi(api);
    return api;
  };

  const setup = async () => {
    if (walletAddress) {
      const api = await getApiPromise();
      const fpHolder = await api.query.futurepass.holders(walletAddress);
      const fpAccount = fpHolder.unwrapOr(undefined)?.toString();
      const isFpEnabled = isFpActive && !isEmpty(fpAccount);
      const address =
        isFpEnabled && fpAccount
          ? fpAccount
          : walletAddress
          ? walletAddress
          : undefined;

      if (!isFpEnabled) {
        document.cookie = `isFpActive=${false}; path=/`;
      }

      updateRootDetails({
        futurePassAddress: fpAccount,
        eoaAddress: walletAddress,
        isFpActive: isFpEnabled,
        address: address as Address,
      });
    }
  };

  // Initial load only
  useEffect(() => {
    if (walletAddress && props?.state === "initialize") {
      setup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress]);

  return { setup, api, getApiPromise };
}
