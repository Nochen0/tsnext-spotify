import { Box } from "@chakra-ui/layout"
import { useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace("/collection/playlists")
  }, [router])

  return (
    <>
      <Head>
        <title>Your Library | Spotify</title>
      </Head>
      <Box
        bg="#121212"
        height="100%"
        width="calc(100vw - 260px)"
        overflowY="auto"
      ></Box>
    </>
  )
}

export default Home
