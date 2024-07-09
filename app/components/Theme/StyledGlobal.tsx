import {
  Button,
  Grid,
  alpha,
  styled,
  Divider as MuiDivider,
  Typography,
  TextField,
  IconButton,
  Skeleton,
  Theme,
  Tooltip,
  TooltipProps,
  tooltipClasses,
  Box,
  ToggleButton as MuiToggleButton,
  ToggleButtonGroup as MuiToggleGroup,
  darken,
  Chip,
  Switch,
} from "@mui/material";
import { amber, grey, red, yellow } from "@mui/material/colors";
import { FONT_SIZE, FONT_WEIGHT } from "./Global";
import { Close, Warning } from "@mui/icons-material";
import { isEmpty } from "lodash";

export const Container = styled(Grid, {
  shouldForwardProp: (prop) => prop !== "isLoading",
})<{ isLoading?: boolean }>(({ theme, isLoading }) => ({
  visibility: isLoading ? "visible" : "hidden",
}));

export const Relative = styled(Grid)(({ theme }) => ({
  position: "relative",
}));

export const Flex = styled(Grid, {
  shouldForwardProp: (prop) => prop !== "isloading",
})<{ isloading?: boolean }>(({ isloading = false }) => ({
  display: !isloading ? "flex" : "none",
  alignItems: "center",
}));

export const FlexJustified = styled(Flex)(({ theme }) => ({
  justifyContent: "space-between",
}));

export const FlexEven = styled(Flex)(({ theme }) => ({
  justifyContent: "space-evenly",
}));

export const FlexCenter = styled(Flex)(({ theme }) => ({
  justifyContent: "center",
}));

export const FlexLeft = styled(Flex)(({ theme }) => ({
  justifyContent: "start",
}));

export const FlexRight = styled(Flex)(({ theme }) => ({
  justifyContent: "end",
}));

export const FlexTop = styled(Flex)(({ theme }) => ({
  alignItems: "start",
}));

export const BaseButton = styled(Button)(({ theme }) => ({
  textTransform: "none",

  "&.MuiButtonBase-root": {
    borderRadius: "8px",
    minWidth: 0,
  },

  "&.MuiButton-text": {
    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
  },
}));

export const ActionButton = styled(BaseButton)(({ theme }) => ({
  "&.MuiButtonBase-root": {
    filter: `drop-shadow(0px 0px 5px ${alpha(
      theme.palette.background.paper,
      0.25
    )})`,
  },
  "&.MuiButton-contained": {
    // border: `solid 1px ${alpha(grey[400], 0.15)}`,

    "&.Mui-disabled": {
      color: grey[700],
      border: "none",
      backgroundColor: alpha(theme.palette.primary.dark, 0.25),
    },
  },
  "&.MuiButton-text": {
    color: theme.palette.text.primary,
    border: "none",
    padding: "8px 16px",

    "&.Mui-disabled": {
      color: grey[700],
    },

    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
  },
}));

export const ToolbarButton = styled(Button)(({ theme }) => ({
  "&.MuiButtonBase-root": {
    minWidth: 0,
    filter: `drop-shadow(0px 0px 4px ${alpha(
      theme.palette.primary.dark,
      0.5
    )})`,
    borderRadius: "16px",
    border: `solid 1px ${alpha(grey[50], 0.15)}`,
    fontSize: "14px",
    fontFamily: "var(--default-font)",
  },

  "&.MuiButton-text": {
    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
  },
}));

