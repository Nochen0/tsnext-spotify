import { createSlice } from "@reduxjs/toolkit"
import { PlaylistTrack } from "../lib/Interfaces/interfaces"
var debounce = require("lodash.debounce")

const slice = createSlice({
  name: "slice",
  initialState: {
    playing: false,
    activeSong: {} as { url: string; track: PlaylistTrack },
    activeSongs: [] as PlaylistTrack[],
    volume: 100,
  },
  reducers: {
    setPlaying(state, action) {
      if (action.payload === true) {
        state.playing = true
      } else if (action.payload === false) {
        state.playing = false
      } else {
        state.playing = !state.playing
      }
    },
    setActiveSong(state, action) {
      state.activeSong = action.payload
    },
    setActiveSongs(state, action) {
      state.activeSongs = action.payload
    },
    setVolume(state, action) {
      state.volume = action.payload
    },
  },
})

export const { setPlaying, setActiveSong, setActiveSongs, setVolume } =
  slice.actions

const playerSlice = slice.reducer

export const patchUrl = (track: PlaylistTrack, tracks: PlaylistTrack[]) => {
  return async (dispatch: any) => {
    dispatch(setPlaying(false))
    const data = {
      q: `${track?.track?.artists[0].name} ${track?.track?.name}`,
    }
    const searchParams = new URLSearchParams(data)
    const response = await fetch(
      `http://46.101.218.180:2000/api/search?${searchParams.toString()}`
    )
    await response
      .json()
      .then(res => {
        dispatch(setActiveSong({ url: res.url, track }))
        dispatch(setActiveSongs(tracks))
      })
      .then(() => {
        const debounced = debounce(() => {
          dispatch(setPlaying(true))
        }, 150)
        debounced()
      })
  }
}

export default playerSlice
