import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Box,
  useTheme
} from "@mui/material";
import MusicModal from "../components/MusicModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePageSize } from "../redux_configs/musicState";
import FlexBetween from "./FlexBetween";
import ConfirmModal from "./ConfirmModal";

const TopBar = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openReset, setOpenReset] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();

  const PageSizeSelect = () => {
    const handleChange = (Event) => {
      dispatch(changePageSize(Event.target.value));
    };
    return (
      <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
        <InputLabel id="page-size">Page Size</InputLabel>
        <Select
          labelId="page-size"
          value={useSelector((state) => state.musics.pageSize)}
          label="Page Size"
          onChange={handleChange}
        >
          <MenuItem sx={{backgroundColor:theme.palette.background.alt}} value={5}>5</MenuItem>
          <MenuItem sx={{backgroundColor:theme.palette.background.alt}} value={10}>10</MenuItem>
          <MenuItem sx={{backgroundColor:theme.palette.background.alt}} value={25}>25</MenuItem>
          <MenuItem sx={{backgroundColor:theme.palette.background.alt}} value={50}>50</MenuItem>
        </Select>
      </FormControl>
    );
  };
  return (
    <FlexBetween>
      <Box>
        <Button sx={{mx:2, px:3}} onClick={() => setOpenCreate(true)}>Create</Button>
      <Button sx={{mx:2, px:3}} onClick={() => setOpenReset(true)}>Reset</Button>
      </Box>
      
      <MusicModal
        open={openCreate}
        setOpen={setOpenCreate}
        location={"topbar"}
      />
      
      <ConfirmModal openReset={openReset} setOpenReset={setOpenReset} />
      
      <PageSizeSelect />
    </FlexBetween>
  );
};

export default TopBar;
