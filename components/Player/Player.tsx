import { Box } from "@chakra-ui/layout"
import { ButtonGroup } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { patchUrl } from "../../store/player-reducer"
import { useAppDispatch, useAppSelector } from "../../store/store"
import ReactPlayer from "react-player"
import IconButtons from "./IconButtons"
import PlayerSeekbar from "./PlayerSeekbar"
import { PlaylistTrack } from "../../lib/Interfaces/interfaces"

type Progress = {
  loaded: number
  loadedSeconds: number
  played: number
  playedSeconds: number
}

const Player = () => {
  const {
    activeSongs: songs,
    activeSong,
    playing,
    volume,
  } = useAppSelector(state => state.slice)
  const dispatch = useAppDispatch()
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [playedSeconds, setPlayedSeconds] = useState(0.0)
  const [isSeeking, setIsSeeking] = useState(false)
  const [duration, setDuration] = useState(0.0)
  const soundRef = useRef<any>()

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true)
    }
  }, [])

  const finder = (item: PlaylistTrack) => item === activeSong.track

  const onShuffle = () => {
    setShuffle(prev => !prev)
  }

  const onRepeat = () => {
    setRepeat(prev => !prev)
  }

  const prevSong = () => {
    const index = songs.findIndex(finder)

    if (index - 1 >= 0) {
      dispatch(patchUrl(songs[index - 1], songs))
    } else {
      soundRef.current.seekTo(0)
    }
  }

  const nextSong = (): any => {
    const index = songs.findIndex(finder)

    if (songs.length > 1) {
      if (shuffle) {
        const randomIndex = Math.floor(Math.random() * songs.length)
        if (randomIndex === index) {
          return nextSong()
        } else {
          dispatch(patchUrl(songs[randomIndex], songs))
        }
      } else {
        let index = songs.findIndex(finder)

        if (index === -1) {
          index = songs.findIndex(item => item === activeSong.track)
        }

        if (index + 1 < songs.length) {
          dispatch(patchUrl(songs[index + 1], songs))
        } else {
          const randomIndex = Math.floor(Math.random() * songs.length)
          if (randomIndex === index) {
            return nextSong()
          } else {
            dispatch(patchUrl(songs[randomIndex], songs))
          }
        }
      }
    }
  }

  const onProgress = (e: Progress) => {
    if (!isSeeking) {
      setPlayedSeconds(e.playedSeconds)
    }
  }

  const onEnded = () => {
    if (repeat) {
      soundRef.current.seekTo(0)
      setPlayedSeconds(0)
    } else {
      nextSong()
    }
  }

  return (
    <Box>
      {isClient && (
        <ReactPlayer
          ref={soundRef}
          url={activeSong?.url}
          playing={playing}
          width="0px"
          style={{ position: "absolute" }}
          volume={volume / 100}
          onDuration={setDuration}
          loop={repeat}
          onProgress={onProgress}
          onEnded={onEnded}
          playedSeconds={playedSeconds}
        />
      )}
      <ButtonGroup display="flex" alignItems="center" justifyContent="center">
        <IconButtons
          repeat={repeat}
          shuffle={shuffle}
          onRepeat={onRepeat}
          onShuffle={onShuffle}
          prevSong={prevSong}
          nextSong={nextSong}
        />
      </ButtonGroup>
      <PlayerSeekbar
        playedseconds={playedSeconds}
        soundRef={soundRef}
        isSeeking={isSeeking}
        setIsSeeking={setIsSeeking}
        duration={duration}
        setPlayedSeconds={setPlayedSeconds}
      />
    </Box>
  )
}
export default Player
