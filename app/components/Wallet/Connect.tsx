import React, { useEffect, useState } from "react";
import { Relative, SkeletonTypography } from "../Theme/StyledGlobal";
import {
  ToggleButtonGroup,
  ToggleButton,
  ActionLabel,
} from "../Wallet/StyledWallet";
import { useAccount, useEnsName } from "wagmi";
import { useRootNetworkState } from "@/redux/rootNetwork/rootNetworkSlice";
import { Address } from "viem";
import { useModalState } from "@/redux/modal/modalSlice";
import { getMaskedAddress } from "@/utils/common";
import { Grid } from "@mui/material";

import Image from "next/image";
import useWalletIcon, { Wallet } from "@/hooks/useWalletIcon";
import MenuPopover from "../Reusables/MenuPopover";
import Account from "./Account";

export const Connect: React.FC = () => {
  const { address: walletAddress, connector, status, chainId } = useAccount();
  const { useRootNetwork } = useRootNetworkState();
  const {
    data: { address },
  } = useRootNetwork();

  const {
    data: ensName,
    refetch,
    isSuccess: isEnsFetched,
    isLoading: isEnsFetching,
  } = useEnsName({
    address: address as Address,
  });

  const { toggleModal } = useModalState();
  const { path } = useWalletIcon({ name: connector?.name as Wallet });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<(EventTarget & HTMLElement) | null>(
    null
  );

  /**
   * Move wallet label and icon path to useState/useEffect
   * to fix nextjs hydration issue wherein the generated
   * html on the server does not match the rendered html
   * on the client-side
   */
  const [walletLabel, setWalletLabel] = useState<string>("");
  const [iconPath, setIconPath] = useState<string>("/icons/wallet.svg");
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  const isLabelLoading =
    status !== "disconnected" && isEnsFetching && !isEnsFetched;

  useEffect(() => {
    if (hasMounted) {
      let label = "";
      if (status === "connected") {
        // should not be loading and should be successful
        if (!isEnsFetching && isEnsFetched && address) {
          label = ensName || getMaskedAddress(address);
          setWalletLabel(label);
        }
      } else if (status === "disconnected") {
        label = "Connect Wallet";
        setWalletLabel(label);
      }
      const walletIcon = address ? path : "/icons/wallet.svg";
      setIconPath(walletIcon);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    address,
    walletAddress,
    ensName,
    isEnsFetched,
    isEnsFetching,
    hasMounted,
  ]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress, address, chainId]);

  /**
   * This is to fix NextJS hydration.
   * Make sure that the component loaded first,
   * before doing other stuff
   */
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <Grid>
      <ToggleButtonGroup>
        <ToggleButton
          value=""
          onClick={() => {
            if (address) {
              toggleModal({
                id: "Wallets",
                title: address ? "Switch Wallet" : "Choose your Wallet",
                isXDisabled: true,
              });
            }
          }}
        >
          <Image
            src={iconPath}
            alt="Wallet Icon"
            width={24}
            height={24}
            style={{ color: "white" }}
          />
        </ToggleButton>
        <ToggleButton
          value=""
          onClick={(event) => {
            if (!address && hasMounted) {
              toggleModal({
                id: "Wallets",
                title: address ? "Switch Wallet" : "Choose your Wallet",
                isXDisabled: true,
              });
            }
            if (address && hasMounted) {
              setIsOpen(!isOpen);
              setAnchor(event.currentTarget);
            }
          }}
        >
          <Relative minWidth={140}>
            <SkeletonTypography
              isloading={isLabelLoading || !hasMounted}
              sx={{ bgcolor: "primary.light" }}
            />
            <ActionLabel isloading={isLabelLoading || !hasMounted}>
              {walletLabel || "Connect Wallet"}
            </ActionLabel>
          </Relative>
        </ToggleButton>
      </ToggleButtonGroup>
      <Grid>
        <MenuPopover
          isOpen={isOpen}
          anchorEl={anchor}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          toggleClose={() => {
            setIsOpen(false);
          }}
        >
          {address && (
            <Grid p={3} minWidth={250}>
              <Account
                toggleClose={() => {
                  setIsOpen(false);
                }}
              />
            </Grid>
          )}
        </MenuPopover>
      </Grid>
    </Grid>
  );
};
