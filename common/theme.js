import {bodyFont, headerFont} from "@/common/font"
import {experimental_extendTheme as extendTheme} from "@mui/material/styles"

const colors = {
  primaryColor: "#FFCBBC",  
  backgroundColor: "#333333",
  secondaryColor: "#FFFFFF",
  tertiaryColor: "#FDAD95",
  emergencyColor: "#E4572E",
}

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: colors.primaryColor,
          contrastText: colors.backgroundColor,
        },
        secondary: {
          main: colors.backgroundColor,
        },
        tertiary: {
          main: colors.secondaryColor,
        },
        text: {
          primary: colors.backgroundColor,
          secondary:  colors.tertiaryColor,
        },
        error: {
          main: colors.emergencyColor,
        },
        action: {
          disabled: `${colors.backgroundColor}5C`,
          disabledBackground: `${colors.primaryColor}5C`
        }
      },
    },
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 700,
      desktop: 1000,
    },
  },
  typography: {
    fontFamily: bodyFont.style.fontFamily,
    subtitle: {
      fontFamily: headerFont.style.fontFamily,
      fontSize: 20,
    },
    h4: {
      fontFamily: headerFont.style.fontFamily,
      fontSize: 24,
    },
    h5: {
      fontFamily: headerFont.style.fontFamily,
      fontSize: 20,
      fontStyle: "italic",
    },
    h6: {
      fontFamily: headerFont.style.fontFamily,
      fontSize: 18,
    },
    body: {
      fontFamily: bodyFont.style.fontFamily,
      fontSize: 20,
    },
    body2: {
      fontFamily: bodyFont.style.fontFamily,
      fontSize: 16,
    },
    tab: {
      fontFamily: bodyFont.style.fontFamily,
      fontSize: 14,
    },
    footer: {
      fontFamily: headerFont.style.fontFamily,
      fontSize: 18,
    }
  },
})
