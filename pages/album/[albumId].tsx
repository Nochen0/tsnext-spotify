import { Box, Text } from "@chakra-ui/layout"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { useSession } from "next-auth/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ArtistsAlbums from "../../components/Artist/ArtistsAlbums"
import GradientBackground from "../../components/Layout/GradientBackground"
import Song from "../../components/Song/Song"
import { getColor } from "../../lib/HelperData/HelperFunctions"
import {
  Album,
  ArtistsAlbums as ArtistAlbums,
} from "../../lib/Interfaces/interfaces"
import spotify from "../../lib/SpotifyApi/spotify"

const Album = ({ color }: { color: { color: string } }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const albumId = router.query.albumId
  const [album, setAlbum] = useState<Album>()
  const [modified, setModified] = useState<any>()
  const [invalidId, setInvalidId] = useState(false)
  const [artistAlbums, setArtistAlbums] = useState<ArtistAlbums>()

  useEffect(() => {
    if (session?.accessToken) {
      ;(async () => {
        const albumResponse = await spotify.getAlbum(
          albumId,
          session.accessToken
        )
        if (albumResponse?.error) {
          setInvalidId(true)
        } else {
          const _modified = albumResponse.tracks.items.map(track => {
            return { track }
          })
          setModified(_modified)
          setAlbum(albumResponse)
          const artistAlbums = await spotify.getArtistsAlbums(
            albumResponse.artists[0].id,
            session.accessToken
          )
          setArtistAlbums(artistAlbums)
        }
      })()
    }
  }, [session, albumId])

  useEffect(() => {
    if (invalidId) {
      router.push("/404")
    }
  }, [invalidId])

  return (
    <>
      <Head>
        <title>{album?.name} | Spotify</title>
      </Head>
      {album?.id && modified && (
        <GradientBackground
          imageUrl={album.images[0].url}
          type="ALBUM"
          title={album.name}
          playlist={album.tracks.items}
          album={album}
          color={color.color}
        >
          {album.tracks.items.map((item, index) => {
            return (
              <Song
                key={index}
                track={{ track: item }}
                album
                index={index}
                total={album.tracks.total}
                tracks={modified}
              />
            )
          })}

          <Text fontSize="xl" padding="15px" marginBottom="20px">
            More by {album.artists[0].name}
          </Text>
          <Box marginBottom="45px">
            {album?.artists && artistAlbums && (
              <ArtistsAlbums
                slice={7}
                artistId={album.artists[0].id}
                exclude={album.id}
                albums={artistAlbums}
              />
            )}
          </Box>
        </GradientBackground>
      )}
    </>
  )
}
export default Album

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (context.params?.albumId) {
    const albumId = context.params.albumId
    const color = await getColor(albumId as string)
    return color
  }

  return {
    props: {
      color: undefined,
    },
  }
}
