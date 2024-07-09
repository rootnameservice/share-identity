import React from "react";
import { FlexCenter } from "../Theme/StyledGlobal";
import { Connect } from "../Wallet/Connect";

import useConnectRoot from "@/hooks/useConnectRoot";

export const HomePage: React.FC = () => {
  useConnectRoot({ state: "initialize" });

  return (
    <FlexCenter>
      <Connect />
    </FlexCenter>
  );
};

export default HomePage;
