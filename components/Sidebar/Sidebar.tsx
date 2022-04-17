import { Box, Divider } from "@chakra-ui/layout"
import Image from "next/image"
import { useRouter } from "next/router"
import SpotifyIcon from "../../public/spotify2019-830x350.jpg"
import MusicMenu from "./MusicMenu"
import NavMenu from "./NavMenu"
import PlaylistMenu from "./PlaylistMenu"

const imageStyles = {
  transform: "scale(1.12)",
  marginLeft: "8px",
}

const Sidebar = () => {
  const router = useRouter()

  return (
    <Box height="100%" bg="black" paddingTop="16px">
      <Box
        width="150px"
        paddingLeft="16px"
        cursor="pointer"
        marginBottom="24px"
      >
        <Image
          src={SpotifyIcon}
          alt="Spotify Icon"
          style={imageStyles}
          onClick={() => router.push("/")}
        />
      </Box>
      <Box
        height="calc(100% - 100px)"
        paddingX="22px"
        position="relative"
        top="-7px"
      >
        <NavMenu />
        <MusicMenu />
        <Divider marginY="12px" />
        <PlaylistMenu />
      </Box>
    </Box>
  )
}

export default Sidebar
