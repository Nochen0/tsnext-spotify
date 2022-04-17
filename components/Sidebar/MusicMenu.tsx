import {
  ListItem,
  Link as ChakraLink,
  Flex,
  ListIcon,
  List,
} from "@chakra-ui/layout"
import Link from "next/link"
import { useRouter } from "next/router"
import { musicMenuData } from "../../lib/HelperData/SidebarData"

const MusicMenu = () => {
  const router = useRouter()

  const MusicMenuElements = musicMenuData.map((element, index) => {
    const isActive = router.asPath === element.route

    return (
      <ListItem key={index}>
        <Link href={element.route} passHref>
          <ChakraLink
            _focus={{ boxShadow: "0px" }}
            color={isActive ? "white" : "gray.400"}
            _hover={{ textDecoration: "none", color: "white" }}
            transitionDuration="300ms"
          >
            <Flex align="center" gap="6px">
              <ListIcon
                as={isActive ? element.icons[0] : element.icons[1]}
                fontSize="28px"
              />
              <span>{element.title}</span>
            </Flex>
          </ChakraLink>
        </Link>
      </ListItem>
    )
  })

  return <List spacing={3}>{MusicMenuElements}</List>
}
export default MusicMenu
