import { Grid, Text } from "@chakra-ui/layout"
import { Button, Icon } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { MdOutlineMusicNote } from "react-icons/md"

const NoLikedSongs = () => {
  const router = useRouter()

  return (
    <Grid placeItems="center" margin="auto" color="white" marginTop="120px">
      <MdOutlineMusicNote fontSize="40px" />
      <Text fontSize="md" marginY="20px">
        Songs you like will appear here
      </Text>
      <Button
        borderRadius="20px"
        paddingY="24px"
        paddingX="32px"
        _hover={{ transform: "scale(1.1)" }}
        color="black"
        _focus={{ boxShadow: "0px" }}
        onClick={() => router.push("/search")}
      >
        Find Songs
      </Button>
    </Grid>
  )
}
export default NoLikedSongs
