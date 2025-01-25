import { Container, Flex } from "@chakra-ui/react"

type Props = {
  children: React.ReactNode
}
export default function AuthLayout({ children }: Props) {
  return (
    <Flex
      minHeight="100vh"
      height={"full"}
      overflowX={"hidden"} // If you remove the overflow then the header will become sticky
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Container bg={"white"} p={"6"} borderRadius={"lg"}>
        {children}
      </Container>
    </Flex>
  )
}
