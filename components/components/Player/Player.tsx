import { Box, ButtonGroup } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { PlaylistTrack, Track } from "../../lib/Interfaces/interfaces";
import { getSongUrl, setPlaying } from "../../store/player-reducer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import IconButtons from "./IconButtons";
import PlayerSeekbar from "./PlayerSeekbar";

type Progress = {
  loaded: number;
  loadedSeconds: number;
  played: number;
  playedSeconds: number;
};

type Props = {
  activeSong: { url: string; track: Track };
  activeSongs: any[];
};

const Player: React.FC<Props> = ({ activeSong, activeSongs }): any => {
  const [isClient, setIsClient] = useState(false);
  const soundRef = useRef<any>();
  const { playing } = useAppSelector((state) => state.playerSlice);
  const [duration, setDuration] = useState(0.0);
  const [loop, setLoop] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0.0);
  const [shuffle, setShuffle] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  const finder = (item: PlaylistTrack) => item.track === activeSong.track;

  const onProgress = (e: Progress) => {
    if (!isSeeking) {
      setPlayedSeconds(e.playedSeconds);
    }
  };

  const prevSong = () => {
    const index = activeSongs.findIndex(finder);

    if (index - 1 >= 0) {
      dispatch(getSongUrl(activeSongs[index - 1].track, activeSongs));
    } else {
      soundRef.current.seekTo(0);
    }
  };

  const nextSong = (): any => {
    const index = activeSongs.findIndex(finder);

    if (activeSongs.length > 1) {
      if (shuffle) {
        const randomIndex = Math.floor(Math.random() * activeSongs.length);

        if (randomIndex === index) {
          return nextSong();
        } else {
          dispatch(getSongUrl(activeSongs[randomIndex].track, activeSongs));
        }
      } else {
        let index = activeSongs.findIndex(finder);

        if (index + 1 < activeSongs.length) {
          dispatch(getSongUrl(activeSongs[index + 1].track, activeSongs));
        } else {
          const randomIndex = Math.floor(Math.random() * activeSongs.length);
          if (randomIndex === index) {
            return nextSong();
          } else {
            dispatch(getSongUrl(activeSongs[randomIndex].track, activeSongs));
          }
        }
      }
    } else {
      dispatch(setPlaying(false))
    }
  };

  const onEnded = () => {
    if (loop) {
      soundRef.current.seekTo(0);
      setPlayedSeconds(0);
    } else {
      nextSong();
    }
  };

  return (
    <Box>
      {isClient && (
        <ReactPlayer
          ref={soundRef}
          url={activeSong?.url}
          playing={playing}
          width="0px"
          style={{ position: "absolute" }}
          volume={1}
          onDuration={setDuration}
          loop={loop}
          onProgress={onProgress}
          onEnded={onEnded}
          playedSeconds={playedSeconds}
        />
      )}
      <ButtonGroup display="flex" alignItems="center" justifyContent="center">
        <IconButtons
          loop={loop}
          shuffle={shuffle}
          setLoop={setLoop}
          setShuffle={setShuffle}
          prevSong={prevSong}
          nextSong={nextSong}
        />
      </ButtonGroup>
      <PlayerSeekbar
        playedSeconds={playedSeconds}
        soundRef={soundRef}
        isSeeking={isSeeking}
        setIsSeeking={setIsSeeking}
        duration={duration}
        setPlayedSeconds={setPlayedSeconds}
      />
    </Box>
  );
};

export default Player;
