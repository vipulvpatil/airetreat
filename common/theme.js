import {bodyFont, font1, font2, headerFont} from "@/common/font"
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

// const botColors = ["#8C964A", "#5458C9", "#AD5C93", "#087F8C", "#E49A61"]
const botColors = ["#CEE132", "#44DCE5", "#AC64F4", "#35D959", "#E49A61"]

const generateBotStyle = (botColor) => {
  return  {
    main: botColor,
    dark: `${botColor}CC`,
    contrastText: colors.backgroundColor,
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
    h1: {
      fontFamily: font1.style.fontFamily,
      fontSize: 32,
    },
    h2: {
      fontFamily: font1.style.fontFamily,
      fontSize: 16,
    },
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
      fontFamily: font1.style.fontFamily,
      fontSize: 14,
    },
    footer: {
      fontFamily: headerFont.style.fontFamily,
      fontSize: 18,
    }
  },
})

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
      fontFamily: font1.style.fontFamily,
      fontSize: 14,
    },
    footer: {
      fontFamily: headerFont.style.fontFamily,
      fontSize: 18,
    }
  },
})
