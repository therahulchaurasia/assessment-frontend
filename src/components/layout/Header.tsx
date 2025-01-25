import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useDisclosure,
  VStack,
  IconButton,
} from "@chakra-ui/react"
import { IoMdCloseCircle } from "react-icons/io"
import { IoMenu } from "react-icons/io5"
import useAuth from "@/hooks/useAuth"

export default function Header() {
  const { logoutFn } = useAuth()
  const pathname = usePathname()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const navLinks = [
    { label: "Task", href: "/task" },
    { label: "Feed", href: "/feed" },
  ]

  return (
    <Box as="header" bg="white" shadow="sm">
      <Box maxW="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }}>
        <Flex justify="space-between" align="center" h="16">
          {/* Left side: App name */}
          <Text
            as={Link}
            href="/"
            fontSize="xl"
            fontWeight="bold"
            color="gray.900"
          >
            mylittleapp
          </Text>

          {/* Center: Navigation links */}
          <HStack as="nav" spacing={8} display={{ base: "none", md: "flex" }}>
            {navLinks.map((link) => (
              <Box
                key={link.href}
                as={Link}
                href={link.href}
                px={3}
                py={2}
                rounded="md"
                fontSize="sm"
                fontWeight="medium"
                color={pathname === link.href ? "gray.900" : "gray.700"}
                bg={pathname === link.href ? "gray.100" : "transparent"}
                _hover={{ color: "gray.900", bg: "gray.50" }}
              >
                {link.label}
              </Box>
            ))}
          </HStack>

          {/* Right side: Logout button */}
          <Flex align="center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                logoutFn()
              }}
            >
              Logout
            </Button>
          </Flex>

          {/* Mobile menu button */}
          <Box display={{ base: "flex", md: "none" }}>
            <IconButton
              aria-label="Open menu"
              icon={isOpen ? <IoMdCloseCircle /> : <IoMenu />}
              variant="ghost"
              size="sm"
              onClick={isOpen ? onClose : onOpen}
            />
          </Box>
        </Flex>
      </Box>

      {/* Mobile menu */}
      {isOpen && (
        <Box display={{ md: "none" }} px={2} pt={2} pb={3}>
          <VStack spacing={1}>
            {navLinks.map((link) => (
              <Box
                key={link.href}
                as={Link}
                href={link.href}
                px={3}
                py={2}
                rounded="md"
                fontSize="base"
                fontWeight="medium"
                color={pathname === link.href ? "gray.900" : "gray.700"}
                bg={pathname === link.href ? "gray.100" : "transparent"}
                _hover={{ color: "gray.900", bg: "gray.50" }}
                w="full"
              >
                {link.label}
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  )
}
