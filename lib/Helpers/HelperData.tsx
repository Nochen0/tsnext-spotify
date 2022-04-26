import { RiSearchFill, RiSearchLine } from "react-icons/ri";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import {
  MdLibraryMusic,
  MdOutlineLibraryMusic,
  MdFavorite,
  MdFavoriteBorder,
} from "react-icons/md";

export const navMenuData = [
  {
    title: "Home",
    icons: [AiOutlineHome, AiFillHome],
    route: "/",
  },
  {
    title: "Search",
    icons: [RiSearchLine, RiSearchFill],
    route: "/search",
  },
  {
    title: "Your Library",
    icons: [MdOutlineLibraryMusic, MdLibraryMusic],
    route: "/collection/playlists",
  },
];

export const musicMenuData = [
  {
    title: "Liked Songs",
    icons: [MdFavoriteBorder, MdFavorite],
    route: "/collection/tracks",
  },
];