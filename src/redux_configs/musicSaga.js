import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  deleteMusicSuccess,
  getMusicsSuccess,
  editMusicSuccess,
  addMusicSuccess,
  removeDatabaseSuccess,
} from "./musicState";

const hostAddress = import.meta.env.VITE_SERVER_ADDRESS;


const idGenerator = (data) => {
  const result =
    Math.random().toString(36).substring(2, 13) +
    Math.random().toString(36).substring(2, 13);
  if (data.findIndex((da) => da.id === result) < 0) {
    return result;
  } else {
    return idGenerator(data);
  }
};

const musicImageCombiner = (data, image) => {
  var len = data.length;
  var combination = [];
  for (let i = 0; i < len; i++) {
    var picture = image[i].download_url;
    var pictureSplit = picture.split("/");
    pictureSplit = pictureSplit.splice(0, 5);
    var picturepath = "";
    for (let j = 0; j < 5; j++) {
      picturepath += pictureSplit[j] + "/";
    }
    picturepath += "/200/200";
    combination[i] = { ...data[i], picture: picturepath };
  }
  return combination;
};

function* workGetMusicFetch() {
  const musics = yield call(() => fetch(hostAddress));
  const formattedMusics = yield musics.json();
  const shortened = formattedMusics.slice(0);
  const musicsImage = yield call(() =>
    fetch(`https://picsum.photos/v2/list?page=12&limit=${shortened.length}`)
  );
  const formattedImage = yield musicsImage.json();
  const musicWithImages = musicImageCombiner(shortened, formattedImage);
  yield put(getMusicsSuccess(musicWithImages));
}

function* workDeleteMusicFetch(id) {
  id = id.payload;
  yield call(() =>
    fetch(`${hostAddress}/delete/${id}`, { method: "Delete" })
  );
  yield put(deleteMusicSuccess(id));
}

function* workEditMusicFetch(data) {
  yield call(() =>
    fetch(`${hostAddress}/edit/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data.payload),
    })
  );
  yield put(editMusicSuccess(data));
}

function* workAddMusicFetch(data) {
  const picture = "https://picsum.photos/200/200";
  const music = yield select((state) => state.musics.musics);
  const id = idGenerator(music);
  const { trackName, artistName, duration_ms } = data.payload;
  const newSong = {
    trackName: trackName,
    picture: picture,
    artistName: artistName,
    id: id,
    duration_ms: duration_ms,
  };
  yield call(() =>
    fetch(`${hostAddress}/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSong),
    })
  );
  yield put(addMusicSuccess(newSong));
}

function* workRemoveDatabaseFetch() {
  yield call(() => fetch(`${hostAddress}/reset`, { method: "Delete" }));
  yield put(removeDatabaseSuccess()); 
}

function* musicSaga() {
  yield takeEvery("musics/getMusicsFetch", workGetMusicFetch);
  yield takeEvery("musics/deleteMusicFetch", workDeleteMusicFetch);
  yield takeEvery("musics/editMusicFetch", workEditMusicFetch);
  yield takeEvery("musics/addMusicFetch", workAddMusicFetch);
  yield takeEvery("musics/removeDatabaseFetch", workRemoveDatabaseFetch);
}

export default musicSaga;
