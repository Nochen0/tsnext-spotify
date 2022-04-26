import { Box, Button, Grid } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import React from "react";

const Login = () => {
  return (
    <Grid placeItems="center" h="100vh" w="100vw" bg="black">
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
  );
};

export default Login;
