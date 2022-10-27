import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'
import { SVGProps, useEffect, useState } from 'react'
import { useAccount, useConnect } from 'wagmi'

import AUTH_AUTHENTICATE_MUTATION from '@/lib/graphql/queries/auth-authenticate'
import AUTH_CHALLENGE_QUERY from '@/lib/graphql/queries/auth-challenge'
import { Authentication } from '@/lib/graphql/types/authentication'
import { BiUser } from 'react-icons/bi'
import CHANGE_PROFILE_IMAGE_MUTATION from '@/lib/graphql/queries/change-profile-image'
import { FaRegUserCircle } from 'react-icons/fa'
import GET_PROFILE_QUERY from '@/lib/graphql/queries/get-profile'
import { GetServerSideProps } from 'next'
import { Profile } from '@/lib/graphql/types/profile'
import client from '@/lib/graphql'
import toast from 'react-hot-toast'
import { useSignMessage } from 'wagmi'

const BundlrIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={36}
    height={42}
    viewBox="0 0 36 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M33.0291 7.29544C32.0881 6.72879 31.0111 6.42763 29.9127 6.42392C29.7353 6.42392 29.5529 6.42392 29.3755 6.42392C28.5608 6.50529 27.7695 6.74269 27.0445 7.12318L23.8166 8.87636L22.2964 9.69218L11.3154 15.57C10.3451 16.0864 9.53385 16.8574 8.96871 17.8001C8.40358 18.7428 8.10596 19.8217 8.1078 20.9208V26.226L12.1617 24.0573V20.9208C12.1626 20.556 12.2619 20.1983 12.4492 19.8852C12.6365 19.5722 12.9048 19.3155 13.2258 19.1422L22.2964 14.288L23.8166 13.4773L27.8705 11.3085L28.96 10.7259C29.0954 10.6499 29.2402 10.5919 29.3907 10.5536C29.5549 10.503 29.7257 10.4774 29.8975 10.4776C30.2654 10.4809 30.6257 10.5823 30.9413 10.7714C31.2416 10.9483 31.4901 11.2012 31.6617 11.5044C31.8334 11.8077 31.9222 12.1508 31.9193 12.4993V23.9104C31.9184 24.2751 31.8191 24.6329 31.6318 24.9459C31.4445 25.259 31.1762 25.5156 30.8552 25.6889L12.1617 35.6963V32.1038L8.1078 34.2522V38.8633C8.10756 39.234 8.20348 39.5984 8.38619 39.921C8.56889 40.2435 8.83213 40.5132 9.1502 40.7036C9.46828 40.894 9.83031 40.9987 10.2009 41.0074C10.5715 41.0161 10.9381 40.9286 11.2648 40.7533L32.7707 29.2409C33.7383 28.7265 34.5479 27.9589 35.1129 27.0199C35.6779 26.081 35.977 25.0062 35.9783 23.9104V12.4993C35.9829 11.4502 35.7131 10.418 35.1958 9.5052C34.6785 8.5924 33.9316 7.83062 33.0291 7.29544Z"
      fill="url(#paint0_linear_27_1774)"
    />
    <path
      d="M23.8166 15.2002V18.3367C23.8157 18.7015 23.7164 19.0593 23.5291 19.3723C23.3418 19.6853 23.0735 19.942 22.7525 20.1153L13.6819 24.9695L12.1617 25.7853L8.10782 27.954L6.58761 28.7647L4.05393 30.1227V15.3472C4.05484 14.9824 4.15419 14.6246 4.34148 14.3116C4.52877 13.9986 4.79707 13.7419 5.11808 13.5686L20.8269 5.15222C21.1151 4.99126 21.4393 4.90585 21.7694 4.90394C22.1373 4.90728 22.4977 5.00871 22.8133 5.19781C23.1136 5.37471 23.362 5.62752 23.5337 5.93081C23.7054 6.2341 23.7942 6.57721 23.7913 6.9257V7.15372L26.2996 5.81094C26.7194 5.58735 27.1587 5.4025 27.6121 5.25864C27.1971 3.77078 26.2242 2.50029 24.896 1.71169C23.9979 1.16738 22.9731 0.867436 21.9233 0.841658C20.8734 0.815881 19.8351 1.06514 18.9114 1.56473L3.20262 9.98619C2.23174 10.5041 1.42049 11.277 0.856181 12.2216C0.291873 13.1662 -0.00413018 14.2468 4.35348e-05 15.3472V33.3099C-0.000191554 33.6806 0.0957277 34.045 0.278433 34.3676C0.461138 34.6901 0.724377 34.9598 1.04245 35.1502C1.36052 35.3407 1.72255 35.4453 2.09318 35.4541C2.4638 35.4628 2.83035 35.3752 3.15702 35.1999L6.58761 33.3657L8.10782 32.5499L12.1617 30.3811L13.6819 29.5654L24.6629 23.6876C25.6336 23.1716 26.4452 22.4007 27.0103 21.4579C27.5755 20.515 27.8729 19.436 27.8705 18.3367V13.0315L23.8166 15.2002Z"
      fill="url(#paint1_linear_27_1774)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_27_1774"
        x1="22.0431"
        y1="6.42392"
        x2="22.0431"
        y2="41.008"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="black" />
        <stop offset={1} stopColor="black" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_27_1774"
        x1="13.9353"
        y1="0.839844"
        x2="13.9353"
        y2="35.4546"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="black" />
        <stop offset={1} stopColor="black" />
      </linearGradient>
    </defs>
  </svg>
)

