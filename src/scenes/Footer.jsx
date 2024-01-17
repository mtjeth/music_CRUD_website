import Box from "@mui/system/Box"; 
import FlexBetween from "../components/FlexBetween"; 
import { Typography, Link, useTheme } from "@mui/material";


const Footer = () => {
  const theme = useTheme();
  return (
    <Box  bgcolor={theme.palette.background.alt} height="10rem" display="flex" alignContent="center">
      <FlexBetween>
        <Typography>Music Library</Typography>
        <Typography> 
          Made By <Link rel="noopener" target="_blank" href="https://github.com/mtjeth" variant="body1">MTJETH</Link>
        </Typography>
      </FlexBetween>
    </Box>
  );
};

export default Footer;
