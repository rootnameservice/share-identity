import React, { useEffect } from "react";
import { FlexCenter } from "../Theme/StyledGlobal";
import { Connect } from "../Wallet/Connect";
import { Grid } from "@mui/material";
import { Share } from "../Share/ShareButton";
import { useAccount } from "wagmi";
import { useModalState } from "@/redux/modal/modalSlice";
import useConnectRoot from "@/hooks/useConnectRoot";
import useNetworkConfig from "@/hooks/useNetworkConfig";

export const HomePage: React.FC = () => {
  useConnectRoot({ state: "initialize" });

  const { address, chainId } = useAccount();
  const { toggleModal, closeModal } = useModalState();
  const { config } = useNetworkConfig();

  // TODO: Mount this somewhere else
  useEffect(() => {
    if (chainId !== undefined && chainId !== config.id) {
      toggleModal({
        id: "Switch Network",
        title: "Switch Network",
        isCloseDisabled: true,
        isXDisabled: true,
      });
    } else {
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, address]);

  return (
    <FlexCenter height="100%">
      <Grid>
        <Connect />
        <Share />
      </Grid>
    </FlexCenter>
  );
};

export default HomePage;
