import { Container, ContainerProps } from "@chakra-ui/react"
interface Props extends Omit<ContainerProps, "children"> {
  children: React.ReactNode
  as?: React.ElementType // Allow specifying a different components type
}

export default function MyContainer({ children, ...props }: Props) {
  return (
    <Container
      px={{ base: 2, md: 4 }}
      width={"100%"}
      maxW={{
        lg: "container.xl",
        xl: "1400px",
      }}
      mx={"auto"}
      {...props}
    >
      {children}
    </Container>
  )
}
