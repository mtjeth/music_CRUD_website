import { createSlice } from "@reduxjs/toolkit";

export const musicSlice = createSlice({
  name: "musics",
  mode: "light",
  initialState: {
    musics: [],
    page: 1,
    isLoading: false,
    pageSize: 10,
    mode: window.matchMedia("(prefers-color-scheme: dark)") ? "dark" : "light",
  },
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    getMusicsFetch: (state) => {
      state.isLoading = true;
    },
    getMusicsSuccess: (state, action) => {
      state.musics = action.payload;
      state.isLoading = false;
    },
    deleteMusicFetch: (state) => {
      state.isLoading = true;
    },
    deleteMusicSuccess: (state, action) => {
      const newMusic = state.musics.filter((key) => key.id != action.payload);
      state.musics = newMusic;
      state.isLoading = false;
    },
    editMusicFetch: (state) => {
      state.isLoading = true;
    },
    editMusicSuccess: (state, action) => {
      let music = state.musics;
      const indexMusic = music.findIndex(
        (da) => da.id === action.payload.payload.id
      );
      music[indexMusic] = action.payload.payload;
      state.musics = music;
      state.isLoading = false;
    },
    addMusicFetch: (state) => {
      state.isLoading = true;
    },
    addMusicSuccess: (state, action) => {
      let newMusic = state.musics;
      newMusic = [action.payload, ...newMusic];
      state.musics = newMusic;
      state.isLoading = false;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    changePageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    removeDatabaseSuccess: (state) => {
      state.musics = [];
      state.isLoading = false;
    },
    removeDatabaseFetch: (state) => {
      state.isLoading = true;
    },
  },
});
export const {
  setMode,
  getMusicsSuccess,
  getMusicsFetch,
  deleteMusicFetch,
  deleteMusicSuccess,
  editMusicFetch,
  editMusicSuccess,
  addMusicFetch,
  addMusicSuccess,
  resetMusicsFetch,
  resetMusicsSuccess,
  changePage,
  changePageSize,
  removeDatabaseSuccess,
  removeDatabaseFetch,
} = musicSlice.actions;
export default musicSlice.reducer;
