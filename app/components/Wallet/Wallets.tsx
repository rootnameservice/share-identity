import React from "react";
import { Grid, alpha, styled } from "@mui/material";
import { useModalState } from "@/redux/modal/modalSlice";
import { useAccount, useConnect, useConnectors, useDisconnect } from "wagmi";
import {
  ActionButton,
  Description as StyledDescription,
  Flex,
  FlexRight,
  HighlightText,
  PrimaryLabel,
} from "../Theme/StyledGlobal";
import { useRootNetworkState } from "@/redux/rootNetwork/rootNetworkSlice";

import useWalletIcon, { Wallet } from "@/hooks/useWalletIcon";
import Image from "next/image";

const Container = styled(Grid)(({ theme }) => ({
  maxWidth: "320px",
  width: "100%",
}));

const WalletsContainer = styled(Grid)(({ theme }) => ({
  margin: "10px 0px",
}));

const WalletItem = styled(Flex, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  maxWidth: "320px",
  padding: "14px 40px",
  marginTop: "10px",
  border: `solid 1px ${
    isActive ? theme.palette.primary.main : theme.palette.primary.dark
  }`,
  borderRadius: "8px",
  backgroundColor: isActive
    ? theme.palette.primary.dark
    : alpha(theme.palette.primary.dark, 0.1),
  filter: `drop-shadow(0px 4px 10px ${alpha(
    theme.palette.background.paper,
    0.75
  )})`,

  "&:hover": {
    backgroundColor: isActive
      ? theme.palette.primary.dark
      : alpha(theme.palette.primary.dark, 0.25),
    border: `solid 1px ${alpha(theme.palette.primary.main, 0.5)}`,
    cursor: "pointer",
  },
}));

const WalletName = styled(PrimaryLabel)(({ theme }) => ({
  marginLeft: "20px",
}));

const Highlight = styled(HighlightText)(({ theme }) => ({
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.text.secondary,
  },
}));

const DisconnectButton = styled(ActionButton)(({ theme }) => ({
  "&.MuiButtonBase-root": {
    marginTop: "35px",
  },
}));

export const Wallets: React.FC = () => {
  const connectors = useConnectors();
  const { connect } = useConnect();
  const { connector: activeConnector } = useAccount();

  const { disconnect, isPending: isDisconnecting } = useDisconnect();
  const { useRootNetwork, updateRootDetails } = useRootNetworkState();
  const { data: root } = useRootNetwork();

  const { closeModal, toggleModal } = useModalState();
  const { getIcon } = useWalletIcon();

  const filteredConnectors = connectors?.filter((connector) => {
    return (
      connector.type !== "injected" ||
      (connector.type === "injected" && connector.id === "metaMask")
    );
  });

  const handleDisconnect = () => {
    updateRootDetails({
      ...root,
      address: undefined,
    });
    disconnect();
  };

  return (
    <Container>
      {!activeConnector?.name && !isDisconnecting && (
        <Grid mb={5}>
          <StyledDescription>
            By connecting your wallet, you agree to our
            <Highlight
              onClick={() => {
                toggleModal({
                  id: "Terms",
                  title: "Terms of Service",
                  isXDisabled: true,
                  isFooterEnabled: true,
                  isHeaderEnabled: true,
                  downloadFile: "/documents/rns-terms-of-service.pdf",
                });
              }}
            >
              {" "}
              Terms of Service
            </Highlight>{" "}
            and our
            <Highlight
              onClick={() => {
                toggleModal({
                  id: "Policy",
                  title: "Privacy Policy",
                  isXDisabled: true,
                  isFooterEnabled: true,
                  isHeaderEnabled: true,
                  downloadFile: "/documents/rns-privacy-policy.pdf",
                });
              }}
            >
              {" "}
              Privacy Policy
            </Highlight>
            .
          </StyledDescription>
        </Grid>
      )}
      <WalletsContainer>
        <Grid>
          <Grid mt={4}>
            {filteredConnectors?.map((connector) => {
              return (
                <WalletItem
                  key={connector.id}
                  onClick={() => {
                    connect({ connector });
                    closeModal();
                  }}
                  isActive={activeConnector?.name === connector.name}
                >
                  <Image
                    src={getIcon(connector.name as Wallet)}
                    alt={connector.name}
                    width={32}
                    height={32}
                  />
                  <WalletName>{connector.name}</WalletName>
                </WalletItem>
              );
            })}
          </Grid>
          {activeConnector?.name && (
            <FlexRight>
              <DisconnectButton
                variant="contained"
                onClick={() => {
                  closeModal();
                  handleDisconnect();
                }}
              >
                Disconnect
              </DisconnectButton>
            </FlexRight>
          )}
        </Grid>
      </WalletsContainer>
    </Container>
  );
};

export default Wallets;
