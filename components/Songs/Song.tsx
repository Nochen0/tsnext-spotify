import { Box, Flex, Icon, Image, Text, useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { BaseSyntheticEvent } from "react";
import { dateDiff, format } from "../../lib/Helpers/HelperFunctions";
import { PlaylistTrack } from "../../lib/Interfaces/interfaces";
import { getSongUrl, setPlaying } from "../../store/player-reducer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { BiEqualizer } from "react-icons/bi";

const currentDate = new Date();

type Props = {
  track: PlaylistTrack;
  index: number;
  isAlbum?: true;
  isArtist?: true;
  allTracks: any[];
};

const Song: React.FC<Props> = ({ track, index, isAlbum, isArtist, allTracks }) => {
  const router = useRouter();
  const addedAt = new Date(track.added_at as string);
  const dispatch = useAppDispatch();
  const { activeSong } = useAppSelector((state) => state.playerSlice);
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

  const handleClickArtist = (artistId: string, event: BaseSyntheticEvent) => {
    event.stopPropagation();

    router.push(`/artist/${artistId}`);
  };

  const handleClickAlbum = (albumId: string, event: BaseSyntheticEvent) => {
    event.stopPropagation();

    router.push(`/album/${albumId}`);
  };

  const handleSongClick = () => {
    if (activeSong?.url) {
      if (activeSong.track.id === track.track.id) {
        dispatch(setPlaying(null));
      } else {
        dispatch(getSongUrl(track.track, allTracks));
      }
    } else {
      dispatch(getSongUrl(track.track, allTracks));
    }
  };

  return (
    <Flex
      gap="18px"
      align="center"
      py="8px"
      _hover={{ background: "rgba(255, 255, 255, 0.1)" }}
      cursor="pointer"
      borderRadius="5px"
      px="12px"
      onClick={handleSongClick}
    >
      <Box w="32px" textAlign="end" color="gray.400" fontFamily="mono" fontSize="15px">
        {activeSong?.track?.id === track.track.id ? (
          <Icon
            as={BiEqualizer}
            fontSize="24px"
            color="green.500"
            position="relative"
            left="5px"
            top="2px"
          />
        ) : (
          index
        )}
      </Box>
      <Flex align="center" gap="18px" w={isAlbum ? "94%" : isArtist ? "55%" : "40%"}>
        {!isAlbum && (
          <Image
            alt="Album Image"
            src={track.track.album.images[0].url}
            h="41px"
            draggable={false}
          />
        )}
        <Box>
          <Text
            color={activeSong?.track?.id === track.track.id ? "green.500" : "white"}
            fontSize="14px"
          >
            {track.track.name}
          </Text>
          {!isArtist && (
            <Text
              color="gray.500"
              fontWeight="500"
              textUnderlineOffset={1}
              _hover={{ color: "white", textDecoration: "underline" }}
              onClick={(e) => handleClickArtist(track.track.artists[0].id, e)}
              display="inline"
            >
              {track.track.artists[0].name}
            </Text>
          )}
        </Box>
      </Flex>
      {!isAlbum && (
        <Flex w={isArtist ? (isLargerThan1280 ? "35%" : "45%") : isLargerThan1280 ? "28%" : "45%"}>
          <Text
            color="gray.500"
            fontWeight="500"
            textUnderlineOffset={1}
            _hover={{ color: "white", textDecoration: "underline" }}
            onClick={(e) => handleClickAlbum(track.track.album.id, e)}
            display="inline"
          >
            {track.track.album.name}
          </Text>
        </Flex>
      )}
      {!isArtist && !isAlbum && isLargerThan1280 && (
        <Flex color="gray.500" w="24%">
          {dateDiff.inDays(currentDate, addedAt)}
        </Flex>
      )}
      <Flex color="gray.500" fontSize="14px" fontFamily="mono">
        {format(track.track.duration_ms / 1000)}
      </Flex>
    </Flex>
  );
};

export default Song;
