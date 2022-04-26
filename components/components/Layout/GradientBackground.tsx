import { Box, Flex, Heading, Image, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";

type Props = {
  color: string;
  image: string;
  type: "album" | "playlist" | "artist" | "single";
  title: string;
  description?: string;
  children: React.ReactNode;
  extraText?: React.ReactNode;
  roundedImage?: true;
};

const GradientBackground: React.FC<Props> = ({
  color,
  extraText,
  image,
  type,
  title,
  description,
  children,
  roundedImage,
}) => {
  const [isLargerThan2000] = useMediaQuery("(min-width: 2000px)");

  return (
    <Box minH="calc(100vh - 92px)" overflowY="auto" position="relative" bg="#121212" minW="650px">
      <Box
        position="absolute"
        bgGradient={`linear(${color} 0%, ${color} 20%, ${color} 20%, #121212 80%)`}
        top="0"
        left="0"
        right="0"
        h="60vh"
        zIndex="0"
      ></Box>
      <Flex
        minH="320px"
        h="31vh"
        align="end"
        position="relative"
        paddingX="32px"
        paddingY="28px"
        gap="24px"
        className="unselectable"
      >
        <Box>
          <Image
            alt={`${type} image`}
            src={image}
            h={roundedImage ? "250px" : "200px"}
            w={roundedImage ? "250px" : "200px"}
            draggable={false}
            borderRadius={roundedImage ? "50%" : "0"}
          />
        </Box>
        <Box color="white">
          <Text>{type.toUpperCase()}</Text>
          <Heading
            fontSize={isLargerThan2000 ? "calc(100vw / 24)" : "calc(100vw / 18)"}
            as="h1"
            className="break"
            maxW="calc(100vw - 650px)"
            minW="320px"
          >
            {title}
          </Heading>
          {description && (
            <Text color="gray.500" fontWeight="500" marginBottom="7px">
              {description}
            </Text>
          )}
          <Box marginBottom={roundedImage ? "25px" : "0"}>{extraText && extraText}</Box>
        </Box>
      </Flex>
      <Box
        position="relative"
        bg="rgba(0, 0, 0, 0.2)"
        minH="calc(69vh - 92px)"
        paddingX="32px"
        paddingY="12px"
      >
        {children}
      </Box>
    </Box>
  );
};

export default GradientBackground;
