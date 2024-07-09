import React from "react";
import { FlexCenter } from "../Theme/StyledGlobal";
import { Connect } from "../Wallet/Connect";
import { Grid } from "@mui/material";
import { Share } from "../Share/ShareButton";
import useConnectRoot from "@/hooks/useConnectRoot";

export const HomePage: React.FC = () => {
  useConnectRoot({ state: "initialize" });

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
