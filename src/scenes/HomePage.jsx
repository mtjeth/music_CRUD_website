import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePage, getMusicsFetch } from "../redux_configs/musicState";
import MusicBox from "../components/MusicBox";
import Box from "@mui/system/Box"; 
import {Pagination, Stack,useMediaQuery} from "@mui/material";  
import TopBar from "../components/TopBar";

function App() {
  const musics = useSelector((state) => state.musics.musics);
  const dispatch = useDispatch();
  const pageSize = useSelector((state)=> state.musics.pageSize);
  const page = useSelector((state)=>state.musics.page);    
  const [sentMusic, setSentMusic] = useState();
  const [musicSize, setMusicSize] = useState(); 
  const isNonMobileScreens = useMediaQuery("(min-width: 650px)"); 
  
  useEffect(() => {
    dispatch(getMusicsFetch());
  }, [dispatch]);

  useEffect(()=>{
    setMusicSize(Math.ceil(musics.length / pageSize));
    const endPage = page * pageSize;
    const startPage = endPage - pageSize;
    setSentMusic(musics.slice(startPage, endPage));
  },[page,musics,pageSize])
  
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignContent="center"
      justifyContent="center"
      p="1rem"
      pb="40px"
    > 
      <TopBar /> 
      <Box
        display="grid"
        mx="auto"
        gap="1.8rem"
        py="2rem"

        gridTemplateColumns= {isNonMobileScreens? "repeat(auto-fill, 264px) ":"auto"}
        width="86%"
        alignContent="center"
        justifyContent="space-evenly"
      >
        {sentMusic && 
          sentMusic.map((music) => <MusicBox key={music.id} music={music} />)}
      </Box>
      <Stack spacing={15} mx="auto">
        <Pagination
          count={musicSize}
          showFirstButton
          showLastButton
          defaultPage={1}
          page={page}
          onChange={(Event,page)=> dispatch(changePage(page))} 
          boundaryCount={2}
          shape="rounded"
        /> 
      </Stack>
    </Box>
  );
}

export default App;
