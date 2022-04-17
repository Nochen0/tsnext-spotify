import { Box, Flex, Text } from "@chakra-ui/layout"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import BoxWrapper from "../../../components/Layout/BoxWrapper"
import { CurrentUsersPlaylist } from "../../../lib/Interfaces/interfaces"
import spotify from "../../../lib/SpotifyApi/spotify"
import { MdOutlinePlayCircleFilled } from "react-icons/md"
import { IconButton } from "@chakra-ui/react"
import { useRouter } from "next/router"
import Head from "next/head"

const PlaylistsMenu = () => {
  const { data: session } = useSession()
  const [playlists, setPlaylists] = useState<CurrentUsersPlaylist[]>()
  const [usersSavedTracks, setUsersSavedTracks] = useState<any>()
  const router = useRouter()

  useEffect(() => {
    if (session?.accessToken) {
      ;(async () => {
        const response = await spotify.getUserSavedTracks(session.accessToken)
        setUsersSavedTracks(response)
        await spotify
          .getCurrentUsersPlaylists(session.accessToken)
          .then(res => setPlaylists(res))
      })()
    }
  }, [session])

  return (
    <>
      <Head>
        <title>Your Library | Spotify</title>
      </Head>
      <Box
        height="100vh"
        width="100%"
        bg="#121212"
        color="white"
        paddingX="35px"
        paddingY="60px"
        minW="500px"
      >
        <Text fontSize="2xl" marginBottom="20px">
          Playlists
        </Text>
        <Flex wrap="wrap" gap="20px">
          <Box
            height="260px"
            width="430px"
            bgGradient="linear(to right bottom, #450CF5, #8D8DE5)"
            paddingY="20px"
            paddingX="20px"
            borderRadius="8px"
            position="relative"
          >
            <Box position="absolute" bottom="10px" right="30px">
              <IconButton
                icon={<MdOutlinePlayCircleFilled />}
                outline="none"
                variant="link"
                aria-label="shuffle"
                fontSize="58px"
                color="green.500"
                _hover={{ transform: "scale(1.1)" }}
                onClick={() => router.push("/collection/tracks")}
              />
            </Box>
            <Text position="absolute" bottom="40px" fontSize="3xl">
              Liked Songs
            </Text>
            <Text position="absolute" bottom="15px" fontWeight="500">
              {usersSavedTracks?.total && usersSavedTracks.total} liked songs
            </Text>
          </Box>
          {playlists &&
            playlists.map((playlist, index) => {
              return (
                <BoxWrapper
                  imageUrl={playlist.images[0].url}
                  roundedImage={false}
                  key={index}
                  route={`/playlist/${playlist.id}`}
                >
                  <Text fontSize="md" marginBottom="5px">
                    {playlist.name}
                  </Text>
                  <Text fontWeight="500" color="gray.400" className="break">
                    {playlist.description
                      ? playlist.description
                      : `By ${playlist.owner.display_name}`}
                  </Text>
                </BoxWrapper>
              )
            })}
        </Flex>
      </Box>
    </>
  )
}

export default PlaylistsMenu
