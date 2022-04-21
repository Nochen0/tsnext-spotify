import { Box, Text } from "@chakra-ui/layout"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ArtistsAlbums from "../../components/Artist/ArtistsAlbums"
import ArtistsTopTracks from "../../components/Artist/ArtistsTopTracks"
import { getColor } from "../../lib/HelperData/HelperFunctions"
import {
  Artist,
  ArtistRelatedArtists as RelatedArtists,
  ArtistsAlbums as ArtistAlbums,
  PlaylistTrack,
} from "../../lib/Interfaces/interfaces"
import spotify from "../../lib/SpotifyApi/spotify"
import ArtistRelatedArtists from "../../components/Artist/ArtistRelatedArtists"
import GradientBackground from "../../components/Layout/GradientBackground"
import Head from "next/head"

const Artist = ({ color }: { color: { color: string } }) => {
  const { data: session } = useSession()
  const [artist, setArtist] = useState<Artist>()
  const router = useRouter()
  const artistId = router.query.artistId
  const [artistsTopTracks, setArtistsTopTracks] = useState<PlaylistTrack[]>()
  const [artistRelatedArtists, setArtistRelatedArtists] =
    useState<RelatedArtists>()
  const [invalidId, setInvalidId] = useState(false)
  const [artistAlbums, setArtistAlbums] = useState<ArtistAlbums>()

  useEffect(() => {
    ;(async () => {
      if (session?.accessToken) {
        const [artistRes, topTracks, artistsAlbums, relatedArtists] =
          await Promise.all([
            spotify.getArtist(artistId, session.accessToken),
            spotify.getArtistsTopTracks(artistId, session.accessToken),
            spotify.getArtistsAlbums(artistId, session.accessToken),
            spotify.getArtistRelatedArtists(artistId, session.accessToken),
          ])
        if (artistRes?.error) {
          setInvalidId(true)
        } else {
          setArtist(artistRes)
          setArtistsTopTracks(topTracks.tracks)
          setArtistAlbums(artistsAlbums)
          setArtistRelatedArtists(relatedArtists)
        }
      }
    })()
  }, [session, artistId])

  useEffect(() => {
    if (invalidId) {
      router.push("/404")
    }
  }, [invalidId])

  return (
    <>
      <Head>
        <title>{artist?.name} | Spotify</title>
      </Head>
      {artist?.id ? (
        <GradientBackground
          title={artist.name}
          type="ARTIST"
          color={color.color}
          imageUrl={artist.images[0]?.url}
          roundedImage
          artist={artist}
        >
          <Box position="relative" paddingY="12px" paddingBottom="40px">
            <Text fontSize="2xl" marginBottom="30px">
              Popular
            </Text>
            {artistsTopTracks && (
              <ArtistsTopTracks topTracks={artistsTopTracks} />
            )}
            <Text fontSize="2xl" marginBottom="30px">
              Albums
            </Text>
            {artistAlbums && (
              <ArtistsAlbums
                slice={7}
                artistId={artistId}
                albums={artistAlbums}
              />
            )}
            <Text fontSize="2xl" marginY="30px">
              Related Artists
            </Text>
            {artistRelatedArtists && (
              <ArtistRelatedArtists
                artistId={artistId}
                artists={artistRelatedArtists.artists}
              />
            )}
          </Box>
        </GradientBackground>
      ) : null}
    </>
  )
}

export default Artist

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (context.params?.artistId) {
    const artistId = context.params.artistId
    const color = await getColor(artistId as string)
    return color
  }

  return {
    props: {
      color: undefined,
    },
  }
}
