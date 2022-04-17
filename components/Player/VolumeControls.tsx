import { Flex } from "@chakra-ui/layout"
import {
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react"
import { setVolume } from "../../store/player-reducer"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { MdVolumeDown, MdVolumeUp, MdVolumeOff } from "react-icons/md"
import { useState } from "react"

const VolumeControls = () => {
  const volume = useAppSelector(state => state.slice.volume)
  const dispatch = useAppDispatch()
  const [volumeStateBeforeMute, setVolumeStateBeforeMute] = useState(65)

  const handleMuteUnmute = () => {
    if (volume > 0.01) {
      setVolumeStateBeforeMute(volume)
      dispatch(setVolume(0))
    } else {
      dispatch(setVolume(volumeStateBeforeMute))
      setVolumeStateBeforeMute(0)
    }
  }

  return (
    <Flex width="50%" align="center" minW="150px" gap="5px">
      <IconButton
        icon={
          volume > 70 ? (
            <MdVolumeUp />
          ) : volume < 0.01 ? (
            <MdVolumeOff />
          ) : (
            <MdVolumeDown />
          )
        }
        outline="none"
        variant="link"
        aria-label="volumecontrol"
        color="white"
        fontSize="23px"
        onClick={handleMuteUnmute}
      />
      <RangeSlider
        aria-label={["min", "max"]}
        step={0.1}
        min={0}
        max={100}
        onChange={e => dispatch(setVolume(e[0]))}
        value={[volume]}
      >
        <RangeSliderTrack bg="gray.700">
          <RangeSliderFilledTrack
            bg="gray.500"
            _hover={{ backgroundColor: "#1EB954" }}
          />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} _focus={{}} />
      </RangeSlider>
    </Flex>
  )
}
export default VolumeControls
