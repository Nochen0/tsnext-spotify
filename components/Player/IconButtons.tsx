import { IconButton } from "@chakra-ui/react";
import React, { Dispatch } from "react";
import { BiShuffle } from "react-icons/bi";
import {
  MdOutlinePauseCircleFilled,
  MdOutlinePlayCircleFilled,
  MdOutlineRepeat,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import { setPlaying } from "../../store/player-reducer";
import { useAppDispatch, useAppSelector } from "../../store/store";

type Props = {
  loop: boolean;
  setLoop: Dispatch<React.SetStateAction<boolean>>;
  shuffle: boolean;
  setShuffle: Dispatch<React.SetStateAction<boolean>>;
  prevSong: () => void;
  nextSong: () => any;
};

const IconButtons: React.FC<Props> = ({
  loop,
  setLoop,
  shuffle,
  setShuffle,
  prevSong,
  nextSong,
}) => {
  const dispatch = useAppDispatch();
  const playing = useAppSelector((state) => state.playerSlice.playing);

  return (
    <>
      <IconButton
        outline="none"
        variant="link"
        aria-label="shuffle"
        fontSize="24px"
        color={shuffle ? "green.500" : "gray.500"}
        onClick={() => setShuffle((prev) => !prev)}
        icon={<BiShuffle />}
      />
      <IconButton
        outline="none"
        variant="link"
        aria-label="skip"
        fontSize="24px"
        icon={<MdSkipPrevious />}
        onClick={prevSong}
      />
      {playing ? (
        <IconButton
          outline="none"
          variant="link"
          aria-label="pause"
          fontSize="40px"
          color="white"
          icon={<MdOutlinePauseCircleFilled />}
          onClick={() => dispatch(setPlaying(false))}
        />
      ) : (
        <IconButton
          outline="none"
          variant="link"
          aria-label="play"
          fontSize="40px"
          color="white"
          icon={<MdOutlinePlayCircleFilled />}
          onClick={() => dispatch(setPlaying(true))}
        />
      )}

      <IconButton
        outline="none"
        variant="link"
        aria-label="next"
        fontSize="24px"
        icon={<MdSkipNext />}
        onClick={nextSong}
      />
      <IconButton
        outline="none"
        variant="link"
        aria-label="repeat"
        fontSize="24px"
        color={loop ? "green.500" : "gray.500"}
        onClick={() => setLoop((prev) => !prev)}
        icon={<MdOutlineRepeat />}
      />
    </>
  );
};

export default IconButtons;
