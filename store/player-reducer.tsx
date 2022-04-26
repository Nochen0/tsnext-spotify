import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import { PlaylistTrack, Track } from "../lib/Interfaces/interfaces";
var debounce = require("lodash.debounce");

const playerSlice = createSlice({
  name: "player",
  initialState: {
    playing: false,
    activeSong: {} as { url: string; track: Track },
    activeSongs: [] as any[],
  },
  reducers: {
    setPlaying(state, action) {
      if (action.payload === true) {
        state.playing = true;
      } else if (action.payload === false) {
        state.playing = false;
      } else {
        state.playing = !state.playing;
      }
    },
    setActiveSong(state, action) {
      state.activeSong = action.payload;
    },
    setActiveSongs(state, action) {
      state.activeSongs = action.payload;
    },
  },
});

export const { setPlaying, setActiveSong, setActiveSongs } = playerSlice.actions;

export const getSongUrl = (track: Track, tracks: PlaylistTrack[]) => {
  return async (dispatch: Dispatch) => {
    dispatch(setPlaying(false));
    const data = {
      q: `${track.artists[0].name} ${track.name}`,
    };

    const searchParams = new URLSearchParams(data);
    const urlResponse = await fetch(
      `http://46.101.218.180:2000/api/search?${searchParams.toString()}`
    );

    await urlResponse
      .json()
      .then((res) => {
        dispatch(setActiveSong({ url: res.url, track }));
        dispatch(setActiveSongs(tracks));
      })
      .then(() => {
        const debounced = debounce(() => {
          dispatch(setPlaying(true));
        }, 200);

        debounced();
      });
  };
};

export default playerSlice.reducer;
