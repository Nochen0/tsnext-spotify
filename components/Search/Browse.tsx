import { Box, Flex, Text } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { randomColor } from "../../lib/HelperData/HelperFunctions"
import { Categories } from "../../lib/Interfaces/interfaces"
import spotify from "../../lib/SpotifyApi/spotify"

const Browse = () => {
  const { data: session } = useSession()
  const [categories, setCategories] = useState<Categories>()
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      if (session?.accessToken) {
        const response = await spotify.getCategories(session.accessToken)
        setCategories(response)
      }
    })()
  }, [session])

  return categories ? (
    <Box paddingX="10px" minW="655px">
      <Text fontSize="2xl" marginY="20px">
        Browse All
      </Text>
      <Flex flexWrap="wrap" gap="20px">
        {categories.categories.items.map((category, index) => {
          const color = randomColor()
          console.log(color)
          return (
            <Box
              cursor="pointer"
              key={index}
              position="relative"
              onClick={() => router.push(`/genre/${category.id}`)}
              height="190px"
              width="190px"
              borderRadius="10px"
              bg={randomColor()}
              overflow="hidden"
            >
              <Image
                alt={category.name}
                src={category.icons[0].url}
                transform="translateX(160%) rotate(24deg) translateY(120%)"
                height="50%"
              />
              <Text
                position="absolute"
                top="12px"
                left="12px"
                fontSize="lg"
                className="break"
                maxW="143px"
              >
                {category.name}
              </Text>
            </Box>
          )
        })}
      </Flex>
    </Box>
  ) : null
}

export default Browse