export const SocialButton = styled(ToolbarButton)(({ theme }) => ({
  textTransform: "capitalize",
  marginLeft: "5px",
  "&.MuiButtonBase-root": {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    border: `solid 1px ${theme.palette.primary.main}`,
    height: "40px",
    width: "50px",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export const ShareButton = styled(ActionButton)(({ theme }) => ({
  "&.MuiButton-contained": {
    borderRadius: "4px",
    border: `solid 1px ${alpha(theme.palette.primary.dark, 0.75)}`,
    backgroundColor: theme.palette.background.paper,
    padding: 0,

    "&.Mui-disabled": {
      opacity: 0.5,
      color: grey[700],
      border: `solid 1px ${alpha(theme.palette.primary.dark, 0.5)}`,
      backgroundColor: alpha(theme.palette.primary.dark, 0.15),
    },
  },
}));

export const BaseIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.darker,
  borderRadius: "8px",
  padding: "10px",
}));

export const HighlightText = styled("span")(({ theme }) => ({
  fontWeight: FONT_WEIGHT.Bold,
  color: theme.palette.text.primary,
}));

export const Divider = styled(MuiDivider)(({ theme }) => ({
  margin: "4px 20px",
  borderColor: alpha(theme.palette.primary.main, 0.2),
}));

export const Description = styled(Grid)(({ theme }) => ({
  fontFamily: "var(--default-font)",
  textAlign: "center",
  fontSize: "12px",
  fontWeight: FONT_WEIGHT.Light,
  color: theme.palette.secondary.main,
}));

export const Title = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isloading",
})<{ isloading?: boolean }>(({ theme, isloading }) => ({
  visibility: isloading ? "hidden" : "visible",
  fontFamily: "var(--default-font)",
  fontSize: "24px",
  fontWeight: FONT_WEIGHT.Bold,
  textAlign: "center",
  marginBottom: "20px",

  [theme.breakpoints.down("md")]: {
    fontSize: FONT_SIZE.Large,
  },
}));

export const SubTitle = styled(Title)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: FONT_WEIGHT.Light,
  letterSpacing: "normal",
}));

export const Heading = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isloading",
})<{ isloading?: boolean }>(({ theme, isloading }) => ({
  visibility: isloading ? "hidden" : "visible",
  fontFamily: "var(--secondary-font)",
  fontSize: "36px",
  fontWeight: FONT_WEIGHT.Bold,
}));

export const BaseInputField = styled(TextField)(({ theme }) => ({
  ".MuiInputBase-input": {
    padding: "0",

    "&.Mui-disabled": {
      WebkitTextFillColor: theme.palette.text.primary,
    },
  },

  ".MuiInputBase-root": {
    borderRadius: "8px",

    "&.MuiFilledInput-root": {
      backgroundColor: theme.palette.background.darker,
      "&::before": {
        border: "none",
      },
      "&::after": {
        border: "none",
        transition: "none", // disable animation
      },
      "&:hover": {
        backgroundColor: alpha(theme.palette.background.dark, 0.5),
        "&::before": {
          border: "none",
          transition: "none", // disable animation
        },
      },
    },

    "&.MuiOutlinedInput-root": {
      fontStyle: "italic",
      fontFamily: "var(--secondary-font)",
      fontSize: "18px",
      padding: "16px 25px",
      boxShadow: `0 0 10px 2px ${theme.palette.background.paper}`,
      [theme.breakpoints.down("md")]: {
        fontSize: "14px",
      },

      "& fieldset": {
        borderColor: theme.palette.primary.dark,

        "& legend": {
          fontSize: "16px",
        },
      },
      "&:hover fieldset": {
        borderColor: alpha(theme.palette.primary.main, 0.75),
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
        borderWidth: "1px",
      },
    },
  },
}));

export const InputField = styled(BaseInputField)(({ theme }) => ({
  "&.MuiFormControl-root": {
    width: "100%",
    "& .MuiFormLabel-root": {
      "&.MuiInputLabel-root": {
        fontSize: "18px",
        color: alpha(theme.palette.text.primary, 0.5),
      },
    },

    "& .MuiFormHelperText-root": {
      position: "absolute",
      bottom: "-24px",
    },
  },
  ".MuiInputBase-root": {
    backgroundColor: alpha(theme.palette.primary.dark, 0.15),
    borderRadius: "8px",

    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },

    "&.MuiOutlinedInput-root": {
      fontStyle: "normal",
      fontFamily: "var(--secondary-font)",
      fontSize: "14px",
      padding: "10px 25px",

      "&:hover fieldset": {
        borderColor: alpha(theme.palette.primary.main, 0.5),
      },
      "&.Mui-focused fieldset": {
        borderColor: alpha(theme.palette.primary.main, 1),
      },
    },
  },
}));

export const ModalInputField = styled(InputField)(({ theme }) => ({
  ".MuiInputBase-root": {
    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },

    "&.MuiOutlinedInput-root": {
      fontFamily: "var(--secondary-font)",
      [theme.breakpoints.down("md")]: {
        fontSize: "14px",
      },

      fontSize: "16px",
      fontWeight: FONT_WEIGHT.Regular,
      padding: "16px 25px",
      color: theme.palette.text.primary,

      "&.Mui-error fieldset": {
        borderColor: red[800],
        borderWidth: "1px",
      },
    },
  },

  "&:not(:first-of-type)": {
    marginTop: "20px",
  },
}));

