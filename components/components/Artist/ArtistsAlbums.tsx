import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { dynamicSlice, useWindowWidth } from "../../lib/Helpers/HelperFunctions";
import { ArtistsAlbums } from "../../lib/Interfaces/interfaces";
import BoxWrapper from "../Layout/BoxWrapper";

type Props = {
  albums: ArtistsAlbums;
};

const ArtistsAlbums: React.FC<Props> = ({ albums }) => {
  const [windowWidth] = useWindowWidth()

  return (
    <Box marginTop="60px">
      <Heading as="h2" fontSize="22px" color="white" marginBottom="30px">
        Popular releases
      </Heading>
      <Flex gap="28px" flexWrap="wrap">
        {albums.items
          .slice(0, dynamicSlice(windowWidth, 250))
          .sort(
            (a, b) =>
              parseInt(a.release_date.substring(0, 4)) - parseInt(b.release_date.substring(0, 4))
          )
          .reverse()
          .map((album) => {
            return (
              <BoxWrapper
                image={album.images[0].url}
                key={album.id}
                width={190}
                route={`/album/${album.id}`}
              >
                <Box>
                  <Text
                    color="white"
                    fontSize="15px"
                    marginBottom="5px"
                    className="break"
                    maxW="100%"
                  >
                    {album.name}
                  </Text>
                  <Text color="gray.500">
                    {album.release_date.substring(0, 4)} ·{" "}
                    {album.album_type.substring(0, 1).toUpperCase() + album.album_type.substring(1)}
                  </Text>
                </Box>
              </BoxWrapper>
            );
          })}
      </Flex>
    </Box>
  );
};

export default ArtistsAlbums;
