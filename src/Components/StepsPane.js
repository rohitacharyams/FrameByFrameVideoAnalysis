import React from "react";
import { Button, Box, Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Define a theme with dark settings and more visually appealing styles
const theme = createTheme({
  palette: {
    mode: "dark", // Ensures dark mode for all components
    primary: {
      main: "#bdbdbd", // A subtle grey, better for contrast with dark backgrounds
    },
    background: {
      default: "#333", // Dark grey, less harsh than pure black
      paper: "#424242", // Slightly lighter grey for any paper elements
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          borderRadius: "10px",
          padding: "10px 90px", // More padding for wider buttons
          margin: "5px", // Slightly more space around buttons
          boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)", // Subtle shadow
          transition: "transform 0.2s",
          "&:hover": {
            backgroundColor: "#616161", // Darker grey for hover
            transform: "scale(1.05)",
            boxShadow: "0 6px 10px 2px rgba(0, 0, 0, .5)",
          },
        },
      },
    },
  },
});

const StepsPane = ({ steps = ["Step 1", "Step 2", "Step 3"] }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          padding: 1,
          bgcolor: "background.default", // Ensure background color from the theme
          height: "100%", // Ensure full height
          overflow: "auto", // Allow scrolling if many steps
        }}
      >
        <Stack direction="column" spacing={1}>
          {steps.map((step, index) => (
            <Button variant="contained" color="primary" key={index}>
              {step}
            </Button>
          ))}
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default StepsPane;
