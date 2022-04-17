import { IconButton } from "@chakra-ui/react"
import {
  MdOutlinePauseCircleFilled,
  MdOutlinePlayCircleFilled,
  MdOutlineRepeat,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md"
import { BiShuffle } from "react-icons/bi"
import React from "react"
import { setPlaying } from "../../store/player-reducer"
import { useAppDispatch, useAppSelector } from "../../store/store"

type Props = {
  repeat: boolean
  onRepeat: () => void
  shuffle: boolean
  onShuffle: () => void
  prevSong: () => void
  nextSong: () => any
}

const IconButtonGroup: React.FC<Props> = ({
  repeat,
  onRepeat,
  shuffle,
  onShuffle,
  prevSong,
  nextSong,
}) => {
  const dispatch = useAppDispatch()
  const playing = useAppSelector(state => state.slice.playing)

  return (
    <>
      <IconButton
        outline="none"
        variant="link"
        aria-label="shuffle"
        fontSize="24px"
        color={shuffle ? "green.500" : "gray.500"}
        onClick={onShuffle}
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
        color={repeat ? "green.500" : "gray.500"}
        onClick={onRepeat}
        icon={<MdOutlineRepeat />}
      />
    </>
  )
}
export default IconButtonGroup
