import { Link, Flex, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { musicMenuData } from "../../lib/Helpers/HelperData";

const MusicMenu = () => {
  const router = useRouter();

  const MusicMenuElements = musicMenuData.map((menu) => {
    const currentRoute = router.asPath;

    return (
      <ListItem
        key={menu.title}
        cursor="pointer"
        color={currentRoute === menu.route ? "white" : "gray.400"}
      >
        <NextLink passHref href={menu.route}>
          <Link _focus={{}} _hover={{ color: "white" }}>
            <Flex align="center" gap="7px" transitionProperty="color" transitionDuration="150ms">
              <ListIcon
                as={currentRoute === menu.route ? menu.icons[1] : menu.icons[0]}
                fontSize="28px"
              />
              <Text>{menu.title}</Text>
            </Flex>
          </Link>
        </NextLink>
      </ListItem>
    );
  });

  return <List spacing={3}>{MusicMenuElements}</List>;
};

export default MusicMenu;
