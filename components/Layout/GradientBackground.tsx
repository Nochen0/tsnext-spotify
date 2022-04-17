import { Box, Flex, Text } from "@chakra-ui/layout"
import React from "react"
import {
  Album,
  ArtistData,
  CurrentUsersPlaylist,
  AlbumTrack,
} from "../../lib/Interfaces/interfaces"
import { Image, useMediaQuery } from "@chakra-ui/react"
import SongIndicator from "../Song/SongIndicator"
import { formatNumber } from "../../lib/Formatters/format"

type Props = {
  color?: string
  playlist?: CurrentUsersPlaylist | AlbumTrack[]
  album?: Album
  children: React.ReactNode
  explicitColor?: string
  description?: string
  imageUrl: string
  noIndicator?: boolean
  type: string
  title: string
  owner?: string
  roundedImage?: true
  artist?: ArtistData
}

const GradientBackground: React.FC<Props> = ({
  color,
  playlist,
  children,
  explicitColor,
  type,
  imageUrl,
  artist,
  title,
  description,
  roundedImage,
  noIndicator,
  album,
  owner,
}) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)")

  return (
    <Box
      height="calc(100vh - 92px)"
      overflowY="auto"
      color="white"
      paddingX="20px"
      minW="600px"
      overflowX="hidden"
      position="relative"
      bg="#121212"
    >
      <Box
        position="absolute"
        bgGradient={
          !explicitColor
            ? `linear(${color} 0%, ${color} 20%, ${color} 35%, #121212 75%)`
            : `linear(${explicitColor} -10%, ${explicitColor} 20%, ${explicitColor} 40%, #121212 75%)`
        }
        top="0"
        left="0"
        right="0"
        height="600px"
        zIndex="0"
        className="unselectable"
      ></Box>
      <Flex
        height="330px"
        align="end"
        paddingBottom="13px"
        marginBottom="25px"
        className="unselectable"
      >
        <Flex height="200px" zIndex="99" align="end">
          <Image
            src={imageUrl}
            alt="Image"
            height="235px"
            width="235px"
            borderRadius={roundedImage ? "100%" : "0"}
          />
          <Flex align="end">
            <Box
              width="calc(100vw - 492px)"
              minW="400px"
              paddingLeft="28px"
              paddingY={roundedImage ? "20px" : "0"}
            >
              <Text fontWeight="500" marginBottom="-8px" fontSize="14px">
                {type}
              </Text>
              <Text
                fontSize={
                  isLargerThan1280
                    ? title.length < 25
                      ? "85px"
                      : "60px"
                    : "60px"
                }
                fontWeight="700"
                maxW="40ch"
                className="break"
              >
                {title}
              </Text>
              <Text
                marginBottom="7px"
                color="gray.400"
                fontWeight="400"
                fontSize="15px"
              >
                {description && description}
              </Text>
              <Box fontSize="14px" fontWeight="400">
                {type === "PLAYLIST" &&
                  `${playlist?.owner?.display_name || owner} · ${
                    playlist?.tracks?.total || playlist.length
                  } total
                songs`}
                {type === "ARTIST" &&
                  `${formatNumber(artist.followers.total)} total followers`}
                {type === "ALBUM" && (
                  <Flex align="center" gap="5px">
                    <Image
                      alt="Album Image"
                      src={album.images[0].url}
                      objectFit="contain"
                      height="28px"
                      width="28px"
                      borderRadius="50%"
                    />
                    <Text>
                      {album.artists[0].name} ·{" "}
                      {album.release_date.substring(0, 4)} ·{" "}
                      {album.tracks.total} songs
                    </Text>
                  </Flex>
                )}
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Box zIndex="100" position="relative">
        {(type === "PLAYLIST" || type === "ALBUM") && !noIndicator && (
          <SongIndicator type={album ? "album" : undefined} />
        )}
        {children}
      </Box>
    </Box>
  )
}
export default GradientBackground
