//export default {
export const theme = {
  useCustomProperties: true,
  initialColorMode: "dark",
  breakpoints: ["540px", "768px", "992px", "1200px", "1920px"],
  space: [4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 128, 256, 512],
  sizes: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 128, 256, 512],
  fontSizes: [12, 14, 16, 18, 20, 22, 24, 32, 40, 48, 64],
  colors: {
    text: "rgba(255, 255, 255, 0.9)",
    background: "#1A2232",
    "background-lighten-10": "#232B3B",
    "background-lighten-20": "#2C3648",
    primary: "#A085FF",
    "primary-lighten-10": "#9D82FF",
    "primary-lighten-50": "#B6A6FF",
    "primary-lighten-70": "#D2C8FF",
    secondary: "#85FFD0",
    accent: "orange",
    modes: {
      light: {
        primary: "red",
      },
      dark: {
        primary: "green",
      },
    },
  },
  radii: [5, "50%"],
  fontWeights: {
    body: 300,
    heading: 500,
  },
  lineHeights: {
    body: 1.675,
    heading: 1.125,
  },
  letterSpacings: {
    heading: "1.5",
  },
  space: [], // 💩💩💩💩
  fonts: {
    body: "system-ui, sans-serif",
    heading: "inherit",
  },
  styles: {
    color: "primary",
    root: {
      backgroundColor: "background",
      lineHeight: "body",
      fontFamily: "body",
      color: "text",
      bg: "background",
      a: {
        color: "primary-lighten-50",
      },
      "a:hover": {
        color: "primary-lighten-70",
      },
      nav: {
        px: 5,
        pt: 40,
        a: {
          textDecoration: "none",
          color: "text",
          fontSize: 3,
          fontWeight: "heading",
        },
        width: "100%",
        maxWidth: 300,
      },
      hr: {
        //color: "red",
        backgroundColor: "background-lighten-10",
        height: "2px",
      },
    },
    Container: {
      maxWidth: 1200,
    },
    a: {
      color: "primary",
      textDecoration: "none",
      ":hover": {
        color: "secondary",
        textDecoration: "underline",
      },
    },
  },
}
