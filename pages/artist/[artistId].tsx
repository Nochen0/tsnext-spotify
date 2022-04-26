import { Text } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import GradientBackground from "../../components/Layout/GradientBackground";
import { getColor } from "../../lib/Helpers/HelperFunctions";
import {
  ArtistRelatedArtists as _ArtistRelatedArtists,
  ArtistsAlbums as _ArtistsAlbums,
  ArtistsTopTracks as _ArtistsTopTracks,
  ExternalArtist,
} from "../../lib/Interfaces/interfaces";
import spotify from "../../lib/Spotify/spotify";
import { formatNumber } from "../../lib/Helpers/HelperFunctions";
import ArtistsTopTracks from "../../components/Artist/ArtistsTopTracks";
import ArtistsAlbums from "../../components/Artist/ArtistsAlbums";
import ArtistRelatedArtists from "../../components/Artist/ArtistRelatedArtists";
import { unstable_batchedUpdates } from "react-dom";
import AppLoading from "../../components/Layout/AppLoading";

const Artist = ({ color }: { color: { color: string } }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const artistId = router.query.artistId;
  const [artist, setArtist] = useState<ExternalArtist>();
  const [invalidId, setInvalidId] = useState(false);
  const [artistsTopTracks, setArtistsTopTracks] = useState<_ArtistsTopTracks>();
  const [artistsAlbums, setArtistsAlbums] = useState<_ArtistsAlbums>();
  const [relatedArtists, setRelatedArtists] = useState<_ArtistRelatedArtists>();

  useEffect(() => {
    (async () => {
      if (session?.accessToken) {
        const [artistResponse, tracksResponse, albumsResponse, relatedResponse] = await Promise.all(
          [
            spotify.getArtist(artistId, session.accessToken),
            spotify.getArtistsTopTracks(artistId, session.accessToken),
            spotify.getArtistsAlbums(artistId, session.accessToken),
            spotify.getArtistRelatedArtists(artistId, session.accessToken),
          ]
        );
        if (artistResponse?.error?.message === "invalid id") {
          console.log(artistResponse.error);
          setInvalidId(true);
        } else {
          unstable_batchedUpdates(() => {
            setArtistsTopTracks(tracksResponse);
            setRelatedArtists(relatedResponse);
            setArtistsAlbums(albumsResponse);
            setArtist(artistResponse);
          });
        }
      }
    })();
  }, [session, artistId]);

  useEffect(() => {
    if (invalidId) {
      router.push("/404");
    }
  }, [invalidId, router]);

  return (
    <>
      <Head>{artist?.id && <title>{artist.name} | Spotify</title>}</Head>
      {artist?.id ? (
        <GradientBackground
          type="artist"
          color={color.color}
          image={artist.images[0].url}
          title={artist.name}
          roundedImage
          extraText={
            <Text fontSize="14px">{formatNumber(artist.followers.total)} total followers</Text>
          }
        >
          {artistsTopTracks && <ArtistsTopTracks tracks={artistsTopTracks} />}
          {artistsAlbums?.items && artistsAlbums.items.length > 0 && <ArtistsAlbums albums={artistsAlbums} />}
          {relatedArtists?.artists && relatedArtists.artists.length > 0 && <ArtistRelatedArtists artists={relatedArtists} />}
        </GradientBackground>
      ) : (
        <AppLoading />
      )}
    </>
  );
};

export default Artist;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (context.params?.artistId) {
    const artistId = context.params.artistId;

    const color = await getColor(artistId);
    return color;
  }
  return {
    props: {
      color: undefined,
    },
  };
};
