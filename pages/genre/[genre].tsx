import { Box, Flex, Text } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import BoxWrapper from "../../components/Layout/BoxWrapper"
import { Category, CategoryPlaylists } from "../../lib/Interfaces/interfaces"
import spotify from "../../lib/SpotifyApi/spotify"

const Genre = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const categoryId = router.query.genre
  const [categoryPlaylists, setCategoryPlaylists] =
    useState<CategoryPlaylists>()
  const [category, setCategory] = useState<Category>()

  useEffect(() => {
    ;(async () => {
      if (session?.accessToken) {
        await spotify
          .getCategory(categoryId, session.accessToken)
          .then(setCategory)
        await spotify
          .getCategoryPlaylists(categoryId, session.accessToken)
          .then(setCategoryPlaylists)
      }
    })()
  }, [session, categoryId])

  return (
    <>
      <Head>
        <title>{category?.name} | Spotify</title>
      </Head>
      <Box
        bg="#121212"
        height="100%"
        width="calc(100vw - 260px)"
        overflowY="auto"
        paddingBottom="40px"
      >
        {category && (
          <Box position="relative">
            <Image
              alt={category.name}
              src={category.icons[0]?.url}
              height="40vh"
              width="100%"
              objectFit="cover"
            />
            <Text
              color="white"
              fontSize="6xl"
              position="absolute"
              left="20px"
              bottom="20px"
            >
              {category.name}
            </Text>
          </Box>
        )}
        <Box paddingX="15px">
          <Text color="white" fontSize="xl" marginY="28px">
            Category Playlists
          </Text>
          {categoryPlaylists?.playlists && (
            <Flex flexWrap="wrap" gap="22px">
              {categoryPlaylists.playlists.items.map((playlist, index) => {
                return (
                  <BoxWrapper
                    imageUrl={playlist.images[0]?.url}
                    key={index}
                    roundedImage={false}
                    route={`/playlist/${playlist.id}`}
                  >
                    <Box>
                      <Text color="white" fontSize="sm" marginBottom="7px">
                        {playlist.name}
                      </Text>
                      <Text maxW="200px" className="break" color="gray.500">
                        {playlist.description}
                      </Text>
                    </Box>
                  </BoxWrapper>
                )
              })}
            </Flex>
          )}
        </Box>
      </Box>
    </>
  )
}
export default Genre
