/* eslint-disable react/prop-types */
import { Box, Typography, Modal, Button, TextField,FormControl,useTheme,useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMusicFetch, editMusicFetch } from "../redux_configs/musicState"; 

export default function MusicModal({ open, setOpen, data, location }) {
  const dispatch = useDispatch();
  const track = location === "musicbox" ? data.trackName : "";
  const artist = location === "musicbox" ? data.artistName : "";
  const duration = location === "musicbox" ? data.duration_ms : "";
  const id = location === "musicbox" ? data.id : "";
  const picture = location === "musicbox" ? data.picture : "";
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 650px)"); 

  const [trackName, setTrackName] = useState(track);
  const [artistName, setArtistName] = useState(artist);
  const [duration_ms, setDuration_ms] = useState(duration);
  const handleClose = () => {
    setTrackName(track);
    setArtistName(artist);
    setDuration_ms(duration);
    setOpen(false);
  };
  const onSubmit = () => {
    location === "musicbox"
      ? dispatch(
          editMusicFetch({
            id,
            trackName,
            artistName,
            duration_ms,
            picture,
          })
        )
      : dispatch(
          addMusicFetch({
            trackName,
            artistName,
            duration_ms,
          })
        );
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={() => handleClose()} 
    >
      <Box
      
        sx={{
          display:"flex",
          flexDirection: "column",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor:theme.palette.background.alt ,
          boxShadow: 24, 
          py: 5,
          px: 5, 
          width: isNonMobileScreens? 400: "90%",
        }}
      >
        <Typography variant="h1" mx="auto" my="10px"> 
          {location === "musicbox" ? "Edit Music" : "Add Music"}
        </Typography>
        <FormControl>
          <TextField
            id="standard"
            required
            label="Track Name"
            defaultValue={trackName}
            onChange={(e) => setTrackName(e.target.value)}
            variant="standard"
            sx={{my:2}}
          />
          <TextField
            id="standard"
            required
            label="Artist Name"
            defaultValue={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            variant="standard"
            sx={{my:2}}
          />
          <TextField
            id="standard"
            label="Duration"
            defaultValue={duration_ms}
            onChange={(e) => setDuration_ms(e.target.value)}
            variant="standard"
            sx={{my:2}}
          />
          <Box sx={{width:"100%", mb:"10px",mt:"20px"}} display="flex" justifyContent="space-around">
        <Button variant="contained" onClick={() => handleClose()}>
              Cancel
            </Button>
            <Button variant="contained" onClick={() => onSubmit()}>
              Apply
            </Button>
          </Box> 
          </FormControl>
      </Box>
    </Modal>
  );
}
