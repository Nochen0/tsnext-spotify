import { Box, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { ArtistsTopTracks } from "../../lib/Interfaces/interfaces";
import Song from "../Songs/Song";

type Props = {
  tracks: ArtistsTopTracks;
};

const ArtistsTopTracks: React.FC<Props> = ({ tracks }) => {
  const [seeMore, setSeeMore] = useState(false);

  return (
    <Box marginTop="20px" w="70%" minW="630px">
      <Heading as="h2" color="white" fontSize="22px" marginBottom="20px">
        Popular
      </Heading>
      <Box>
        {tracks.tracks.map((track, index) => {
          if (!seeMore) {
            if (index >= 5) return;
          }

          // I modified the tracks to satisfy the 'PlaylistTrack' interface

          return (
            <Song
              key={index}
              index={index + 1}
              track={{ track }}
              isArtist
              allTracks={tracks.tracks.map((track) => {
                return { track };
              })}
            />
          );
        })}
        <Text
          cursor="pointer"
          marginLeft="34px"
          marginY="16px"
          color="gray.500"
          _hover={{ color: "white" }}
          onClick={() => setSeeMore((prevState) => !prevState)}
          display="inline-block"
        >
          SEE MORE
        </Text>
      </Box>
    </Box>
  );
};

export default ArtistsTopTracks;
