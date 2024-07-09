import {
  Divider as MuiDivider,
  Grid,
  alpha,
  darken,
  styled,
} from "@mui/material";
import {
  ActionButton,
  ButtonLabel,
  FlexCenter,
  SecondaryLabel,
} from "../Theme/StyledGlobal";
import { green, red, yellow } from "@mui/material/colors";
import { FONT_WEIGHT } from "../Theme/Global";
import { X } from "@mui/icons-material";

export const SubContainer = styled(FlexCenter)(({ theme }) => ({
  padding: "25px 8px 0 8px",
}));

export const TwitterIcon = styled(X)(({ theme }) => ({
  margin: "6px 8px",
  fontSize: "16px",
}));

export const ShareDivider = styled(MuiDivider)(({ theme }) => ({
  borderColor: alpha(theme.palette.primary.main, 0.2),
}));

export const ShareLabel = styled(SecondaryLabel)(({ theme }) => ({
  padding: "6px 10px",
  textTransform: "uppercase",
  fontWeight: FONT_WEIGHT.Bold,
}));

export const Container = styled(Grid)(({ theme }) => ({
  padding: "50px 30px 40px 30px",
}));

export const Content = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    alignContent: "space-between",
    minHeight: "250px", // fixed width
    maxWidth: "225px",
  },
}));

export const TweetContainer = styled(Container)(({ theme }) => ({
  backgroundColor: darken(theme.palette.background.darker, 0.6),
}));

export const StepLabel = styled(SecondaryLabel)(({ theme }) => ({
  textAlign: "center",
  fontSize: "20px",
}));

export const Verifying = styled(ButtonLabel)(({ theme }) => ({
  color: yellow[800],
}));

export const Verified = styled(ButtonLabel)(({ theme }) => ({
  color: green[800],
}));

export const Failed = styled(ButtonLabel)(({ theme }) => ({
  color: red[600],
}));

export const Divider = styled(MuiDivider)(({ theme }) => ({
  borderColor: alpha(theme.palette.primary.main, 0.15),
}));

export const ButtonContainer = styled(FlexCenter)(({ theme }) => ({
  height: "fit-content",

  [theme.breakpoints.down("sm")]: {
    paddingTop: "16px",
  },
}));

export const ShareButton = styled(ActionButton)(({ theme }) => ({
  "&.MuiButton-contained": {
    border: `solid 1px ${alpha(theme.palette.primary.main, 0.5)}`,
    backgroundColor: theme.palette.background.paper,
    padding: "8px 24px",

    "&.Mui-disabled": {
      border: `solid 1px ${alpha(theme.palette.primary.dark, 0.5)}`,
    },

    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.dark, 0.2),
    },
  },
}));

export const BulletLabel = styled(SecondaryLabel)(({ theme }) => ({
  fontWeight: FONT_WEIGHT.Bold,
}));

export const BulletContainer = styled(FlexCenter)(({ theme }) => ({
  width: "60px",
  height: "60px",
  border: `dashed 2px ${theme.palette.primary.dark}`,
  borderRadius: "30px",
  marginBottom: "30px",
  filter: `drop-shadow(0px 0px 5px ${theme.palette.background.paper})`,
  backgroundColor: theme.palette.background.darker,
}));
