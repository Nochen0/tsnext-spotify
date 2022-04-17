import { useSession } from "next-auth/react"
import Head from "next/head"
import { useEffect, useState } from "react"
import spotify from "../../../lib/SpotifyApi/spotify"
import { PlaylistTrack } from "../../../lib/Interfaces/interfaces"
import Song from "../../../components/Song/Song"
import GradientBackground from "../../../components/Layout/GradientBackground"
import NoLikedSongs from "../../../components/Layout/NoLikedSongs"

const SavedSongs = () => {
  const { data: session } = useSession()
  const [usersSavedTracks, setUsersSavedTracks] = useState<any>()

  useEffect(() => {
    ;(async () => {
      if (session?.accessToken) {
        const response = await spotify.getUserSavedTracks(session.accessToken)
        setUsersSavedTracks(response)
      }
    })()
  }, [session])

  return (
    <>
      <Head>
        <title>Liked Songs - Spotify</title>
      </Head>
      {usersSavedTracks && session?.user?.name && (
        <GradientBackground
          title="Liked Songs"
          type="PLAYLIST"
          playlist={usersSavedTracks.items}
          owner={session.user.name}
          noIndicator={usersSavedTracks.items.length > 0 ? false : true}
          imageUrl={
            "https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
          }
          explicitColor="#523C9F"
        >
          {usersSavedTracks.items.length > 0 ? (
            usersSavedTracks.items.map((item: PlaylistTrack, index: number) => {
              return (
                <Song
                  key={index}
                  track={item}
                  index={index}
                  total={usersSavedTracks.total}
                  tracks={usersSavedTracks.items}
                />
              )
            })
          ) : (
            <NoLikedSongs />
          )}
        </GradientBackground>
      )}
    </>
  )
}

export default SavedSongs