export const FieldContainer = styled(FlexJustified)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: alpha(theme.palette.primary.dark, 0.15),
  border: `solid 1px ${alpha(theme.palette.primary.main, 0.5)}`,
  marginTop: "10px",
  padding: "16px 25px",
  filter: `drop-shadow(0px 0px 10px ${theme.palette.background.paper})`,
}));

export const SkeletonGeneric = styled(Skeleton, {
  shouldForwardProp: (prop) => prop !== "isloading",
})<{ isloading?: boolean }>(({ isloading, theme }) => ({
  display: isloading ? "block" : "none",
  position: "absolute",
  backgroundColor: alpha(theme.palette.primary.dark, 0.15),
}));

export const SkeletonTypography = styled(SkeletonGeneric)(() => ({
  height: "100%",
  width: "100%",
}));

export const SkeletonRectangular = styled(SkeletonGeneric)(() => ({
  minHeight: "30px",
  minWidth: "150px",
  borderRadius: "8px",
}));

export const PrimaryLabel = styled(SubTitle)(({ theme }) => ({
  lineHeight: "normal",
  textAlign: "start",
  marginBottom: 0,
  fontWeight: FONT_WEIGHT.Regular,
  color: theme.palette.text.primary,

  [theme.breakpoints.down("md")]: {
    fontSize: "14px",
  },
}));

export const SecondaryLabel = styled(PrimaryLabel, {
  shouldForwardProp: (prop) => prop !== "isDisabled",
})<{ isDisabled?: boolean }>(({ theme, isDisabled }) => ({
  fontFamily: "var(--secondary-font)",
  color: isDisabled
    ? alpha(theme.palette.text.primary, 0.25)
    : theme.palette.text.primary,
}));

export const ButtonLabel = styled(SecondaryLabel, {
  shouldForwardProp: (prop) => prop !== "status",
})<{ status?: string }>(({ status, theme }) => ({
  fontWeight: FONT_WEIGHT.Bold,
  color:
    status === "denied"
      ? red[500]
      : status === "disabled"
      ? alpha(theme.palette.text.disabled, 0.15)
      : theme.palette.primary.main,
  fontSize: "14px",
  textTransform: "uppercase",
}));

export const InformationTip = styled(
  ({
    className,
    current,
    ...props
  }: TooltipProps & { current?: HTMLDivElement | null }) => {
    const popperprops = !isEmpty(current)
      ? {
          disablePortal: true,
          popperOptions: {
            modifiers: [
              {
                name: "preventOverflow",
                options: {
                  boundary: current,
                },
              },
            ],
          },
        }
      : {};

    return (
      <Tooltip
        {...props}
        classes={{ popper: className }}
        PopperProps={{ ...popperprops }}
      />
    );
  }
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: darken(theme.palette.background.darker, 0.5),
    padding: "12px",
    filter: `drop-shadow(0px 1px 1px rgb(0, 0, 0, 0.5))`,
    fontFamily: "var(--secondary-font)",
    minWidth: "fit-content",

    [theme.breakpoints.down(600)]: {
      minWidth: "100px",
    },
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: darken(theme.palette.background.darker, 0.5),
    fontSize: (theme as Theme).typography.pxToRem(16),
    filter: `drop-shadow(-1px 0px 0px rgb(0, 0, 0, 0.25))`,
  },
}));

export const TooltipContainer = styled(Grid, {
  shouldForwardProp: (prop) => prop !== "isShowTooltip",
})<{ isShowTooltip?: boolean }>(({ isShowTooltip, theme }) => ({
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  fontFamily: "var(--secondary-font)",
  cursor: isShowTooltip ? "pointer" : "",
}));

export const AvailableText = styled(SecondaryLabel)(({ theme }) => ({
  color: "#24FF00",
  textTransform: "uppercase",
  fontSize: "14px",

  [theme.breakpoints.down("md")]: {
    fontSize: FONT_SIZE.Small,
  },
}));

export const NotAvailableText = styled(AvailableText)(({ theme }) => ({
  color: "#FF0000",
}));

