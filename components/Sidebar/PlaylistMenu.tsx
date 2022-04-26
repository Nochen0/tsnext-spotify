import { Link, List, ListItem } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { UserPlaylists } from "../../lib/Interfaces/interfaces";
import spotify from "../../lib/Spotify/spotify";
import NextLink from "next/link";

const PlaylistMenu = () => {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState<UserPlaylists>();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (session?.accessToken) {
        const playlistsResponse = await spotify.getUserPlaylists(session.accessToken);
        setPlaylists(playlistsResponse);
      }
    })();
  }, [session]);

  return (
    <List spacing={3}>
      {playlists &&
        playlists.items.map((playlist) => {
          const currentRoute = router.asPath;
          const playlistRoute = `/playlist/${playlist.id}`;

          return (
            <ListItem
              key={playlist.id}
              cursor="pointer"
              color={currentRoute === playlistRoute ? "white" : "gray.500"}
              fontWeight="500"
            >
              <NextLink passHref href={playlistRoute}>
                <Link _focus={{}} _hover={{ color: "white" }}>
                  {playlist.name}
                </Link>
              </NextLink>
            </ListItem>
          );
        })}
    </List>
  );
};

export default PlaylistMenu;
