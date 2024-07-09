import React from "react";
import { Grid, Link, Typography, alpha, styled } from "@mui/material";
import {
  ActionButton,
  Description,
  Flex,
  FlexRight,
} from "../Theme/StyledGlobal";
import { FONT_WEIGHT } from "../Theme/Global";
import { switchChain } from "@wagmi/core";
import { config } from "@/chains/config";
import { useAccount, useConnect } from "wagmi";

import Image from "next/image";
import useNetworkConfig from "@/hooks/useNetworkConfig";

const Container = styled(Grid)(({ theme }) => ({
  maxWidth: "360px",
  width: "100%",
}));

const RootNetwork = styled(Flex)(({ theme }) => ({
  maxWidth: "360px",
  padding: "14px 40px",
  margin: "40px 0 10px",
  border: `solid 1px ${theme.palette.primary.dark}`,
  borderRadius: "8px",
  backgroundColor: alpha(theme.palette.primary.dark, 0.1),
  filter: `drop-shadow(0px 4px 10px ${alpha(
    theme.palette.background.paper,
    0.75
  )})`,
}));

const WalletName = styled(Typography)(({ theme }) => ({
  fontFamily: "var(--default-font)",
  fontWeight: FONT_WEIGHT.Bold,
  color: theme.palette.secondary.main,
  marginLeft: "20px",
}));

const VideoLink = styled(Link)(({ theme }) => ({
  textDecorationColor: theme.palette.text.primary,
}));

const VideoLabel = styled(Description)(({ theme }) => ({
  fontWeight: FONT_WEIGHT.Bold,
  color: theme.palette.text.primary,
}));

const CancelButton = styled(ActionButton)(({ theme }) => ({
  marginRight: "10px",
  "&.MuiButtonBase-root": {
    marginTop: "35px",
  },
}));

const ConfirmButton = styled(CancelButton)(({ theme }) => ({
  marginRight: 0,
}));

export const SwitchNetwork: React.FC = () => {
  const { chainId } = useNetworkConfig();
  const { connect } = useConnect();
  const { connector: activeConnector } = useAccount();

  const switchNetwork = async () => {
    try {
      await switchChain(config, {
        chainId: chainId as any,
      });

      if (activeConnector?.id === "walletConnect") {
        connect({ connector: activeConnector, chainId });
      }
    } catch (error) {
      console.log("Error Switching Network:: ", error);
    }
  };

  return (
    <Container>
      <Description>
        You are currently connected to another network, Please switch to The
        Root Network.
      </Description>
      <RootNetwork>
        <Image
          src="/images/rns-logo-1.svg"
          alt="RNS Logo"
          width={36}
          height={36}
        />
        <WalletName>The Root Network</WalletName>
      </RootNetwork>
      <Description>Or add The Root Network manually.</Description>
      <VideoLink
        href={"https://vimeo.com/909628422/f677c793af"}
        target="_blank"
      >
        <VideoLabel>Watch here</VideoLabel>
      </VideoLink>

      <FlexRight>
        <ConfirmButton
          variant="contained"
          onClick={() => {
            switchNetwork();
          }}
        >
          Switch
        </ConfirmButton>
      </FlexRight>
    </Container>
  );
};

export default SwitchNetwork;
