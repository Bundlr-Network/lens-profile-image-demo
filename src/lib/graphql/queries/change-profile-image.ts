import { gql } from "@apollo/client"

const CHANGE_PROFILE_IMAGE_MUTATION = gql`
mutation CreateSetProfileImageURITypedData($ProfileId:  ProfileId!, $Url:  Url!) {
  createSetProfileImageURITypedData(request: {
    profileId: $ProfileId,
    url: $Url
  }) {
    id
    expiresAt
    typedData {
      types {
        SetProfileImageURIWithSig {
          name
          type
        }
      }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        imageURI
        profileId
      }
    }
  }
}
`

export default CHANGE_PROFILE_IMAGE_MUTATION