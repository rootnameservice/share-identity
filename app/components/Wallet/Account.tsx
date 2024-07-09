import React, { useRef, useState } from "react";
import { Container, Divider, Grid, IconButton } from "@mui/material";
import {
  ActionButton,
  Flex,
  FlexRight,
  FlexTop,
  InformationTip,
} from "../Theme/StyledGlobal";
import {
  AccountLabel,
  OnlineIcon,
  ChainLabel,
  RegularText,
  StyledDivider,
  Logo,
  CheckIcon,
  CopyIcon,
  Vertical,
  FpButton,
  Highlight,
  Label,
} from "./StyledWallet";
import { useRootNetworkState } from "@/redux/rootNetwork/rootNetworkSlice";
import { getMaskedAddress } from "@/utils/common";
import { useAccount, useDisconnect } from "wagmi";
import { useModalState } from "@/redux/modal/modalSlice";
import { FUTURE_PASS } from "@/services/endpoints";
import { Address } from "viem";

import useWalletIcon, { Wallet } from "@/hooks/useWalletIcon";
import Image from "next/image";
import useNetworkConfig from "@/hooks/useNetworkConfig";

export interface AccountProps {
  toggleClose?: () => void;
}

export const Account: React.FC<AccountProps> = (props) => {
  const { toggleClose } = props;

  const { connector, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { network } = useNetworkConfig();

  const { toggleModal } = useModalState();
  const { useRootNetwork, updateRootDetails } = useRootNetworkState();
  const { data: root } = useRootNetwork();
  const { path } = useWalletIcon({ name: connector?.name as Wallet });

  const [isCopied, setIsCopied] = useState("");

  const [isFpActive, setIsFpActive] = useState<boolean>(
    root.isFpActive || false
  );

  const switchRef = useRef(null);

  const handleSwitchAddress = () => {
    document.cookie = `isFpActive=${!isFpActive}; path=/`;
    setIsFpActive(!isFpActive);
    updateRootDetails({
      ...root,
      isFpActive: !isFpActive,
      address: (!isFpActive
        ? root.futurePassAddress
        : root.eoaAddress) as Address,
    });
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.log(`failed to copy ${text}`);
    }
  };

  const handleDisconnect = () => {
    updateRootDetails({
      ...root,
      address: undefined,
    });
    disconnect();
  };

  return (
    <>
      <Container>
        <AccountLabel>Account</AccountLabel>
        <Grid py={2.5}>
          <FlexTop>
            <OnlineIcon />
            <Grid>
              <Flex>
                <Highlight>The Root Network</Highlight>
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                <ChainLabel>{network}</ChainLabel>
              </Flex>
              <Flex pt={0.5}>
                <ChainLabel>Chain Id:</ChainLabel>
                <RegularText>{chainId}</RegularText>
              </Flex>
            </Grid>
          </FlexTop>
        </Grid>
        <StyledDivider />
        <Grid py={2.5} pl={2.5}>
          <Flex
            sx={{
              transform: isFpActive ? "translate(0, 55px)" : "",
              transition: "all 0.25s ease-out allow-discrete",
            }}
          >
            <Logo>
              <Image
                src={path}
                alt="Wallet Icon"
                width={20}
                height={20}
                style={{
                  color: "text.primary",
                  marginRight: root.eoaAddress ? "" : "8px",
                  opacity: isFpActive ? "0.25" : "1",
                }}
              />
            </Logo>
            <Grid>
              <Label
                sx={{
                  opacity: isFpActive ? "0.25" : "1",
                }}
              >{`${connector?.name} Address`}</Label>
              <Flex>
                <Highlight
                  sx={{
                    color: isFpActive ? "text.secondary" : "primary.main",
                    opacity: isFpActive ? "0.25" : "1",
                  }}
                >
                  {getMaskedAddress(root.eoaAddress || "")}
                </Highlight>
                <IconButton
                  sx={{ p: 0, ml: 3 }}
                  onClick={() => {
                    setIsCopied("eoa");
                    handleCopy(root.eoaAddress || "");
                  }}
                >
                  {isCopied === "eoa" ? <CheckIcon /> : <CopyIcon />}
                </IconButton>
              </Flex>
            </Grid>
          </Flex>
          <Vertical />
          <Flex
            sx={{
              transform: isFpActive ? "translate(0, -55px)" : "",
              transition: "all 0.25s ease-out allow-discrete",
            }}
          >
            <Logo sx={{ opacity: isFpActive ? "1" : "0.25" }}>
              <Image
                src="/icons/futurePass.svg"
                alt="Wallet Icon"
                width={20}
                height={20}
                style={{
                  color: "text.primary",
                  marginRight: root.eoaAddress ? "" : "8px",
                }}
              />
            </Logo>
            <Grid>
              {root.futurePassAddress ? (
                <Grid>
                  <Label sx={{ opacity: isFpActive ? "1" : "0.25" }}>
                    FuturePass Address
                  </Label>
                  <Flex>
                    <Highlight
                      sx={{
                        color: isFpActive ? "primary.main" : "text.secondary",
                        opacity: isFpActive ? "1" : "0.25",
                      }}
                    >
                      {getMaskedAddress(root.futurePassAddress || "")}
                    </Highlight>
                    <IconButton
                      sx={{ p: 0, ml: 3 }}
                      onClick={() => {
                        setIsCopied("fp");
                        handleCopy(root.futurePassAddress || "");
                      }}
                    >
                      {isCopied === "fp" ? <CheckIcon /> : <CopyIcon />}
                    </IconButton>
                  </Flex>
                </Grid>
              ) : (
                <Flex>
                  <FpButton
                    variant="contained"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.open(FUTURE_PASS, "_blank");
                      }
                    }}
                  >
                    Create a FuturePass
                  </FpButton>
                </Flex>
              )}
            </Grid>
          </Flex>
          {root.futurePassAddress && (
            <FlexRight pt={2.5}>
              <InformationTip title="" arrow placement="top">
                <Grid>
                  <FpButton
                    ref={switchRef}
                    variant="contained"
                    className="step-2-switch-account"
                    onClick={() => {
                      handleSwitchAddress();
                    }}
                  >
                    {isFpActive
                      ? `Switch to ${connector?.name}`
                      : "Switch to FuturePass"}
                  </FpButton>
                </Grid>
              </InformationTip>
            </FlexRight>
          )}
        </Grid>
        <StyledDivider />
        <FlexRight pt={2.5}>
          <Grid pr={1}>
            <ActionButton
              variant="contained"
              onClick={() => {
                if (toggleClose) {
                  toggleClose();
                }

                toggleModal({
                  id: "Wallets",
                  title: "Switch Wallet",
                  isXDisabled: true,
                });
              }}
            >
              Switch Wallet
            </ActionButton>
          </Grid>
          <Grid>
            <ActionButton
              variant="contained"
              onClick={() => {
                if (toggleClose) {
                  toggleClose();
                }
                handleDisconnect();
              }}
            >
              Disconnect
            </ActionButton>
          </Grid>
        </FlexRight>
      </Container>
    </>
  );
};

export default Account;
