import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#ff4081", // A vibrant color for buttons and accents
    },
    background: {
      default: "#121212", // Dark background
      paper: "#1e1e1e",
    },
  },
  // Add other theme customizations here
});

export default theme;
