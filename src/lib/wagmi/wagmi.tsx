import {
  WagmiConfig,
  chain,
  configureChains,
  createClient,
} from 'wagmi'

import { InjectedConnector, } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygon],
  [publicProvider()],
)

const wagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [new MetaMaskConnector({ chains })],
});

const Wrapper = ({ children }: {
  children: React.ReactElement
}) => {
  return (
    <WagmiConfig client={wagmiClient}>
      {children}
    </WagmiConfig>
  )
}

export default Wrapper