import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteMusicFetch } from "../redux_configs/musicState";
import { useState } from "react";
import MusicModal from "./MusicModal";

export default function MusicBox(music) {
  const { trackName, artistName, id, duration_ms, picture } = music.music;
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width: 650px)");
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Card
      sx={{
        position: "relative",
        height: "auto",
        width: isNonMobileScreens ? "264px" : "100%",
        backgroundColor: theme.palette.background.alt,
        pb: "58px",
      }}
    >
      <CardMedia
        component="img"
        alt={trackName}
        height="160"
        sx={{ width: "100%" }}
        image={picture}
      />

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "space-between",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {trackName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Artist: {artistName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Duration: {duration_ms}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          flexDirection: "row-reverse",
          position: "absolute",
          bottom: "5px",
          right: "5px",
        }}
      >
        <IconButton onClick={() => dispatch(deleteMusicFetch(id))}>
          <DeleteIcon color="error" />
        </IconButton>
        <IconButton onClick={() => handleOpen()}>
          <EditIcon />
        </IconButton>
      </CardActions>
      <MusicModal
        open={open}
        setOpen={setOpen}
        data={{ ...music.music }}
        location={"musicbox"}
      />
    </Card>
  );
}
