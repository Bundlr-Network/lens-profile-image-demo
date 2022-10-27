import { gql } from '@apollo/client'

const AUTH_CHALLENGE_QUERY = gql`
  query Challenge($address: EthereumAddress!) {
    challenge(request: { address: $address }) {
      text
    }
  }
`

export default AUTH_CHALLENGE_QUERY
