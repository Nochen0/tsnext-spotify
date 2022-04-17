import { Box } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"

type Props = {
  children: React.ReactNode
  imageUrl: string
  roundedImage: boolean
  route?: string
  width?: number
  height?: number
  paddingBottom?: number
  external?: boolean
}

const BoxWrapper: React.FC<Props> = ({
  children,
  imageUrl,
  roundedImage,
  route,
  width,
  height,
  paddingBottom,
  external,
}) => {
  const router = useRouter()

  const handleBoxClick = () => {
    if (route) {
      router.push(route)
    }
  }

  return (
    <Box
      bg="#181818"
      padding="12px"
      borderRadius="6px"
      width={width ? width : 195}
      position="relative"
      height={
        paddingBottom
          ? height
            ? height + 10 - paddingBottom
            : 260
          : height
          ? height + 10
          : 260
      }
      transitionDuration="400ms"
      _hover={{ background: "rgba(255, 255, 255, .1)" }}
      className="break"
      cursor="pointer"
      onClick={handleBoxClick}
    >
      <Image
        alt="Image"
        src={imageUrl}
        width={!external && width ? width : 170}
        height={!external && height ? height - 50 : 170}
        style={
          roundedImage
            ? { borderRadius: "50%", marginBottom: "15px" }
            : { borderRadius: "6px", marginBottom: "15px" }
        }
      />
      <Box paddingX={roundedImage ? "10px" : "0px"}>{children}</Box>
    </Box>
  )
}
export default BoxWrapper
