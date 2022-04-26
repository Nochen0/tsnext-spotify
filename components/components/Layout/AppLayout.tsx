import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Login from "../Login/Login";
import AppLoading from "./AppLoading";
import Sidebar from "../Sidebar/Sidebar";
import PlayerBar from "../Player/PlayerBar";
import Header from "../Header/Header";
import { AppHeading } from "../../lib/Helpers/HelperData";
import Head from "next/head";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { status, data: session } = useSession();
  const [showPopup, setShowPopup] = useState(false);

  const handleAppClick = () => {
    if (showPopup) {
      setShowPopup(false);
    }
  };

  if (status === "loading") return <AppLoading />;

  if (status === "unauthenticated" || !session) return <Login />;

  return (
    <>
      <Head>
        <link rel="icon" href="https://open.scdn.co/cdn/images/favicon32.8e66b099.png" />
      </Head>
      <Box onClick={handleAppClick}>
        <Header showPopup={showPopup} setShowPopup={setShowPopup} />
        <Box
          position="fixed"
          left="0"
          top="0"
          bottom="92px"
          w="250px"
          bg="black"
          paddingX="20px"
          paddingTop="12px"
        >
          <Sidebar />
        </Box>
        <Box marginLeft="250px" marginBottom="92px">
          {children}
        </Box>
        <Box position="fixed" left="0" right="0" bottom="0" h="92px" bg="#181818">
          <PlayerBar />
        </Box>
      </Box>
    </>
  );
};

export default AppLayout;
