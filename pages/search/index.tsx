import { Box, Flex, Text } from "@chakra-ui/layout"
import { Icon, IconButton, Input } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import Head from "next/head"
import { useEffect, useState } from "react"
import spotify from "../../lib/SpotifyApi/spotify"
import {
  PlaylistTrack,
  SearchAlbum,
  SearchArtist,
  SearchPlaylist,
  Track,
} from "../../lib/Interfaces/interfaces"
import BoxWrapper from "../../components/Layout/BoxWrapper"
import Song from "../../components/Song/Song"
import { MdClose, MdPlayCircleFilled, MdSearch } from "react-icons/md"
import Browse from "../../components/Search/Browse"

const Home = () => {
  const [inputValue, setInputValue] = useState<string>("")
  const { data: session } = useSession()
  const [albums, setAlbums] = useState<SearchAlbum[]>()
  const [artists, setArtists] = useState<SearchArtist[]>()
  const [playlists, setPlaylists] = useState<SearchPlaylist[]>()
  const [tracks, setTracks] = useState<{ track: Track }[]>()

  useEffect(() => {
    ;(async () => {
      if (session?.accessToken && inputValue) {
        const response = await spotify.searchAll(
          inputValue,
          session.accessToken
        )
        const { artists, albums, tracks, playlists } = response
        console.log(tracks)
        setArtists(artists)
        setAlbums(albums)
        setTracks(tracks)
        setPlaylists(playlists)
      }
    })()
  }, [inputValue, session])

  return (
    <>
      <Head>
        <title>Home - Spotify</title>
      </Head>

      <Box
        bg="#121212"
        height="100%"
        width="calc(100vw - 260px)"
        overflowY="auto"
        paddingTop="15px"
        paddingBottom="45px"
        paddingX="12px"
        color="white"
      >
        <form
          action="search"
          style={{ position: "relative", display: "inline-block" }}
        >
          <Icon
            as={MdSearch}
            position="absolute"
            zIndex="100"
            color="black"
            fontSize="32px"
            top="6px"
            left="8px"
            cursor="text"
          />
          <Input
            paddingRight="50px"
            paddingLeft="45px"
            variant="outline"
            placeholder="Search your favorite music"
            width="380px"
            borderRadius="20px"
            height="42px"
            color="black"
            bg="white"
            onChange={e => setInputValue(e.target.value)}
            value={inputValue}
            marginBottom="32px"
          />
          {inputValue && (
            <Icon
              as={MdClose}
              position="absolute"
              zIndex="100"
              color="black"
              fontSize="32px"
              top="6px"
              right="8px"
              cursor="pointer"
              onClick={() => setInputValue("")}
            />
          )}
        </form>

        {inputValue ? (
          <>
            <Flex flexWrap="wrap">
              {tracks !== undefined && tracks?.length > 0 && (
                <Box height="240px" width="30%" marginBottom="100px">
                  <Text fontSize="2xl" marginBottom="20px">
                    Top result
                  </Text>
                  <Box>
                    <BoxWrapper
                      roundedImage
                      imageUrl={tracks[0]?.track?.album?.images[0].url}
                      height={200}
                      width={450}
                      external
                      paddingBottom={-65}
                      route={`/artist/${tracks[0]?.track.artists[0].id}`}
                    >
                      <Text fontSize="2xl" marginBottom="10px">
                        {tracks[0]?.track.artists[0].name}
                      </Text>
                      <Text
                        display="inline"
                        borderRadius="24px"
                        bg="black"
                        paddingY="3px"
                        paddingX="15px"
                        fontSize="sm"
                      >
                        ARTIST
                      </Text>
                      <IconButton
                        aria-label="play"
                        position="absolute"
                        right="30px"
                        bottom="32px"
                        icon={<MdPlayCircleFilled />}
                        bg="none"
                        fontSize="58px"
                        color="green.500"
                        _hover={{ transform: "scale(1.1)" }}
                        _focus={{ boxShadow: "0px", outline: "none" }}
                        _active={{}}
                      />
                    </BoxWrapper>
                  </Box>
                </Box>
              )}
              {tracks !== undefined && tracks?.length > 0 && (
                <Box width="66%" minW="650px">
                  <Text fontSize="2xl" marginBottom="20px">
                    Songs
                  </Text>
                  <Box>
                    {tracks?.slice(0, 5).map((track, index) => {
                      return (
                        <Song
                          key={index}
                          track={track as PlaylistTrack}
                          index={index}
                          total={tracks.length}
                          tracks={tracks as PlaylistTrack[]}
                          noDate
                        />
                      )
                    })}
                  </Box>
                </Box>
              )}
            </Flex>
            {artists !== undefined && artists?.length > 0 && (
              <Box minW="512px">
                <Text fontSize="2xl" marginBottom="20px" marginY="32px">
                  Artists
                </Text>
                <Flex flexWrap="wrap" gap="25px">
                  {artists?.slice(0, 7).map((artist, index) => {
                    return (
                      <BoxWrapper
                        key={index}
                        roundedImage
                        imageUrl={artist.image}
                        route={`/artist/${artist.id}`}
                        height={220}
                        width={200}
                        paddingBottom={-30}
                      >
                        <Box>
                          <Text fontSize="md">{artist.name}</Text>
                          <Text fontWeight="500" color="gray.400" fontSize="sm">
                            Artist
                          </Text>
                        </Box>
                      </BoxWrapper>
                    )
                  })}
                </Flex>
              </Box>
            )}
            {albums !== undefined && albums?.length > 0 && (
              <Box minW="512px">
                <Text fontSize="2xl" marginBottom="20px" marginY="25px">
                  Albums
                </Text>
                <Flex flexWrap="wrap" gap="25px">
                  {albums?.slice(0, 7).map((album, index) => {
                    return (
                      <BoxWrapper
                        key={index}
                        imageUrl={album.image}
                        roundedImage={false}
                        route={`/album/${album.id}`}
                        height={220}
                        width={200}
                        paddingBottom={-5}
                      >
                        <Text fontWeight="500" color="gray.400" fontSize="sm">
                          {album.release_date.substring(0, 4)} · Album
                        </Text>
                      </BoxWrapper>
                    )
                  })}
                </Flex>
              </Box>
            )}
            {playlists !== undefined && playlists?.length > 0 && (
              <Box minW="512px">
                <Text fontSize="2xl" marginBottom="20px" marginY="25px">
                  Playlists
                </Text>
                <Flex flexWrap="wrap" gap="25px">
                  {playlists?.slice(0, 7).map((playlist, index) => {
                    return (
                      <BoxWrapper
                        key={index}
                        imageUrl={playlist.image}
                        roundedImage={false}
                        route={`/album/${playlist.id}`}
                        height={220}
                        width={200}
                        paddingBottom={-5}
                      >
                        <Text fontWeight="500" color="gray.400" fontSize="sm">
                          By {playlist.owner}
                        </Text>
                      </BoxWrapper>
                    )
                  })}
                </Flex>
              </Box>
            )}
          </>
        ) : (
          <Browse />
        )}
      </Box>
    </>
  )
}
export default Home
