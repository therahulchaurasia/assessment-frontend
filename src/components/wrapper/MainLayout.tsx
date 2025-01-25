import { CardProps, Flex, FlexProps } from "@chakra-ui/react"
import React from "react"
import MyContainer from "./MyContainer"
import Header from "../layout/Header"
import useAuth from "@/hooks/useAuth"

type Props = {
  children: React.ReactNode
  containerProps?: FlexProps
  cardProps?: CardProps
}

export default function MainLayout({
  children,
  containerProps,
  cardProps,
}: Props) {
  const { isAuth } = useAuth()
  console.log(isAuth)
  return (
    <Flex minHeight="100vh" minW={"100%"} direction={"column"}>
      <Header />
      <MyContainer
        as="main"
        flex={1}
        display={"flex"}
        flexDirection={"column"}
        maxW="7xl"
        mx="auto"
        px={{ base: 4, sm: 6, lg: 8 }}
        mt={4}
        mb={{ base: 0, md: 4 }}
        {...containerProps}
      >
        <Flex flex={1} display={"flex"} flexDirection={"column"} {...cardProps}>
          {children}
        </Flex>
      </MyContainer>
    </Flex>
  )
}
