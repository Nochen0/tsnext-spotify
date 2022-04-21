import { Flex, Text, Box } from "@chakra-ui/layout"
import React, { useEffect, useState } from "react"
import { dynamicSlice } from "../../lib/HelperData/HelperFunctions"
import { Artist } from "../../lib/Interfaces/interfaces"
import BoxWrapper from "../Layout/BoxWrapper"

type Props = {
  artistId: string | string[] | undefined
  artists: Artist[]
}

const ArtistRelatedArtists: React.FC<Props> = ({ artistId, artists }) => {
  const [windowW, setWindowW] = useState(window.innerWidth)

  const handleResize = () => {
    setWindowW(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <Flex gap="25px">
      {artists?.slice(0, dynamicSlice(windowW, 220)).map((artist, index) => {
        return (
          <BoxWrapper
            key={index}
            roundedImage
            imageUrl={artist.images[0]?.url}
            route={`/artist/${artist.id}`}
            height={220}
            width={195}
            paddingBottom={-30}
          >
            <Box>
              <Text fontSize="md">{artist.name}</Text>
              <Text fontWeight="500" color="gray.400" fontSize="sm">
                Artist
              </Text>
            </Box>
          </BoxWrapper>
        )
      })}
    </Flex>
  )
}
export default ArtistRelatedArtists
