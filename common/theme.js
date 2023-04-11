import {font1, font2} from "@/common/font"
import {experimental_extendTheme as extendTheme} from "@mui/material/styles"

const colors = {
  primaryColor: "#F4EDED",
  backgroundColor: "#242424",
  secondaryColor: "#E8D9D9",
  emergencyColor: "#E53D00",
  baseColor: "#E49A61",
  lightColor: "#F7C9A6",
  highlightColor: "#F14747",
}

const botColors = ["#CEE132", "#44DCE5", "#AC64F4", "#35D959", "#E49A61"]

const generateBotStyle = (botColor) => {
  return  {
    main: botColor,
    dark: `${botColor}CC`,
    contrastText: colors.backgroundColor,
  }
}

export const newTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: colors.baseColor,
          contrastText: colors.backgroundColor,
        },
        secondary: {
          main: colors.backgroundColor,
          contrastText: colors.baseColor,
        },
        alternate: {
          main: colors.lightColor,
          contrastText: colors.backgroundColor,
        },
        text: {
          primary: colors.baseColor,
          secondary: colors.lightColor,
        },
        highlight: {
          main: colors.highlightColor,
        },
        action: {
          disabled: `${colors.backgroundColor}5C`,
          disabledBackground: `${colors.baseColor}5C`
        },
        semiTransparent: {
          main: `${colors.backgroundColor}E0`
        },
        botStyle1: generateBotStyle(botColors[0]),
        botStyle2: generateBotStyle(botColors[1]),
        botStyle3: generateBotStyle(botColors[2]),
        botStyle4: generateBotStyle(botColors[3]),
        botStyleSelf: generateBotStyle(botColors[4]),
      },
    },
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 500,
      desktop: 1000,
    },
  },
  typography: {
    fontFamily: font2.style.fontFamily,
    fontSize: 14,
    fontWeight: 400,
    h1: {
      fontFamily: font1.style.fontFamily,
      fontSize: 32,
    },
    h2: {
      fontFamily: font1.style.fontFamily,
      fontSize: 16,
    },
    h3: {
      fontFamily: font1.style.fontFamily,
      fontSize: 14,
    },
    h4: {
      fontFamily: font1.style.fontFamily,
      fontSize: 10,
    },
    messageLabel: {
      fontFamily: font2.style.fontFamily,
      fontSize: 12,
      fontWeight: 700
    },
    messageText: {
      fontFamily: font2.style.fontFamily,
      fontSize: 16,
      fontWeight: 400
    },
    link: {
      fontFamily: font1.style.fontFamily,
      fontSize: 14,
    },
    footer: {
      fontFamily: font2.style.fontFamily,
      fontSize: 18,
    }
  },
})
