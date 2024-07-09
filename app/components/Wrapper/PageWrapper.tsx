"use client";

import React, { Suspense } from "react";
import { Grid, styled } from "@mui/material";
import { Provider } from "react-redux";

import { Config, WagmiProvider } from "wagmi";
import { config } from "@/chains/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import GlobalTheme from "../Theme/Global";
import PageModal from "@/components/Modal/Container";
import store from "@/redux/store";

import "@fontsource/roboto/100.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";

import "@fontsource/roboto-mono/200.css";
import "@fontsource/roboto-mono/400.css";
import "@fontsource/roboto-mono/700.css";

const WrapperContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export interface WrapperProps {
  children?: React.ReactNode;
}

const queryClient = new QueryClient();

export const PageWrapper: React.FC<WrapperProps> = (props: WrapperProps) => {
  const { children } = props;

  return (
    <WagmiProvider config={config as unknown as Config} reconnectOnMount={true}>
      {/* Tanstack Provider - Server side and needed by wagmi */}
      <QueryClientProvider client={queryClient}>
        {/* RTK Query Provider - Client side State Management */}
        <Provider store={store}>
          <Suspense fallback={<Grid></Grid>}>
            <GlobalTheme>
              <WrapperContainer>
                <Grid>
                  <PageModal />
                  {children}
                </Grid>
              </WrapperContainer>
            </GlobalTheme>
          </Suspense>
        </Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default PageWrapper;
