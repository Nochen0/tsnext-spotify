import { Box, Grid, Text } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/react";
import Head from "next/head";
import { MdOutlineErrorOutline } from "react-icons/md";

const ErrorPage = () => {
  return (
    <>
      <Head>
        <title>Web Player | Spotify</title>
      </Head>
      <Grid h="100vh" w="100%" bg="#121212" placeItems="center">
        <Box color="white" textAlign="center">
          <Icon as={MdOutlineErrorOutline} fontSize="80px" />
          <Text fontSize="24px">Couldn&apos;t find what you were looking for</Text>
          <Text marginY="10px">Search for something else?</Text>
        </Box>
      </Grid>
    </>
  );
};
export default ErrorPage;
