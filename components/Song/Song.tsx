import { Box, Flex, Link as ChakraLink, Text } from "@chakra-ui/layout"
import React, { BaseSyntheticEvent } from "react"
import { PlaylistTrack } from "../../lib/Interfaces/interfaces"
import { Image, useMediaQuery } from "@chakra-ui/react"
import { format, dateDiff } from "../../lib//Formatters/format"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { patchUrl, setPlaying } from "../../store/player-reducer"
import { useRouter } from "next/router"

type Props = {
  track: PlaylistTrack
  index: number
  total: number
  tracks: PlaylistTrack[]
  artist?: boolean
  album?: boolean
  noDate?: boolean
}

const currentDate = new Date()

const Song: React.FC<Props> = ({
  track,
  index,
  total,
  tracks,
  artist,
  album,
  noDate,
}) => {
  const router = useRouter()
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)")
  const addedAt = new Date(track.added_at)
  const activeSong = useAppSelector(state => state.slice.activeSong)
  const dispatch = useAppDispatch()

  const handleSongClick = (event: BaseSyntheticEvent) => {
    if (activeSong?.url) {
      if (activeSong?.track?.track?.id === track.track.id) {
        dispatch(setPlaying(null))
      } else {
        dispatch(patchUrl(track, tracks))
      }
    } else {
      dispatch(patchUrl(track, tracks))
    }
  }

  return (
    <Box
      cursor="pointer"
      borderRadius="4px"
      marginBottom={index + 1 === total ? "40px" : "0"}
      _hover={{ background: "rgba(255, 255, 255, .1)" }}
      onClick={handleSongClick}
      zIndex="50"
    >
      <Flex paddingY={!artist ? "6px" : "7px"} gap="20px" paddingX="10px">
        <Flex
          width="24px"
          justifyContent="end"
          align="center"
          fontFamily="monospace"
          fontWeight="500"
          fontSize="16px"
          color={
            activeSong?.track?.track?.id === track.track.id
              ? "green.500"
              : "gray.300"
          }
        >
          {index + 1}
        </Flex>
        <Flex gap="13px" basis="50%" wordBreak="break-all" align="center">
          {!album && (
            <Box minHeight="39px" minW="39px" height="40px" width="40px">
              <Image alt="Album Image" src={track.track.album.images[0].url} />
            </Box>
          )}
          <Box>
            <Text
              fontSize="15px"
              fontWeight="500"
              color={
                activeSong?.track?.track?.id === track.track.id
                  ? "green.500"
                  : "white"
              }
            >
              {track.track.name}
            </Text>
            {!artist && (
              <ChakraLink
                _focus={{ boxShadow: "0px" }}
                color="gray.400"
                fontWeight="400"
                textUnderlineOffset="1px"
                _hover={{ textDecoration: "underline", color: "white" }}
                onClick={event => {
                  event.stopPropagation()
                  router.push(`/artist/${track.track.artists[0].id}`)
                }}
              >
                {track.track.artists[0].name}
              </ChakraLink>
            )}
          </Box>
        </Flex>
        <Flex basis="35%" justify="start" align="center">
          {!artist && !album && (
            <ChakraLink
              _focus={{ boxShadow: "0px" }}
              color="gray.400"
              fontWeight="400"
              textUnderlineOffset="1px"
              _hover={{ textDecoration: "underline", color: "white" }}
              onClick={event => {
                event.stopPropagation()
                router.push(`/album/${track.track.album.id}`)
              }}
            >
              {track.track.album.name}
            </ChakraLink>
          )}
        </Flex>
        {isLargerThan1280 && !artist && !album && !noDate && (
          <Flex
            basis="25%"
            justify="center"
            align="center"
            color="gray.400"
            fontWeight="400"
          >
            {dateDiff.inDays(currentDate, addedAt).diff <= 0
              ? dateDiff.inHours(currentDate, addedAt).text
              : dateDiff.inDays(currentDate, addedAt).text}
          </Flex>
        )}
        <Flex
          basis="10%"
          justify="center"
          align="center"
          color="gray.400"
          fontWeight="400"
          fontSize="sm"
          fontFamily="monospace"
        >
          {format(track.track.duration_ms / 1000)}
        </Flex>
      </Flex>
    </Box>
  )
}
export default Song
