import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import musicReducers from "./redux_configs/musicState.js"
import musicSaga from "./redux_configs/musicSaga.js";

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    musics: musicReducers,
  },
  middleware: () => [saga]
});
saga.run(musicSaga);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
