import React, { useMemo, useEffect } from "react";
import { createTheme, darken, ThemeProvider } from "@mui/material/styles";
import { grey, yellow } from "@mui/material/colors";
import { parseCookie } from "@/utils/common";
import { CssBaseline } from "@mui/material";
import { Theme, useThemeState } from "@/redux/theme/themeSlice";

export interface GlobalTheme {
  children?: React.ReactNode;
}

export enum FONT_WEIGHT {
  Light = 200,
  Regular = 400,
  Bold = 700,
}

/**
 * TODO: Clean this please
 * Generic Font Sizes
 */
export enum FONT_SIZE {
  Xxsmall = "calc(8px + 0.3vmax)",
  Xsmall = "calc(8px + 0.4vmax)",
  Small = "calc(8px + 0.5vmax)",
  Medium = "calc(10px + 0.5vmax)",
  Large = "calc(10px + 0.75vmax)",
  Xlarge = "calc(15px + 1vmax)",
  Xxlarge = "calc(20px + 1.35vmax)",
  Xxxlarge = "calc(40px + 2vmax)",
}

export const PAGE_HEIGHT = "calc(100vh - 200px)";

/** Check Module Augmentation to enable custom palette */
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    mobile: true; // adds the `mobile` breakpoint
    miniTablet: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }

  interface TypeBackground {
    paper: string;
    light: string;

    default: string;
    dark: string;
    darker: string;
  }
}

export const GlobalTheme: React.FC<GlobalTheme> = (props) => {
  const { children } = props;
  const { useTheme, updateTheme } = useThemeState();
  const { theme: mode } = useTheme();

  /**
   * TODO: Clean this please and follow the below URL
   * https://mui.com/material-ui/experimental-api/css-theme-variables/overview/
   * https://mui.com/material-ui/experimental-api/css-theme-variables/usage/
   */
  const theme = useMemo(() => {
    return createTheme({
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            "@font-face": {
              fontFamily: "var(--secondary-font)",
            },
            "*::-webkit-scrollbar": {
              width: 8,
              height: 8,
            },
            // TODO: Create a light version for scrollbar
            ...(mode === "light"
              ? {
                  "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                    width: "6px",
                    height: "6px",
                    backgroundColor: "#0d0d0d",
                  },
                  "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                    backgroundColor: "#C2185B",
                    borderRadius: "8px",
                  },
                  "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
                    {
                      backgroundColor: "#540624",
                    },
                }
              : {
                  "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                    width: "6px",
                    height: "6px",
                    backgroundColor: "#0d0d0d",
                  },
                  "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                    backgroundColor: "#1A1A1A",
                    borderRadius: "8px",
                  },
                  "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
                    {
                      backgroundColor: "#540624",
                    },
                }),
          },
        },
      },
      breakpoints: {
        values: {
          // default
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
          // custom
          mobile: 500,
          miniTablet: 700,
          tablet: 800,
          laptop: 1024,
          desktop: 1200,
        },
      },
      palette: {
        mode,
        // TODO: Create a light theme version
        ...(mode === "light"
          ? {
              background: {
                paper: "#000000", // High Contrast Background
                default: "#100208", // Dark Primary Color
                dark: "#1A1A1A",
                darker: "#0C0C0C",
              },
              primary: {
                main: "#C2185B",
                dark: "#540624",
                contrastText: "#FFFFFF",
              },
              secondary: {
                main: "#C7C7C7",
                dark: "#3E3D3D",
                contrastText: "#000000",
              },
            }
          : {
              background: {
                paper: "#000000", // High Contrast Background
                default: "#100208", // Dark Primary Color
                dark: "#1A1A1A",
                darker: "#0C0C0C",
              },
              primary: {
                main: "#C2185B",
                dark: "#540624",
                contrastText: "#FFFFFF",
              },
              secondary: {
                main: "#C7C7C7",
                dark: "#3E3D3D",
                contrastText: "#000000",
              },
            }),
      },
    });
  }, [mode]);

  /** Use stored theme in cookies during initial load*/
  useEffect(() => {
    const app_theme = parseCookie("global-theme") || mode;
    updateTheme({ theme: app_theme as Theme });
    // eslint-why set mode only on initial load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Update stored theme in cookie */
  useEffect(() => {
    document.cookie = `global-theme=${mode}; path=/`;
  }, [mode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
};

export default GlobalTheme;
