import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import { Component } from 'react'
import NextNProgress from 'nextjs-progressbar'
import { WagmiConfig } from 'wagmi'
import WagmiWrapper from '@/lib/wagmi/wagmi'
import client from '@/lib/graphql'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiWrapper>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <NextNProgress color="#000" height={6} key="progress-bar" />
          <Component {...pageProps} />
        </ChakraProvider>
      </ApolloProvider>
    </WagmiWrapper >
  )
}

export default App
