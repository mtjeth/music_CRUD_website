/* eslint-disable react/prop-types */
import { removeDatabaseFetch } from "../redux_configs/musicState";
import { Typography, Modal, Button, Box, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import FlexBetween from "./FlexBetween"; 
const ConfirmModal = ({ openReset, setOpenReset }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <Modal open={openReset} onClose={() => setOpenReset(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: theme.palette.background.alt ,
          boxShadow: 24,
          px: 10,
          py: 5,
          width: 400,
          gap: 5,
        }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Typography id="Reset-Database" variant="h1" mx="auto">
          Reset Database
        </Typography>
        <FlexBetween>
          <Button color="error" onClick={() => setOpenReset(false)}>
            {" "}
            No{" "}
          </Button>
          <Button
            onClick={() => {
              dispatch(removeDatabaseFetch());
              setOpenReset(false);
              window.location.reload();
            }}
          >
            Yes
          </Button>
        </FlexBetween>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