const useHome = () => {
  const toastErrorStyles = {
    background: '#FED7D7',
    color: 'black',
    borderRadius: '10px',
    fontSize: '16px',
    textAlign: 'center',
    fontWeight: 600,
    lineHeight: '20px'
  }

  const [accountData, setAccountData] = useState<Profile['data'] | null>(null)
  const [userName, setUserName] = useState('Dejen.lens')
  const [authSecrets, setAuthSecrets] = useState<Authentication['data'] | null>(
    null
  )
  const [profileImageUrl, setProfileImageUrl] = useState<string>('')

  const { connect, connectors, isError } = useConnect()
  const { address, isConnected } = useAccount()
  const { data: signedMessage, signMessage } = useSignMessage()

  const fetchAccountData = async () => {
    try {
      const response = await client.query({
        query: GET_PROFILE_QUERY,
        variables: {
          handle: userName
        }
      })

      setAccountData(response.data)
    } catch (error) {
      toast.error(
        "Couldn't fetch account data, verify the Handler and try again.",
        {
          style: toastErrorStyles as any
        }
      )
    }
  }

  const changePicture = async () => {
    try {
      if (!isConnected) {
        await connect({ connector: connectors[0] })
      }

      if (signedMessage) return changePictureRequest()

      // login
      const loginResponse = await client.query({
        query: AUTH_CHALLENGE_QUERY,
        variables: {
          address
        }
      })

      if (!loginResponse.data.challenge) {
        throw new Error('No challenge')
      }

      signMessage({ message: loginResponse.data.challenge.text })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!signedMessage || !address) return

    // mutation
    const authenticate = async () => {
      try {
        const response = await client.mutate({
          mutation: AUTH_AUTHENTICATE_MUTATION,
          variables: {
            address,
            signature: signedMessage
          }
        })

        if (!response.data.authenticate) {
        }

        setAuthSecrets(response.data)
      } catch (e) {
        toast.error(
          'Something went wrong with your authentication, please refresh the page and try again.',
          {
            style: toastErrorStyles as any
          }
        )
      }
    }

    authenticate()
  }, [signedMessage, address])

  useEffect(() => {
    if (!isError) return

    toast.error('Please verify if Metamask is accessible in your browser.', {
      style: {
        background: '#FED7D7',
        color: 'black',
        borderRadius: '10px',
        fontSize: '16px',
        textAlign: 'center',
        fontWeight: 600,
        lineHeight: '20px'
      }
    })
  }, [isError])

  const changePictureRequest = async () => {
    try {
      await client.mutate({
        mutation: CHANGE_PROFILE_IMAGE_MUTATION,
        variables: {
          ProfileId: accountData?.profile.id,
          Url: profileImageUrl
        },
        context: {
          headers: {
            authorization: `Bearer ${authSecrets?.authenticate?.accessToken}`
          }
        }
      })
    } catch (error) {
      toast.error(
        `Request failed with the following error: ${(error as any).message}.`,
        {
          style: {
            background: '#FED7D7',
            color: 'black',
            borderRadius: '10px',
            fontSize: '16px',
            textAlign: 'center',
            fontWeight: 600,
            lineHeight: '20px'
          }
        }
      )
    }
  }

  useEffect(() => {
    if (!authSecrets || !address || !profileImageUrl) return

    changePictureRequest()
  }, [authSecrets])

  return {
    setUserName,
    accountData,
    fetchAccountData,
    changePicture,
    setProfileImageUrl
  }
}

const HomeWrapper = (props: any) => {
  const {
    setUserName,
    accountData,
    fetchAccountData,
    changePicture,
    setProfileImageUrl
  } = useHome()

  return (
    <Box
      bg="linear-gradient(180deg,#c7e2e4,#e1def1)"
      height={'100vh'}
      position="relative"
    >
      <Flex pt={6} ml={6} gap={4} alignItems={'center'}>
        <Icon as={BundlrIcon} h={12} w={12} />
        <Text fontSize={22} fontWeight="extrabold">
          Lens picture Demo
        </Text>
      </Flex>
      <Container maxW={'container.sm'} mt={40}>
        <VStack gap={2} shadow="lg" p={4} bg="white" rounded={'md'}>
          {!accountData?.profile?.id && (
            <>
              <Stack spacing={4} width="full">
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <BiUser />
                  </InputLeftElement>
                  <Input
                    type="tel"
                    placeholder="Account Handle"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </InputGroup>
              </Stack>
              <Button onClick={fetchAccountData} width="full">
                Fetch informations
              </Button>
            </>
          )}
          {accountData?.profile?.id && (
            <>
              <HStack
                gap={4}
                background="gray.100"
                width={'full'}
                rounded="lg"
                p={10}
              >
                <Avatar
                  size="xl"
                  src={accountData?.profile?.picture?.original?.url}
                />
                <VStack alignItems={'flex-start'}>
                  <Text fontWeight={'bold'} fontSize="xl">
                    {accountData?.profile?.name || 'Anonymous'}
                    <Text fontSize={'xs'} fontWeight="light">
                      @{accountData?.profile?.handle}
                    </Text>
                  </Text>
                  <Text fontWeight={'light'} fontStyle="italic">
                    {accountData?.profile?.bio || 'No bio provided.'}
                  </Text>
                </VStack>
              </HStack>
              <Stack spacing={4} width="full">
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FaRegUserCircle />
                  </InputLeftElement>
                  <Input
                    type="tel"
                    placeholder="https://5hcdoh..."
                    onChange={(e) => setProfileImageUrl(e.target.value)}
                  />
                </InputGroup>
              </Stack>
              <Button onClick={changePicture} width="full">
                Change profile picture
              </Button>
            </>
          )}
        </VStack>
      </Container>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}
  }
}

export default HomeWrapper
