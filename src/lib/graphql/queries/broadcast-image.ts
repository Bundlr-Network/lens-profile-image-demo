import { gql } from "@apollo/client"

const BROADCAST_IMAGE_MUTATE = gql`
mutation Broadcast($request: BroadcastRequest!) {
  broadcast(request: $request) {
      ... on RelayerResult {
          txHash
  txId
      }
      ... on RelayError {
          reason
      }
  }
}
`

export default BROADCAST_IMAGE_MUTATE