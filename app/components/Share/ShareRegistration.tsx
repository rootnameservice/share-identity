import React, { useEffect, useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
import {
  BulletContainer,
  BulletLabel,
  Content,
  ButtonContainer,
  TweetContainer,
  Verifying,
  Failed,
  Divider,
  Container,
  StepLabel,
} from "./StyledShare";

import {
  ButtonLabel,
  FlexCenter,
  InformationTip,
  ModalInputField,
  ShareButton,
} from "../Theme/StyledGlobal";

import {
  useGetTweetByIdQuery,
  useGetUserDetailsQuery,
  useTriggerWebhookMutation,
} from "@/redux/share/shareApi";

import { isEmpty } from "lodash";
import { TWITTER_AUTH } from "@/services/endpoints";
import { TWEETS_RNS } from "@/constants/content";
import { parseCookie } from "@/utils/common";
import { useRootNetworkState } from "@/redux/rootNetwork/rootNetworkSlice";
import { useShareState } from "@/redux/share/shareSlice";
import { Verified } from "@mui/icons-material";

interface BulletProps {
  index: number;
}

const Bullet: React.FC<BulletProps> = (props: BulletProps) => {
  const { index } = props;
  return (
    <FlexCenter>
      <BulletContainer>
        <BulletLabel>{index}</BulletLabel>
      </BulletContainer>
    </FlexCenter>
  );
};

export const ShareRegistration: React.FC = () => {
  const redirectUri = `${process.env.NEXT_PUBLIC_TWITTER_API_URL}/auth/twitter`;
  const clientId = process.env.NEXT_PUBLIC_TWITTER_API_CLIENT_ID;

  const [link, setLink] = useState<string>("");
  const [tweetId, setTweetId] = useState<string>("");
  const [invalidTweet, setInvalidTweet] = useState<string>("");

  const isAccessRequested = parseCookie("isAccessRequested") === "true";
  const isTweetVerified = parseCookie("isTweetVerified") === "true";

  const { updateShareStatus } = useShareState();
  const { useRootNetwork } = useRootNetworkState();
  const {
    data: { futurePassAddress },
  } = useRootNetwork();

  const { data: userResponse } = useGetUserDetailsQuery(
    {},
    { skip: !isAccessRequested }
  );
  const isGranted = !isEmpty(userResponse?.data?.id);

  /**
   * Verify the link provided.
   * Skip this call when there is no tweetId and access_token provided
   */
  const {
    data: verifyResponse,
    isFetching: isVerifying,
    isSuccess: isVerified,
    isError: isVerifyFailed,
  } = useGetTweetByIdQuery(
    { tweetId: tweetId || "" },
    { skip: !isGranted || isEmpty(tweetId) }
  );

  const [triggerWebhook, result] = useTriggerWebhookMutation();

  const handleLink = () => {
    document.cookie = `isAccessRequested=${true}; path=/`;
    const scope = "tweet.read%20tweet.write%20users.read";

    const url =
      `${TWITTER_AUTH}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}` +
      `&scope=${scope}&state=modal-Share RNS&code_challenge=challenge&code_challenge_method=plain`;

    if (typeof window !== "undefined") {
      window.open(url, "_self");
    }
  };

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

  const handleVerify = () => {
    const pattern = new RegExp(/status\//g);
    const tweetId = link.toLowerCase().split(pattern)[1];

    if (tweetId) {
      setTweetId(tweetId);
    } else {
      setInvalidTweet("Invalid tweet url");
    }
  };

  useEffect(() => {
    const twitterId = verifyResponse?.data?.id;

    updateShareStatus({
      isLoading: isVerifying,
      isError: isVerifyFailed,
    });

    if (twitterId && futurePassAddress) {
      triggerWebhook({ futurePass: futurePassAddress });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVerifying, futurePassAddress]);

  useEffect(() => {
    if (result.isSuccess) {
      document.cookie = `isTweetVerified=${true}; path=/`;
    }

    updateShareStatus({
      isLoading: result.isLoading,
      isSuccess: result.isSuccess,
      isError: result.isError,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isLoading]);

  return (
    <FlexCenter
      container
      position="relative"
      maxHeight="85vh"
      overflow="overlay"
    >
      <Container item xs={12} sm={3.95}>
        <Content item container>
          <Grid item xs={12} height="fit-content">
            <Bullet index={1} />
            <StepLabel>Link your Twitter Account</StepLabel>
          </Grid>
          <ButtonContainer item xs={12}>
            <ShareButton
              variant="contained"
              disabled={isGranted}
              onClick={() => {
                handleLink();
              }}
            >
              <FlexCenter>
                <ButtonLabel status={isGranted ? "disabled" : ""}>
                  {isGranted ? "Linked" : "Link"}
                </ButtonLabel>
              </FlexCenter>
            </ShareButton>
          </ButtonContainer>
        </Content>
      </Container>
      <Divider
        flexItem
        orientation="vertical"
        sx={{
          display: {
            xs: "none",
            sm: "flex",
          },
        }}
      />
      <Grid
        item
        xs={12}
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
      >
        <Divider flexItem orientation="horizontal" />
      </Grid>
      <TweetContainer item xs={12} sm={3.95}>
        <Content container>
          <Grid item xs={12} height="fit-content">
            <Bullet index={2} />
            <StepLabel>Tweet your newly registered RNS! </StepLabel>
          </Grid>
          <ButtonContainer item xs={12}>
            <ShareButton
              disabled={!isGranted}
              variant="contained"
              onClick={() => {
                handleTweet();
              }}
            >
              <ButtonLabel status={!isGranted ? "disabled" : ""}>
                Tweet
              </ButtonLabel>
            </ShareButton>
          </ButtonContainer>
        </Content>
      </TweetContainer>
      <Divider
        flexItem
        orientation="vertical"
        sx={{
          display: {
            xs: "none",
            sm: "flex",
          },
        }}
      />
      <Grid
        item
        xs={12}
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
      >
        <Divider flexItem orientation="horizontal" />
      </Grid>
      <Container item xs={12} sm={3.95}>
        <Content container>
          <Grid item xs={12} height="fit-content">
            <Bullet index={3} />
            <StepLabel>Verify your shared post</StepLabel>
            <ModalInputField
              value={link}
              error={invalidTweet !== ""}
              helperText={invalidTweet}
              label="URL"
              placeholder="Insert post URL"
              focused
              onChange={(event) => {
                const { value } = event.target;
                setLink(value);
                setInvalidTweet("");
              }}
            />
          </Grid>
          <InformationTip
            title={isTweetVerified ? "You have already shared a name!" : ""}
          >
            <ButtonContainer item xs={12}>
              <ShareButton
                disabled={!isGranted || isEmpty(link) || isTweetVerified}
                variant="contained"
                onClick={() => {
                  handleVerify();
                }}
              >
                {isVerifying ? (
                  <Verifying>Verifying</Verifying>
                ) : isVerified ? (
                  <Verified>Verified</Verified>
                ) : isVerifyFailed ? (
                  <Failed>Verfication Failed</Failed>
                ) : (
                  <ButtonLabel
                    status={!isGranted || isEmpty(link) ? "disabled" : ""}
                  >
                    Verify
                  </ButtonLabel>
                )}
                {isVerifying && (
                  <CircularProgress size="16px" sx={{ ml: "8px" }} />
                )}
              </ShareButton>
            </ButtonContainer>
          </InformationTip>
        </Content>
      </Container>
    </FlexCenter>
  );
};

export default ShareRegistration;
