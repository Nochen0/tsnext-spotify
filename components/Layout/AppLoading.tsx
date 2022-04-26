import { Box } from "@chakra-ui/react";
import Head from "next/head";

import React from "react";

const AppLoading = () => {
  return (
    <>
      <Head>
        <title> | Spotify</title>
      </Head>
      <Box h="100vh" w="100vw" bg="#121212"></Box>
    </>
  );
};

export default AppLoading;
