import { useRouter } from "next/router"
import GradientBackground from "../../components/Layout/GradientBackground"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { getColor } from "../../lib/HelperData/HelperFunctions"
import { useEffect, useState } from "react"
import spotify from "../../lib/SpotifyApi/spotify"
import { useSession } from "next-auth/react"
import { Playlist } from "../../lib/Interfaces/interfaces"
import Loading from "../../components/Layout/Loading"
import Song from "../../components/Song/Song"
import Head from "next/head"

const Playlist = ({ color }: { color: { color: string } }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const { playlistId } = router.query
  const [playlist, setPlaylist] = useState<Playlist>()
  const [invalidId, setInvalidId] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (session?.accessToken) {
        const response = await spotify.getPlaylist(
          playlistId,
          session.accessToken
        )
        if (response?.error) {
          setInvalidId(true)
        } else {
          setPlaylist(response)
        }
      }
    })()
  }, [playlistId, session])

  useEffect(() => {
    if (invalidId) {
      router.push("/404")
    }
  }, [invalidId])

  return (
    <>
      <Head>
        <title>{playlist?.name} - Spotify</title>
      </Head>
      {playlist?.id ? (
        <GradientBackground
          color={color.color}
          playlist={playlist}
          imageUrl={playlist.images[0].url}
          type="PLAYLIST"
          title={playlist.name}
          description={playlist.description}
        >
          {playlist.tracks.items.map((track, index) => {
            return (
              <Song
                key={index}
                track={track}
                index={index}
                total={playlist.tracks.total}
                tracks={playlist.tracks.items}
              />
            )
          })}
        </GradientBackground>
      ) : (
        <Loading />
      )}
    </>
  )
}
export default Playlist

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (context.params?.playlistId) {
    const playlistId = context.params.playlistId

    const color = await getColor(playlistId as string)
    return color
  }
  return {
    props: {
      color: undefined,
    },
  }
}
