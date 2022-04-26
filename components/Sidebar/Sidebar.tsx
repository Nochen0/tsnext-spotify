import { Box, Divider } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import MusicMenu from "./MusicMenu";
import NavMenu from "./NavMenu";
import PlaylistMenu from "./PlaylistMenu";

const Sidebar = () => {
  const router = useRouter();

  const handleSpotifyClick = () => {
    router.push("/");
  };

  return (
    <Box h="100%">
      <Box marginBottom="20px" cursor="pointer" display="inline-block" onClick={handleSpotifyClick}>
        <Image
          alt="Spotify Logo"
          src="https://rb.gy/y9mwtb"
          width="150px"
          height="65px"
          draggable={false}
        />
      </Box>
      <Box overflowY="auto">
        <NavMenu />
        <MusicMenu />
        <Divider h="0.1px" color="gray.400" marginY="12px" />
        <PlaylistMenu />
      </Box>
    </Box>
  );
};

export default Sidebar;
