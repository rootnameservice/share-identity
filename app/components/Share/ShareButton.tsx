import React from "react";
import { InformationTip, ShareButton } from "../Theme/StyledGlobal";
import {
  SubContainer,
  TwitterIcon,
  ShareLabel,
  ShareDivider,
} from "./StyledShare";
import { TWEETS_RNS } from "@/constants/content";
import { useRootNetworkState } from "@/redux/rootNetwork/rootNetworkSlice";
import { parseCookie } from "@/utils/common";
import { useShareState } from "@/redux/share/shareSlice";
import { useModalState } from "@/redux/modal/modalSlice";
import { useAccount } from "wagmi";

import useConnectRoot from "@/hooks/useConnectRoot";

export const Share: React.FC = () => {
  useConnectRoot({ state: "initialize" });

  const { status } = useAccount();
  const { useShareStatus } = useShareState();
  const { isSuccess } = useShareStatus();
  const { toggleModal } = useModalState();
  const { useRootNetwork } = useRootNetworkState();
  const {
    data: { futurePassAddress },
  } = useRootNetwork();

  // No longer used
  // const isShareEnabled = isRegisteredDuringQuest(createdAt);
  const isShareEnabled = true;
  const isTweetVerified =
    parseCookie("isTweetVerified") === "true" || isSuccess;

  const isShareDisabled =
    !isShareEnabled ||
    isTweetVerified ||
    !futurePassAddress ||
    status === "disconnected";

  const handleTweet = () => {
    const content = TWEETS_RNS[Math.floor(Math.random() * TWEETS_RNS.length)];
    const imageTweet = "https://t.co/x0QM05p4ia";

    const url = `http://twitter.com/intent/tweet?text=${encodeURIComponent(
      `${content} ${imageTweet}`
    )}`;

    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  };

  return (
    <InformationTip
      title={
        status === "disconnected"
          ? "Connect your wallet first!"
          : !isShareEnabled
          ? "This identity was registered outside of the quest period."
          : !futurePassAddress
          ? "You do not have a FuturePass address, please create one to complete the Quest."
          : isTweetVerified
          ? "Post sharing during Quest period successfully completed."
          : ""
      }
    >
      <SubContainer>
        <ShareButton
          sx={{
            "&.MuiButton-contained": {
              padding: "0 8px",
            },
          }}
          variant="contained"
          disabled={isShareDisabled}
          onClick={() => {
            // post quest implementation
            // handleTweet();

            // during quest implementation
            toggleModal({
              id: "Share RNS",
              title: "",
              fullHeight: true,
              fullWidth: true,
              isCloseDisabled: true,
            });
          }}
        >
          <TwitterIcon />
          <ShareDivider orientation="vertical" flexItem />
          <ShareLabel isDisabled={isShareDisabled}>Share</ShareLabel>
        </ShareButton>
      </SubContainer>
    </InformationTip>
  );
};

export default ShareButton;
