import React from "react";
import {
  Box,
  Grid,
  Popover,
  PopoverOrigin,
  darken,
  styled,
} from "@mui/material";

const Container = styled(Grid)(({ theme }) => ({
  background: "linear-gradient(180deg, #000000 32.5%, #c2185b 100%)",
  borderRadius: "4px",
  padding: "1px",
}));

const Content = styled(Grid)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: darken(theme.palette.background.darker, 0.5),
}));

export interface MenuPopover {
  children?: React.ReactNode;
  isOpen: boolean;
  anchorEl: (EventTarget & HTMLElement) | HTMLButtonElement | null;
  toggleClose: () => void;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
}

export const MenuPopover: React.FC<MenuPopover> = (props: MenuPopover) => {
  const {
    children,
    isOpen,
    anchorEl,
    toggleClose,
    anchorOrigin = { vertical: "bottom", horizontal: "right" },
    transformOrigin = { vertical: "top", horizontal: "right" },
  } = props;

  return (
    <Box>
      <Popover
        sx={{
          ".MuiPaper-root": {
            marginLeft: "8px",
          },
        }}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={toggleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        <Container>
          <Content>{children}</Content>
        </Container>
      </Popover>
    </Box>
  );
};

export default MenuPopover;
