import {
  List,
  ListItem,
  Link as ChakraLink,
  ListIcon,
  Flex,
} from "@chakra-ui/layout"
import Link from "next/link"
import { navMenuData } from "../../lib/HelperData/SidebarData"
import { useRouter } from "next/router"

const NavMenu = () => {
  const router = useRouter()

  const NavMenuElements = navMenuData.map((element, index) => {
    const isActive = router.asPath === element.route

    return (
      <ListItem key={index}>
        <Link href={element.route} passHref>
          <ChakraLink
            _focus={{ boxShadow: "0px" }}
            transitionDuration="300ms"
            color={isActive ? "white" : "gray.400"}
            _hover={{ textDecoration: "none", color: "white" }}
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

  return (
    <List spacing={3} marginBottom="28px">
      {NavMenuElements}
    </List>
  )
}
export default NavMenu
