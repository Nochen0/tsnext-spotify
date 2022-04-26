import { Box, Flex, Image, Text, useMediaQuery } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React, { Dispatch, SetStateAction } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import HeaderPopup from "./HeaderPopup";

type Props = {
  showPopup: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
};

const Header: React.FC<Props> = ({ showPopup, setShowPopup }) => {
  const { data: session } = useSession();
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

  return (
    <Box
      position="fixed"
      height="32px"
      right="24px"
      top="20px"
      cursor="pointer"
      bg={showPopup ? "#242424" : "#121212"}
      rounded="20px"
      p="1px"
      zIndex="200"
      onClick={() => setShowPopup((prevState) => !prevState)}
    >
      {session?.user?.image && (
        <Flex align="center" gap="10px" color="white">
          <Image
            alt=""
            src={session?.user?.image ? session.user.image : undefined}
            height="32px"
            width="32px"
            borderRadius="50%"
            overflow="hidden"
            objectFit="cover"
            draggable={false}
          />
          {isLargerThan1280 && (
            <>
              <Text className="unselectable">{session?.user?.name}</Text>
              <Box marginLeft="-7px" marginRight="3px">
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
      {showPopup && <HeaderPopup />}
    </Box>
  );
};

export default Header;
