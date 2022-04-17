import { Flex, Text } from "@chakra-ui/layout"
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react"
import React, { Dispatch, SetStateAction } from "react"
import { format } from "../../lib/Formatters/format"

type Props = {
  playedseconds: number
  soundRef: any
  setPlayedSeconds: Dispatch<SetStateAction<number>>
  isSeeking: boolean
  setIsSeeking: Dispatch<SetStateAction<boolean>>
  duration: number
}

const PlayerSeekbar: React.FC<Props> = ({
  playedseconds,
  soundRef,
  setPlayedSeconds,
  isSeeking,
  setIsSeeking,
  duration,
}) => {
  const onSeek = (e: number[]) => {
    if (!isSeeking) {
      soundRef.current.seekTo(e[0])
    }
    setPlayedSeconds(e[0])
  }

  const onMouseUp = (e: number[]) => {
    setIsSeeking(false)
    soundRef.current.seekTo(e[0])
    setPlayedSeconds(e[0])
  }

  return (
    <Flex justify="center" align="center" gap="10px" marginTop="5px">
      <Flex width="30px" align="center" justify="center" color="gray.500">
        <Text fontSize="xs" marginBottom="1px">
          {format(playedseconds)}
        </Text>
      </Flex>
      <Flex width="100%" align="center">
        <RangeSlider
          aria-label={["min", "max"]}
          step={0.1}
          min={0}
          max={duration ? (duration.toFixed(2) as unknown as number) : 0}
          onChange={onSeek}
          value={[playedseconds]}
          onChangeStart={() => setIsSeeking(true)}
          onChangeEnd={onMouseUp}
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
      <Flex width="30px" justify="center" align="center" color="gray.500">
        <Text fontSize="xs" marginBottom="1px">
          {format(duration)}
        </Text>
      </Flex>
    </Flex>
  )
}
export default PlayerSeekbar