export const RegisteredText = styled(AvailableText)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const BoxContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isVisible",
})<{ isVisible?: boolean }>(({ isVisible }) => ({
  width: "100%",
  visibility: isVisible ? "visible" : "hidden",
}));

export const Tip = styled(SecondaryLabel, {
  shouldForwardProp: (prop) => prop !== "isVisible",
})<{ isVisible?: boolean }>(({ isVisible = true, theme }) => ({
  fontSize: "12px",
  color: alpha(theme.palette.text.primary, 0.35),
  width: "calc(100% - 64px)",
  textAlign: "center",
  visibility: isVisible ? "visible" : "hidden",
}));

export const ErrorTip = styled(Tip, {
  shouldForwardProp: (prop) => prop !== "isVisible",
})<{ isVisible?: boolean }>(({ isVisible, theme }) => ({
  color: red[800],
  width: "calc(100% - 16px)",
}));

export const ToggleButtonGroup = styled(MuiToggleGroup)(({ theme }) => ({
  borderRadius: "8px",
  minWidth: "150px",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,

  "&.MuiToggleButtonGroup-root": {
    ".MuiToggleButtonGroup-lastButton": {
      borderLeft: `solid 1px ${alpha(
        theme.palette.text.primary,
        0.15
      )} !important`,
      marginLeft: 0,
    },
  },
}));

export const ToggleButton = styled(MuiToggleButton)(({ theme }) => ({
  borderRadius: "8px",
  borderColor: alpha(theme.palette.text.primary, 0.15),
  padding: "8px",
  height: "fit-content",
  width: "50%",
  backgroundColor: alpha(theme.palette.primary.dark, 0.25),

  "&.MuiToggleButton-root": {
    border: "none",
    color: alpha(theme.palette.text.primary, 0.5),
    fontSize: "14px",
    textTransform: "capitalize",
    lineHeight: "normal",

    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: alpha(theme.palette.text.primary, 1),
    },

    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.5),
    },
  },
}));

export const TitleTooltip = styled(SecondaryLabel)(({ theme }) => ({
  fontSize: "18px",
  padding: "8px 0",
  fontWeight: FONT_WEIGHT.Bold,
}));

export const ContentTooltip = styled(TitleTooltip)(({ theme }) => ({
  fontSize: "14px",
  color: alpha(theme.palette.text.primary, 0.75),
  fontWeight: FONT_WEIGHT.Regular,
}));

export const ActionTooltip = styled(ContentTooltip)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const ProgressTooltip = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: 25,
  top: 25,
  zIndex: 2,

  [theme.breakpoints.down("sm")]: {
    right: 10,
    top: 10,
  },
}));

export const CloseIcon = styled(Close)(({ theme }) => ({
  color: alpha(theme.palette.text.primary, 0.5),

  "&:hover": {
    color: alpha(theme.palette.text.primary, 0.75),
    cursor: "pointer",
  },
}));

export const WarningIcon = styled(Warning, {
  shouldForwardProp: (prop) => prop !== "hidden",
})<{ hidden?: boolean }>(({ hidden, theme }) => ({
  color: yellow[500],
  width: "16px",
  height: "16px",
  visibility: hidden ? "hidden" : "visible",
  margin: "0 4px",
  cursor: "pointer",
}));

export const TooltipText = styled(SecondaryLabel)(({ theme }) => ({
  fontWeight: FONT_WEIGHT.Regular,
  color: alpha(theme.palette.text.primary, 0.5),
  paddingTop: 0,
  fontSize: "12px",
  whiteSpace: "pre-line",
}));

export const FieldLabel = styled(SecondaryLabel)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: FONT_WEIGHT.Light,
  width: "max-content",
  textOverflow: "ellipsis",
  overflow: "hidden",
}));

export const FieldValue = styled(FieldLabel, {
  shouldForwardProp: (prop) => prop !== "isShowTooltip",
})<{ isShowTooltip?: boolean }>(({ isShowTooltip, theme }) => ({
  fontWeight: FONT_WEIGHT.Regular,
  cursor: isShowTooltip ? "pointer" : "",
  maxWidth: "280px",
}));

export const PrimaryChip = styled(Chip)(({ theme }) => ({
  backgroundColor: amber[500],
  color: theme.palette.background.paper,
}));

export const CustomSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&::before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&::after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));
