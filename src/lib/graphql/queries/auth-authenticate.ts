import { gql } from "@apollo/client";

const AUTH_AUTHENTICATE_MUTATION = gql`
mutation SignedAuthChallenge($address: EthereumAddress!, $signature: Signature!) {
  authenticate(request: {
    address: $address,
    signature: $signature
  }) {
    accessToken
    refreshToken
  }
}
`

export default AUTH_AUTHENTICATE_MUTATION