import {bodyFont, headerFont} from "@/common/font"
import { yellow } from "@mui/material/colors"
import {experimental_extendTheme as extendTheme} from "@mui/material/styles"

const colors = {
  primaryColor: "#F4EDED",  
  backgroundColor: "#333333",
  secondaryColor: "#E8D9D9",
  emergencyColor: "#E53D00",
}

// const botColors = ["#B0228C", "#4785FF", "#613E8E", "#47A025"]
const botColors = ["#8C964A", "#5458C9", "#AD5C93", "#087F8C"]

const generateBotStyle = (botColor) => {
  return  {
    main: botColor,
    dark: `${botColor}CC`,
    contrastText: colors.primaryColor,
  }
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
        text: {
          primary: colors.primaryColor,
          secondary:  colors.secondaryColor,
        },
        error: {
          main: colors.emergencyColor,
        },
        action: {
          disabled: `${colors.backgroundColor}5C`,
          disabledBackground: `${colors.primaryColor}5C`
        },
        semiTransparent: {
          main: `${colors.backgroundColor}CC`
        },
        botStyle1: generateBotStyle(botColors[0]),
        botStyle2: generateBotStyle(botColors[1]),
        botStyle3: generateBotStyle(botColors[2]),
        botStyle4: generateBotStyle(botColors[3]),
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
    link: {
      fontFamily: bodyFont.style.fontFamily,
      fontSize: 14,
      fontWeight: 500,
    },
    footer: {
      fontFamily: headerFont.style.fontFamily,
      fontSize: 18,
    }
  },
})
