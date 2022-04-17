import { Box, Flex, Text, Link as ChakraLink } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"
import Link from "next/link"
import { useAppSelector } from "../../store/store"
import Player from "./Player"
import VolumeControls from "./VolumeControls"

const PlayerBar = () => {
  const activeSong = useAppSelector(state => state.slice.activeSong)

  return (
    <Flex bg="#181818" height="100%" align="center" gap="50px" paddingX="15px">
      <Flex width="25%" gap="12px" minW="250px" align="center">
        {activeSong?.url && (
          <>
            {activeSong.track?.track?.album?.images && (
              <Box height="50px" width="50px" minW="49px" minH="49px">
                <Image
                  alt="Album Icon"
                  src={activeSong.track.track.album.images[0].url}
                />
              </Box>
            )}

            <Box fontWeight="500">
              <Text color="white" fontSize="sm">
                {activeSong.track?.track?.name}
              </Text>
              <Text color="gray.400" fontWeight="400" fontSize="xs">
                <Link
                  passHref
                  href={`/artist/${activeSong.track?.track?.artists[0]?.id}`}
                >
                  <ChakraLink
                    color="gray.400"
                    fontWeight="400"
                    textUnderlineOffset="1px"
                    _hover={{ textDecoration: "underline", color: "white" }}
                    _focus={{ boxShadow: "0px" }}
                  >
                    {activeSong.track?.track?.artists[0].name}
                  </ChakraLink>
                </Link>
              </Text>
            </Box>
          </>
        )}
      </Flex>
      <Box
        width="50%"
        style={!activeSong?.url ? { pointerEvents: "none" } : {}}
        cursor="pointer"
        minW="350px"
      >
        <Player />
      </Box>
      <Flex align="center" width="25%" justify="end" paddingRight="28px">
        {activeSong?.url && <VolumeControls />}
      </Flex>
    </Flex>
  )
}

export default PlayerBar
