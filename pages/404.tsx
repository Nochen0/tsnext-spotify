import { Box, Grid, Text } from "@chakra-ui/layout"
import { Icon } from "@chakra-ui/react"
import { MdOutlineErrorOutline } from "react-icons/md"

const ErrorPage = () => {
  return (
    <Grid h="100vh" w="100%" bg="#181818" placeItems="center">
      <Box color="white">
        <Icon
          as={MdOutlineErrorOutline}
          fontSize="80px"
          marginLeft="calc(120% / 2 - 80px)"
        />
        <Text fontSize="24px">Couldn't find what you were looking for</Text>
        <Text marginLeft="calc(50% - 80px)" marginY="10px">
          Search for something else?
        </Text>
      </Box>
    </Grid>
  )
}
export default ErrorPage
