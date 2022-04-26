import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useAppSelector } from "../../store/store";
import Player from "./Player";

const PlayerBar = () => {
  const router = useRouter();
  const { activeSong, activeSongs } = useAppSelector((state) => state.playerSlice);

  return (
    <Flex bg="#181818" height="100%" align="center" paddingX="15px">
      <Flex width="28%" gap="14px" minW="250px" align="center">
        {activeSong?.track?.album?.images && (
          <Image alt="Album Image" h="55px" src={activeSong.track.album.images[0].url} />
        )}
        {activeSong?.url && (
          <Box>
            <Text color="white" fontSize="14px">
              {activeSong.track.name}
            </Text>
            <Text
              color="gray.500"
              cursor="pointer"
              fontWeight="500"
              textUnderlineOffset={1}
              _hover={{ color: "white", textDecoration: "underline" }}
              onClick={() => router.push(`/artist/${activeSong.track.artists[0].id}`)}
            >
              {activeSong.track.artists[0].name}
            </Text>
          </Box>
        )}
      </Flex>

      <Box
        width="50%"
        cursor="pointer"
        minW="350px"
        pointerEvents={activeSong?.url ? "all" : "none"}
      >
        <Player activeSong={activeSong} activeSongs={activeSongs} />
      </Box>
      <Flex
        width="25%"
        gap="12px"
        align="center"
        justify="end"
        pointerEvents={activeSong?.url ? "all" : "none"}
      >
        Volume Controls
      </Flex>
    </Flex>
  );
};

export default PlayerBar;
