import Box from "@mui/system/Box";
import { Typography, IconButton, useTheme } from "@mui/material";
import FlexBetween from "../components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "../redux_configs/musicState";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Box display="flex"  bgcolor={theme.palette.background.alt} height="5rem" alignItems="center">
      <FlexBetween>
        <Typography variant="h2">Music Library</Typography>
        <Box>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
        </Box>
      </FlexBetween>
    </Box>
  );
};

export default Navbar;
