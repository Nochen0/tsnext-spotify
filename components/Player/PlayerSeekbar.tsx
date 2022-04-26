import {
  Flex,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { format } from "../../lib/Helpers/HelperFunctions";

type Props = {
  soundRef: any;
  playedSeconds: number;
  setPlayedSeconds: Dispatch<SetStateAction<number>>;
  isSeeking: boolean;
  setIsSeeking: Dispatch<SetStateAction<boolean>>;
  duration: number;
};

const PlayerSeekbar: React.FC<Props> = ({
  playedSeconds,
  soundRef,
  setPlayedSeconds,
  isSeeking,
  setIsSeeking,
  duration,
}) => {
  const onSeek = (e: number[]) => {
    if (!isSeeking) {
      soundRef.current.seekTo(e[0]);
    }
    setPlayedSeconds(e[0]);
  };

  const onMouseUp = (e: number[]) => {
    setIsSeeking(false);
    soundRef.current.seekTo(e[0]);
    setPlayedSeconds(e[0]);
  };

  return (
    <Flex justify="center" align="center" gap="10px" marginTop="5px">
      <Flex width="30px" align="center" justify="center" color="gray.500">
        <Text fontSize="xs" marginBottom="1px">
          {format(playedSeconds)}
        </Text>
      </Flex>
      <Flex width="100%" align="center" marginBottom="2px">
        <RangeSlider
          aria-label={["min", "max"]}
          step={0.1}
          min={0}
          max={duration ? (duration.toFixed(2) as unknown as number) : 0}
          onChange={onSeek}
          value={[playedSeconds]}
          onChangeStart={() => setIsSeeking(true)}
          onChangeEnd={onMouseUp}
        >
          <RangeSliderTrack bg="gray.700">
            <RangeSliderFilledTrack bg="gray.500" _hover={{ backgroundColor: "green.500" }} />
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
  );
};

export default PlayerSeekbar;
