import HomePage from "./scenes/HomePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Navbar from "./scenes/Navbar";
import Footer from "./scenes/Footer";

function App() {
  const mode = useSelector((state) => state.musics.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <HomePage />
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
