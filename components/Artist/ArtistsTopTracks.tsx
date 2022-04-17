import { Box, Text } from "@chakra-ui/layout"
import React, { useEffect, useState } from "react"
import { PlaylistTrack } from "../../lib/Interfaces/interfaces"
import Song from "../Song/Song"

type Props = {
  topTracks: PlaylistTrack[] | undefined
}

const ArtistsTopTracks: React.FC<Props> = ({ topTracks }) => {
  const [modified, setModified] = useState<any>()
  const [more, setMore] = useState(false)

  useEffect(() => {
    const modified = topTracks?.map(track => {
      return { track }
    })
    setModified(modified)
  }, [topTracks])

  return (
    <Box paddingRight="15%">
      {!more
        ? modified?.slice(0, 5).map((track: any, index: number) => {
            return (
              <Song
                key={index}
                track={track}
                index={index}
                total={-1}
                tracks={modified as PlaylistTrack[]}
                artist
              />
            )
          })
        : modified?.slice(0, 10).map((track: any, index: number) => {
            return (
              <Song
                key={index}
                track={track}
                index={index}
                total={-1}
                tracks={modified as PlaylistTrack[]}
                artist
              />
            )
          })}
      <Text
        onClick={() => setMore(prev => !prev)}
        paddingLeft="15px"
        marginTop="12px"
        color="gray.300"
        transitionDuration="300ms"
        _hover={{ color: "white" }}
        cursor="pointer"
        marginBottom="24px"
      >
        SEE MORE
      </Text>
    </Box>
  )
}
export default ArtistsTopTracks
