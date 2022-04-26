import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { dynamicSlice, useWindowWidth } from "../../lib/Helpers/HelperFunctions";
import { ArtistRelatedArtists } from "../../lib/Interfaces/interfaces";
import BoxWrapper from "../Layout/BoxWrapper";

type Props = {
  artists: ArtistRelatedArtists;
};

const ArtistRelatedArtists: React.FC<Props> = ({ artists }) => {
  const [windowWidth] = useWindowWidth()

  return (
    <Box marginTop="60px" mb="40px">
      <Heading as="h2" fontSize="20px" color="white" mb="34px">
        Fans also like
      </Heading>
      <Flex flexWrap="wrap" gap="28px">
        {artists.artists.slice(0, dynamicSlice(windowWidth, 250)).map((artist) => {
          return (
            <BoxWrapper key={artist.id} image={artist.images[0]?.url} width={190} route={`/artist/${artist.id}`}>
              <Box>
                <Text
                  color="white"
                  fontSize="15px"
                  marginBottom="5px"
                  className="break"
                  maxW="100%"
                >
                  {artist.name}
                </Text>
                <Text color="gray.500">Artist</Text>
              </Box>
            </BoxWrapper>
          );
        })}
      </Flex>
    </Box>
  );
};

export default ArtistRelatedArtists;
