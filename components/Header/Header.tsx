import { Box, Flex, Text } from "@chakra-ui/layout"
import React from "react"
import { useSession } from "next-auth/react"
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md"
import HeaderPopup from "./HeaderPopup"
import { Dispatch, SetStateAction } from "react"
import { Image, useMediaQuery } from "@chakra-ui/react"

type Props = {
  showPopup: boolean
  setShowPopup: Dispatch<SetStateAction<boolean>>
}

const Header: React.FC<Props> = ({ showPopup, setShowPopup }) => {
  const { data: session } = useSession()
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)")

  return (
    <Box position="relative">
      <Flex
        position="absolute"
        height="32px"
        right="24px"
        top="20px"
        cursor="pointer"
        bg={showPopup ? "#242424" : "#121212"}
        borderRadius="20px"
        padding="1px"
        zIndex="200"
        onClick={() => setShowPopup((prev: boolean) => !prev)}
      >
        {session?.user?.image && (
          <Flex align="center" gap="10px" color="white">
            <Image
              alt="User"
              src={session?.user?.image ? session.user.image : undefined}
              height="32px"
              width="32px"
              borderRadius="50%"
              overflow="hidden"
              objectFit="cover"
            />
            {isLargerThan1280 && (
              <>
                <Text>{session?.user?.name}</Text>
                <Box marginTop="3px" marginLeft="-3px" marginRight="4px">
                  {!showPopup ? (
                    <MdArrowDropDown fontSize="22px" />
                  ) : (
                    <MdArrowDropUp fontSize="22px" />
                  )}
                </Box>
              </>
            )}
          </Flex>
        )}
      </Flex>
      {showPopup && <HeaderPopup />}
    </Box>
  )
}

export default Header
