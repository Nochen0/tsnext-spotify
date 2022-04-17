import { Box, Flex } from "@chakra-ui/layout"
import { signOut } from "next-auth/react"

const HeaderPopup = () => {
  return (
    <Box
      position="fixed"
      width="160px"
      height="36px"
      padding="3px"
      right="26px"
      top="55px"
      cursor="pointer"
      bg="#242424"
      borderRadius="4px"
      zIndex="200"
      color="white"
      fontWeight="400"
    >
      <Flex
        align="center"
        height="100%"
        paddingLeft="12px"
        _hover={{ background: "rgba(255, 255, 255, .05)" }}
        onClick={() => {
          signOut()
        }}
      >
        Log out
      </Flex>
    </Box>
  )
}
export default HeaderPopup
