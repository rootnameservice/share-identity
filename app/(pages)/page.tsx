"use client";

import React, { useEffect, useState } from "react";
import { Grid, styled } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useModalState } from "@/redux/modal/modalSlice";
import HomePage from "@/components/Home/HomePage";

const Container = styled(Grid)(({ theme }) => ({
  padding: "16px",
  margin: "16px",
  height: "calc(100vh - 32px)",
  border: `solid 1px ${theme.palette.primary.dark}`,
}));

export default function Home() {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  const { toggleModal } = useModalState();
  const params = useSearchParams();
  const state = params.get("state") || "";

  useEffect(() => {
    /** toggle the share modal when redirected from rns-server */
    if (state.includes("Share RNS")) {
      toggleModal({
        id: "Share RNS",
        title: "",
        fullHeight: true,
        fullWidth: true,
        isCloseDisabled: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMounted]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // TODO: Add skeleton if not mounted
  return <Container>{hasMounted ? <HomePage /> : <></>}</Container>;
}
