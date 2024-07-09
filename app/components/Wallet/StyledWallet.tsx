import {
  Avatar,
  Divider,
  Grid,
  alpha,
  styled,
  MenuItem as MuiMenuItem,
} from "@mui/material";
import { Check, ContentCopy } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import {
  Divider as SDivider,
  ActionButton,
  Flex,
  ToggleButtonGroup as StyledToggleButtonGroup,
  ToggleButton as StyledToggleButton,
  SecondaryLabel,
} from "../Theme/StyledGlobal";
import { FONT_WEIGHT } from "../Theme/Global";

export const ToolbarContainer = styled(Flex)(({ theme }) => ({
  padding: "10px 0",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    justifyContent: "center",
  },
}));

export const ActionLabel = styled(SecondaryLabel)(({ theme }) => ({
  textTransform: "none",
  fontSize: "15px",
  textAlign: "center",
  fontFamily: "var(--secondary-font)",
}));

export const ToggleButtonGroup = styled(StyledToggleButtonGroup)(
  ({ theme }) => ({
    borderRadius: "16px",
    minWidth: 0,
  })
);

export const ToggleButton = styled(StyledToggleButton)(({ theme }) => ({
  width: "auto",
  height: "auto",
  padding: "8px 16px",
  borderRadius: "16px",
  backgroundColor: alpha(theme.palette.primary.main, 0.85),

  "&.MuiToggleButton-root": {
    color: theme.palette.text.primary,
  },
}));

export const ToolbarLabel = styled(SecondaryLabel, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
  padding: "11px 0",
  fontSize: "15px",
  width: "max-content",
  color: isSelected ? theme.palette.primary.main : theme.palette.text.primary,

  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

export const MenuContainer = styled(Grid)(({ theme }) => ({
  minWidth: "150px",
  padding: "16px 0",
}));

export const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "baseline",
  padding: "4px 16px",
  minHeight: 0,

  "&:last-of-type": {
    borderRadius: "8px",
  },

  "&:hover": {
    backgroundColor: theme.palette.background.darker,
  },
}));

export const MenuLabel = styled(ToolbarLabel)(({ theme }) => ({
  fontSize: "14px",
  padding: "2px 4px",
  width: "100%",
}));

export const MenuDivider = styled(SDivider)(({ theme }) => ({
  margin: "12px 0 !important", // fix the important here - avoid this
}));

export const Container = styled(Grid)(({ theme }) => ({
  minWidth: "275px",
}));

export const AccountLabel = styled(SecondaryLabel)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: FONT_WEIGHT.Bold,
}));

export const Highlight = styled(SecondaryLabel)(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.primary.main,
}));

export const Label = styled(Highlight)(({ theme }) => ({
  color: theme.palette.text.primary,
  paddingRight: "8px",
  fontSize: "12px",
  paddingBottom: "2px",
}));

export const ChainLabel = styled(Label)(({ theme }) => ({
  paddingBottom: 0,
  fontSize: "14px",
  textTransform: "capitalize",
}));

export const RegularText = styled(Highlight)(({ theme }) => ({
  color: alpha(theme.palette.text.primary, 0.75),
}));

export const OnlineIcon = styled(Grid)(({ theme }) => ({
  width: "8px",
  height: "8px",
  borderRadius: "4px",
  backgroundColor: green[600],
  marginRight: "8px",
  marginTop: "4px",
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  marginY: "20px",
  borderColor: alpha(theme.palette.primary.dark, 0.25),
}));

export const Vertical = styled(Grid)(({ theme }) => ({
  height: "16px",
  width: "4px",
  marginLeft: "18px",
  backgroundColor: alpha(theme.palette.background.dark, 0.1),
}));

export const Logo = styled(Avatar)(({ theme }) => ({
  marginRight: "10px",
  backgroundColor: theme.palette.background.dark,
}));

export const CopyIcon = styled(ContentCopy)(({ theme }) => ({
  width: "16px",
  height: "16px",
  color: alpha(theme.palette.text.primary, 0.25),
}));

export const CheckIcon = styled(Check)(({ theme }) => ({
  width: "16px",
  height: "16px",
  color: alpha(theme.palette.text.primary, 0.25),
}));

export const FpButton = styled(ActionButton)(({ theme }) => ({
  "&.MuiButtonBase-root": {
    padding: "4px 12px",
  },
  "&.MuiButton-contained": {
    "&.Mui-disabled": {
      backgroundColor: alpha(theme.palette.background.dark, 0.25),
    },
  },
}));
