import { Flex, Text } from "@chakra-ui/layout"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import { dynamicSlice } from "../../lib/HelperData/HelperFunctions"
import { ArtistsAlbums, _Album } from "../../lib/Interfaces/interfaces"
import spotify from "../../lib/SpotifyApi/spotify"
import BoxWrapper from "../Layout/BoxWrapper"

type Props = {
  slice: number
  artistId: string | string[] | undefined
  exclude?: string
  albums: ArtistsAlbums
}

const ArtistsAlbums: React.FC<Props> = ({
  slice,
  artistId,
  exclude,
  albums,
}) => {
  const { data: session } = useSession()
  const [windowW, setWindowW] = useState(window.innerWidth)
  const [modifiedAlbums, setModifiedAlbums] = useState<_Album[]>()

  useEffect(() => {
    if (exclude) {
      setModifiedAlbums(albums.items.filter(item => item.id !== exclude))
    } else {
      setModifiedAlbums(albums.items)
    }
  }, [session, artistId, exclude, albums])

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
      {modifiedAlbums
        ?.slice(0, dynamicSlice(windowW, 230))
        .map((album, index) => {
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
