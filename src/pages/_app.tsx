import AuthWrapper from "@/components/wrapper/AuthWrapper"
import { theme } from "@/styles/theme"
import { ChakraProvider } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      </ChakraProvider>
    </QueryClientProvider>
  )
}
