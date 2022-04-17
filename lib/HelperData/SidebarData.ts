import {
  MdFavorite,
  MdFavoriteBorder,
  MdLibraryMusic,
  MdOutlineLibraryMusic,
  MdCreate,
  MdOutlineCreate,
} from "react-icons/md"
import { AiFillHome, AiOutlineHome } from "react-icons/ai"
import { RiSearchLine, RiSearchFill } from "react-icons/ri"

export const navMenuData = [
  {
    title: "Home",
    icons: [AiFillHome, AiOutlineHome],
    route: "/",
  },
  {
    title: "Search",
    icons: [RiSearchFill, RiSearchLine],
    route: "/search",
  },
  {
    title: "Your Library",
    icons: [MdLibraryMusic, MdOutlineLibraryMusic],
    route: "/collection/playlists",
  },
]

export const musicMenuData = [
  {
    title: "Liked Songs",
    icons: [MdFavorite, MdFavoriteBorder],
    route: "/collection/tracks",
  },
]
