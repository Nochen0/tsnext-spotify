import { Box, Grid } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/react"
import Head from "next/head"
import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import Loading from "../Layout/Loading"

const Login = () => {
  const { data: session } = useSession()

  if (session) return <Loading />

  return (
    <Grid bg="black" height="100vh" placeItems="center">
      <Head>
        <title>Login - Spotify</title>
      </Head>
      <Image
        src="https://rb.gy/y9mwtb"
        alt="Spotify Icon"
        height="350px"
        width="800px"
      />
      <Box>
        <Button
          onClick={() => signIn("spotify")}
          bg="green.500"
          color="black"
          borderRadius="25px"
          paddingX="28px"
          paddingY="25px"
        >
          Sign in with Spotify
        </Button>
      </Box>
    </Grid>
  )
}
export default Login
