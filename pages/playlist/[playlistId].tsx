import { useRouter } from "next/router"
import GradientBackground from "../../components/Layout/GradientBackground"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { getColor, randomColor } from "../../lib/HelperData/HelperFunctions"
import { useEffect, useState } from "react"
import spotify from "../../lib/SpotifyApi/spotify"
import { signOut, useSession } from "next-auth/react"
import { CurrentUsersPlaylist } from "../../lib/Interfaces/interfaces"
import Loading from "../../components/Layout/Loading"
import Song from "../../components/Song/Song"
import Head from "next/head"
import { format } from "../../lib/Formatters/format"

const Playlist = ({ color }: { color: { color: string } }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const { playlistId } = router.query
  const [playlist, setPlaylist] = useState<CurrentUsersPlaylist>()

  useEffect(() => {
    ;(async () => {
      if (session?.accessToken) {
        const response = await spotify.getPlaylist(
          playlistId,
          session.accessToken
        )
        setPlaylist(response)
      }
    })()
  }, [playlistId, session])

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
