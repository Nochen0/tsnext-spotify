import { Box, Divider, Flex, Icon, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { MdQueryBuilder } from "react-icons/md";

type Props = {
  isAlbum?: true;
  isArtist?: true;
};

const SongIndicator: React.FC<Props> = ({ isAlbum, isArtist }) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

  return (
    <>
      <Flex
        gap="18px"
        align="center"
        py="8px"
        borderRadius="5px"
        px="12px"
        color="gray.500"
        className="unselectable"
      >
        <Box w="32px" textAlign="end" fontSize="18px">
          #
        </Box>
        <Flex align="center" gap="18px" w={isAlbum ? "94%" : "40%"}>
          TITLE
        </Flex>
        {!isAlbum && <Flex w={isLargerThan1280 ? "28%" : "45%"}>ALBUM</Flex>}
        {!isArtist && !isAlbum && isLargerThan1280 && <Flex w="24%">DATE ADDED</Flex>}
        <Flex w="32px" justify="center">
          <Icon as={MdQueryBuilder} fontSize="21px" />
        </Flex>
      </Flex>
      <Divider h="0.1px" color="gray.600" mb="15px" />
    </>
  );
};

export default SongIndicator;
