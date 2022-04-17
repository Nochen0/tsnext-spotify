import { Box, Flex } from "@chakra-ui/layout"
import { useMediaQuery } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { MdQueryBuilder } from "react-icons/md"

const SongIndicator = ({ type }: { type?: string }) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true)
    }
  }, [])

  return isClient ? (
    <Box
      borderBottom="1px solid gray"
      marginBottom="15px"
      paddingLeft="7px"
      className="unselectable"
      color="gray.400"
      fontWeight="400"
    >
      <Flex paddingY="6px">
        <Flex
          width="28px"
          justifyContent="end"
          align="center"
          fontSize="16px"
          marginRight="18px"
        >
          #
        </Flex>
        <Flex gap="13px" basis="50%" wordBreak="break-all">
          TITLE
        </Flex>

        <Flex basis="35%" justify="start" align="center ">
          {type !== "album" && "ALBUM"}
        </Flex>

        {isLargerThan1280 && type !== "album" && (
          <Flex basis="25%" justify="center" align="center">
            DATE ADDED
          </Flex>
        )}
        <Flex basis="11%" justify="center" align="center">
          <MdQueryBuilder fontSize="22px" />
        </Flex>
      </Flex>
    </Box>
  ) : null
}
export default SongIndicator
