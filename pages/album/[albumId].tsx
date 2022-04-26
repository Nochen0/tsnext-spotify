import { Text, Box, Heading, Flex, Link as ChakraLink } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import AppLoading from "../../components/Layout/AppLoading";
import BoxWrapper from "../../components/Layout/BoxWrapper";
import GradientBackground from "../../components/Layout/GradientBackground";
import Song from "../../components/Songs/Song";
import SongIndicator from "../../components/Songs/SongIndicator";
import {
  dynamicSlice,
  getColor,
  msToTime,
  useWindowWidth,
} from "../../lib/Helpers/HelperFunctions";
import { Album, ArtistsAlbums, PlaylistTrack } from "../../lib/Interfaces/interfaces";
import spotify from "../../lib/Spotify/spotify";

const Album = ({ color }: { color: { color: string } }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const albumId = router.query.albumId;
  const [album, setAlbum] = useState<Album>();
  const [invalidId, setInvalidId] = useState(false);
  const [artistsOtherAlbums, setArtistsOtherAlbums] = useState<ArtistsAlbums>();
  const [windowWidth] = useWindowWidth();

  useEffect(() => {
    (async () => {
      if (session?.accessToken) {
        const albumResponse = await spotify.getAlbum(albumId, session.accessToken);
        if (albumResponse?.error?.message === "invalid id") {
          console.log(albumResponse.error);
          setInvalidId(true);
        } else {
          (async () => {
            const artistsOtherAlbums = await spotify.getArtistsAlbums(
              albumResponse.artists[0].id,
              session.accessToken
            );
            unstable_batchedUpdates(() => {
              setAlbum(albumResponse);
              setArtistsOtherAlbums(artistsOtherAlbums);
            });
          })();
        }
      }
    })();
  }, [session, albumId]);

  useEffect(() => {
    if (invalidId) {
      router.push("/404");
    }
  }, [invalidId, router]);

  return (
    <>
      <Head>{album?.id && <title>{album.name} | Spotify</title>}</Head>
      {album?.id && artistsOtherAlbums?.items ? (
        <GradientBackground
          color={color.color}
          type={album.album_type as "single" | "album"}
          title={album.name}
          image={album.images[0].url}
          extraText={
            <>
              <Link href={`/artist/${album.artists[0].id}`} passHref>
                <ChakraLink _focus={{}} textUnderlineOffset={1}>
                  {album.artists[0].name}
                </ChakraLink>
              </Link>
              <Text display="inline" color="gray.400" fontWeight="500">
                <Text display="inline" color="white">
                  {" "}
                  · {album.release_date.substring(0, 4)} · {album.total_tracks} songs
                </Text>
                {album.album_type !== "single" &&
                  ", " +
                    msToTime(album.tracks.items.reduce((acc, cur) => acc + cur.duration_ms, 0))}
              </Text>
            </>
          }
        >
          <Box w="86%">
            <SongIndicator isAlbum />
            {album.tracks.items.map((track, index) => {
              return (
                <Song
                  isAlbum
                  key={track.id}
                  track={{ track } as PlaylistTrack}
                  index={index + 1}
                  allTracks={album.tracks.items.map((track) => {
                    return { track };
                  })}
                />
              );
            })}
          </Box>
          <Box mt="30px" mb="36px">
            {album.copyrights.map((cp, index) => {
              return (
                <Box key={index} color="gray.500">
                  <Text fontSize="10px">{cp.text}</Text>
                </Box>
              );
            })}
          </Box>
          {artistsOtherAlbums.items.length > 0 && (
            <Box>
              <Heading as="h2" color="white" fontSize="20px" mb="25px" mt="50px">
                More by {album.artists[0].name}
              </Heading>

              <Flex gap="28px" flexWrap="wrap" mb="40px">
                {artistsOtherAlbums.items.slice(0, dynamicSlice(windowWidth, 250)).map((album) => {
                  return (
                    <BoxWrapper
                      key={album.id}
                      route={`/album/${album.id}`}
                      width={190}
                      image={album.images[0].url}
                    >
                      <Box>
                        <Text color="white" fontSize="15px" className="break" maxW="100%">
                          {album.name}
                        </Text>
                        <Text fontWeight="500" color="gray.500" mt="5px">
                          {album.release_date.substring(0, 4)}
                        </Text>
                      </Box>
                    </BoxWrapper>
                  );
                })}
              </Flex>
            </Box>
          )}
        </GradientBackground>
      ) : (
        <AppLoading />
      )}
    </>
  );
};

export default Album;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (context.params?.albumId) {
    const albumId = context.params.albumId;

    const color = await getColor(albumId);
    return color;
  }

  return {
    props: {
      color: undefined,
    },
  };
};
