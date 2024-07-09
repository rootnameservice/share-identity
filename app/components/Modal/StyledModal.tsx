import {
  Dialog as MuiDialog,
  Grid,
  styled,
  alpha,
  Link as MuiLink,
  darken,
} from "@mui/material";
import { FlexCenter, FlexJustified } from "../Theme/StyledGlobal";
import { ContentProps } from "./Container";

export const Dialog = styled(MuiDialog)(({ theme }) => ({
  "& .MuiDialog-container": {
    backgroundColor: alpha(theme.palette.background.paper, 0.85),
  },
  "& .MuiPaper-root": {
    filter: `drop-shadow(0px 10px 15px ${alpha(
      theme.palette.primary.main,
      0.15
    )})`,
    maxWidth: "max-content",
    maxHeight: "max-content",
    borderRadius: "8px",

    [theme.breakpoints.down("sm")]: {
      margin: "16px",
    },
  },
}));

export const Shadow = styled(FlexCenter)(({ theme }) => ({}));

export const DialogContainer = styled(FlexCenter)(({ theme }) => ({
  background: "linear-gradient(180deg, #000000 32.5%, #c2185b 100%)",
}));

export const ContentContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: darken(theme.palette.background.darker, 0.6),
  margin: "1px",
  borderRadius: "8px",
}));

export const Content = styled(Grid, {
  shouldForwardProp: (prop) => prop !== "props",
})<{ props?: ContentProps }>(({ props, theme }) => ({
  paddingTop: props?.isHeaderEnabled ? "10px" : props?.fullHeight ? 0 : "35px",
  paddingBottom: props?.isHeaderEnabled
    ? "10px"
    : props?.fullHeight
    ? 0
    : "25px",
  paddingLeft: props?.fullWidth ? 0 : "30px",
  paddingRight: props?.fullWidth ? 0 : "30px",

  [theme.breakpoints.down("sm")]: {
    // TODO: Clean this up
    paddingTop: props?.fullHeight ? 0 : "20px",
    paddingBottom: props?.fullHeight ? 0 : "20px",
    paddingLeft: props?.fullWidth ? 0 : "15px",
    paddingRight: props?.fullWidth ? 0 : "15px",
  },
}));

export const DownloadButton = styled(MuiLink)(({ theme }) => ({
  border: "none",
  color: theme.palette.primary.main,

  "&:hover": {
    color: theme.palette.primary.dark,
  },
}));

export const Footer = styled(FlexJustified)(({ theme }) => ({
  borderTop: `solid 1px ${alpha(theme.palette.primary.dark, 0.75)}`,
  padding: "24px 50px",
}));

export const PdfIcon = styled("i")(({ theme }) => ({
  color: theme.palette.primary.main,
  marginRight: "8px",
}));
