import { Flex, Text } from "@chakra-ui/layout"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import { ArtistAlbum } from "../../lib/Interfaces/interfaces"
import spotify from "../../lib/SpotifyApi/spotify"
import BoxWrapper from "../Layout/BoxWrapper"

type Props = {
  slice: number
  artistId: string | string[] | undefined
  exclude?: string
}

const ArtistsAlbums: React.FC<Props> = ({ slice, artistId, exclude }) => {
  const { data: session } = useSession()
  const [albums, setAlbums] = useState<ArtistAlbum[]>()

  useEffect(() => {
    ;(async () => {
      if (session?.accessToken) {
        const response = await spotify.getArtistsAlbums(
          artistId,
          session.accessToken
        )
        if (exclude) {
          console.log(response.items)
          setAlbums(response.items.filter((item: any) => item.id !== exclude))
        } else {
          setAlbums(response.items)
        }
      }
    })()
  }, [session, artistId, exclude])

  return (
    <Flex flexWrap="wrap" gap="25px">
      {albums?.slice(0, slice).map((album, index) => {
        return (
          <BoxWrapper
            key={index}
            imageUrl={album.images[0].url}
            roundedImage={false}
            route={`/album/${album.id}`}
            height={220}
            width={195}
            paddingBottom={-10}
          >
            <Text fontWeight="500" color="gray.400" fontSize="sm">
              {album.release_date.substring(0, 4)} · Album
            </Text>
          </BoxWrapper>
        )
      })}
    </Flex>
  )
}
export default ArtistsAlbums
