"use client";

import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

export default function Home() {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return <Grid>Home Page</Grid>;
}
