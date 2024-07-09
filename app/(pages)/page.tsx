"use client";

import React, { useEffect, useState } from "react";
import { Grid, styled } from "@mui/material";
import HomePage from "@/components/Home/HomePage";

const Container = styled(Grid)(({ theme }) => ({
  padding: "16px",
  margin: "16px",
  height: "calc(100vh - 32px)",
  border: `solid 1px ${theme.palette.primary.dark}`,
}));

export default function Home() {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // TODO: Add skeleton if not mounted
  return <Container>{hasMounted ? <HomePage /> : <></>}</Container>;
}
