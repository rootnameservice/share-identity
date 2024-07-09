"use client";

import React, { Suspense } from "react";
import { Grid, styled } from "@mui/material";
import { Provider } from "react-redux";

import PageModal from "@/components/Modal/Container";
import store from "@/redux/store";

import "@fontsource/roboto/100.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";

import "@fontsource/roboto-mono/200.css";
import "@fontsource/roboto-mono/400.css";
import "@fontsource/roboto-mono/700.css";
import GlobalTheme from "../Theme/Global";

const WrapperContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export interface WrapperProps {
  children?: React.ReactNode;
}

export const PageWrapper: React.FC<WrapperProps> = (props: WrapperProps) => {
  const { children } = props;

  return (
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
  );
};

export default PageWrapper;
