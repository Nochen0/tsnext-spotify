import { Box } from "@chakra-ui/layout"
import { useSession } from "next-auth/react"
import Head from "next/head"
import { useEffect } from "react"
import spotify from "../lib/SpotifyApi/spotify"

const Home = () => {
  const { data: session } = useSession()

  useEffect(() => {
    ;(async () => {
      if (session?.accessToken) {
        const featuredPlaylists = await spotify.getFeaturedPlaylists(
          session.accessToken
        )
        const newReleases = await spotify.getNewReleases(session.accessToken)

        const topArtists = await spotify.getUsersTopItems(
          "artists",
          session.accessToken
        )
      }
    })()
  }, [session])

  return (
    <>
      <Head>
        <title>Home - Spotify</title>
      </Head>
      <Box
        bg="#121212"
        height="100%"
        width="calc(100vw - 260px)"
        overflowY="auto"
      >
        Home
      </Box>
    </>
  )
}

export default Home
