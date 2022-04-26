import { Box, Flex } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import React from "react";

const HeaderPopup = () => {
  return (
    <Box
      position="absolute"
      border="1px solid black"
      right="0"
      width="160px"
      height="36px"
      padding="3px"
      top="38px"
      cursor="pointer"
      bg="#242424"
      borderRadius="4px"
      zIndex="200"
      color="white"
      fontWeight="400"
    >
      <Flex
        align="center"
        height="100%"
        paddingLeft="12px"
        _hover={{ background: "rgba(255, 255, 255, .05)" }}
        onClick={() => {
          signOut();
        }}
      >
        Log out
      </Flex>
    </Box>
  );
};

export default HeaderPopup;
