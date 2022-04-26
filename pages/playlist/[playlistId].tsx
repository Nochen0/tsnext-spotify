import { Text } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AppLoading from "../../components/Layout/AppLoading";
import GradientBackground from "../../components/Layout/GradientBackground";
import Song from "../../components/Songs/Song";
import SongIndicator from "../../components/Songs/SongIndicator";
import { getColor, msToTime } from "../../lib/Helpers/HelperFunctions";
import { Playlist } from "../../lib/Interfaces/interfaces";
import spotify from "../../lib/Spotify/spotify";

const Playlist = ({ color }: { color: { color: string } }) => {
  const { data: session } = useSession();
  const [playlist, setPlaylist] = useState<Playlist>();
  const router = useRouter();
  const playlistId = router.query.playlistId;
  const [invalidId, setInvalidId] = useState(false);

  useEffect(() => {
    (async () => {
      if (session?.accessToken) {
        const playlistResponse = await spotify.getPlaylist(playlistId, session.accessToken);
        if (playlistResponse?.error?.message === "Invalid playlist Id") {
          setInvalidId(true);
        } else {
          setPlaylist(playlistResponse);
        }
      }
    })();
  }, [session, playlistId]);

  useEffect(() => {
    if (invalidId) {
      router.push("/404");
    }
  }, [invalidId, router]);

  return (
    <>
      <Head>{playlist?.id && <title>{playlist.name} | Spotify</title>}</Head>
      {playlist?.id ? (
        <GradientBackground
          type="playlist"
          color={color.color}
          title={playlist.name}
          image={playlist.images[0].url}
          description={playlist.description}
          extraText={
            <Text fontSize="14px">
              {playlist.owner.display_name} ·{" "}
              <Text display="inline" fontWeight="500">
                {playlist.tracks.total} songs,{" "}
                <Text display="inline" color="gray.400">
                  {msToTime(
                    playlist.tracks.items.reduce((acc, cur) => acc + cur.track.duration_ms, 0)
                  )}
                </Text>
              </Text>
            </Text>
          }
        >
          <SongIndicator />
          {playlist.tracks.items.map((track, index) => {
            return (
              <Song
                key={track.track.id}
                track={track}
                index={index + 1}
                allTracks={playlist.tracks.items}
              />
            );
          })}
        </GradientBackground>
      ) : (
        <AppLoading />
      )}
    </>
  );
};

export default Playlist;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (context.params?.playlistId) {
    const playlistId = context.params.playlistId;

    const color = await getColor(playlistId);
    return color;
  }
  return {
    props: {
      color: undefined,
    },
  };
};
