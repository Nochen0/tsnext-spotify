import { Flex, Text, Box } from "@chakra-ui/layout"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import { Artist } from "../../lib/Interfaces/interfaces"
import spotify from "../../lib/SpotifyApi/spotify"
import BoxWrapper from "../Layout/BoxWrapper"

type Props = {
  artistId: string | string[] | undefined
}

const ArtistRelatedArtists: React.FC<Props> = ({ artistId }) => {
  const { data: session } = useSession()
  const [artists, setArtists] = useState<Artist[]>()

  useEffect(() => {
    ;(async () => {
      if (session?.accessToken) {
        const response = await spotify.getArtistRelatedArtists(
          artistId,
          session.accessToken
        )
        setArtists(response.artists)
      }
    })()
  }, [artistId, session])

  return (
    <Flex flexWrap="wrap" gap="25px">
      {artists?.slice(0, 7).map((artist, index) => {
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
