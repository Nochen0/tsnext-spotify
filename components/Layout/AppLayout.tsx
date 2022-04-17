import { Box } from "@chakra-ui/layout"
import Sidebar from "../Sidebar/Sidebar"
import { useSession } from "next-auth/react"
import Login from "../Login/Login"
import PlayerBar from "../Player/PlayerBar"
import Head from "next/head"
import { useState } from "react"
import Header from "../Header/Header"

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession()
  const [showPopup, setShowPopup] = useState(false)

  if (status === "unauthenticated") return <Login />

  return (
    <>
      <Head>
        <link
          rel="icon"
          href="https://open.scdn.co/cdn/images/favicon32.8e66b099.png"
        />
      </Head>
      <Box width="100vw" height="100vh" position="relative">
        <Header showPopup={showPopup} setShowPopup={setShowPopup} />
        <Box
          position="fixed"
          top="0"
          width="260px"
          left="0"
          height="calc(100vh - 92px)"
          onClick={() => setShowPopup(false)}
        >
          <Sidebar />
        </Box>
        <Box
          marginLeft="260px"
          marginBottom="92px"
          height="calc(100vh - 92px)"
          onClick={() => setShowPopup(false)}
        >
          {children}
        </Box>
        <Box position="fixed" bottom="0" left="0" right="0" height="92px">
          <PlayerBar />
        </Box>
      </Box>
    </>
  )
}

export default AppLayout
