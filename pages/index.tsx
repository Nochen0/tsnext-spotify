import { Box } from "@chakra-ui/layout"
import Head from "next/head"

const Home = () => {
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
