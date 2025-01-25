import { extendTheme } from "@chakra-ui/react"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["cyrillic"],
})

const fonts = {
  heading: inter.style.fontFamily,
  body: inter.style.fontFamily,
}

const components = {
  Heading: {
    variants: {
      hero: {
        fontSize: ["4xl", "5xl", "6xl"],
        fontWeight: "extrabold",
      },
      h1: {
        fontSize: ["4xl", "5xl", "5xl"],
      },
      h2: {
        fontSize: ["3xl", "4xl", "4xl"],
      },
      h3: {
        fontSize: ["2xl", "3xl", "3xl"],
      },
      h4: {
        fontSize: ["xl", "2xl", "2xl"],
      },
      h5: {
        fontSize: ["lg", "xl", "xl"],
      },
    },
  },

  FormLabel: {
    baseStyle: {
      fontSize: "sm",
      marginBottom: 2,
    },
  },
  Button: {
    variants: {
      solid: {
        bg: "black",
        color: "white",
        _hover: {
          bg: "gray.700",
        },
        _loading: {
          _hover: {
            bg: "gray.700",
          },
          bg: "gray.700",
        },
      },
    },
  },
}

export const theme = extendTheme({
  components,
  fonts,
})
