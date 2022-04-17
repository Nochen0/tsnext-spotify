import {
  ListItem,
  Link as ChakraLink,
  List,
  Box,
  LinkOverlay,
} from "@chakra-ui/layout"
import Link from "next/link"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { UserPlaylist } from "../../lib/Interfaces/interfaces"
import spotify from "../../lib/SpotifyApi/spotify"

const PlaylistMenu = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [userPlaylists, setUserPlaylists] = useState<UserPlaylist[]>()

  useEffect(() => {
    ;(async () => {
      if (session?.accessToken) {
        const response = await spotify.getCurrentUsersPlaylists(
          session.accessToken
        )
        setUserPlaylists(response)
      }
    })()
  }, [session])

  const PlaylistMenuElements = userPlaylists?.map((playlist, index) => {
    const navCheck = router.asPath === `/playlist/${playlist.id}`

    return (
      <ListItem key={index}>
        <Link href={`/playlist/${playlist.id}`} passHref>
          <ChakraLink
            _focus={{ boxShadow: "0px" }}
            fontWeight="400"
            color={!navCheck ? "gray.500" : "white"}
            _hover={{ textDecoration: "none", color: "white" }}
            fontSize="13px"
          >
            {playlist.name}
          </ChakraLink>
        </Link>
      </ListItem>
    )
  })

  return (
    <Box height="calc(100% - 230px)" overflowY="auto">
      <List spacing={2}>{PlaylistMenuElements}</List>
    </Box>
  )
}
export default PlaylistMenu
