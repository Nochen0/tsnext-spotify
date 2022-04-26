import { Box, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  children: React.ReactNode;
  width?: number;
  image: string;
  route?: string;
};

const BoxWrapper: React.FC<Props> = ({ image, width, children, route }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(route);
  };

  return (
    <Box
      padding="15px"
      paddingBottom="20px"
      bg="#181818"
      _hover={{ backgroundColor: "rgba(255, 255, 255, .1)" }}
      transitionDuration="350ms"
      transitionProperty="background"
      w={width ? width : "180px"}
      cursor="pointer"
      borderRadius="9px"
      onClick={route ? handleClick : undefined}
    >
      <Box minH="70%">
        <Image
          alt="Image"
          src={image}
          borderRadius="5px"
          h={`calc(${width}px - 14px)`}
          draggable={false}
        />
      </Box>
      <Box marginTop="10px">{children}</Box>
    </Box>
  );
};

export default BoxWrapper;
