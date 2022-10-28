import { Box, Input, InputGroup, Text } from '@chakra-ui/react'
import { Dispatch, useEffect, useRef, useState } from 'react'

import { BiErrorCircle } from 'react-icons/bi'
import { BsCheckCircle } from 'react-icons/bs'
import { Spinner } from '@chakra-ui/react'
import { WebBundlr } from '@bundlr-network/client'
import { providers } from 'ethers'
import toast from 'react-hot-toast'

enum Status {
  Idle,
  Loading,
  Success,
  Error
}

const FilePicker = ({
  setProfileImageUrl
}: {
  setProfileImageUrl: Dispatch<string>
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const handleClick = () => inputRef.current?.click()
  const [status, setStatus] = useState(Status.Idle)

  const TOAST_ERROR_STYLES = {
    background: '#FED7D7',
    color: 'black',
    borderRadius: '10px',
    fontSize: '16px',
    textAlign: 'center',
    fontWeight: 600,
    lineHeight: '20px'
  }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(Status.Loading)
    try {
      const file = e.target.files?.[0]

      // file buffer readable stream
      const buffer = await file?.arrayBuffer()

      // file buffer
      const fileBuffer = Buffer.from(buffer as ArrayBuffer)

      // @ts-ignore
      await window.ethereum.enable()

      // @ts-ignore
      const provider = new providers.Web3Provider(window.ethereum)

      const bundlr = new WebBundlr(
        'https://node2.bundlr.network',
        'matic',
        provider
      )

      await bundlr.ready()

      const res = await bundlr.uploader.upload(fileBuffer, {
        tags: [{ name: 'Content-Type', value: 'image/png' }]
      })

      if (!res.data.id) {
        return toast.error("Couldn't upload your file. Please try again.", {
          style: TOAST_ERROR_STYLES as any
        })
      }

      setProfileImageUrl(`https://arweave.net/${res.data.id}`)

      setStatus(Status.Success)
    } catch (error) {
      toast.error((error as any).message, {
        style: TOAST_ERROR_STYLES as any
      })

      setStatus(Status.Error)
    }
  }

  return (
    <>
      <InputGroup
        onClick={handleClick}
        display="flex"
        alignItems={'center'}
        justifyContent="center"
        cursor={'pointer'}
      >
        <input
          type={'file'}
          multiple={false}
          hidden
          accept={'image/*'}
          onChange={handleFile}
          ref={(e) => (inputRef.current = e)}
        />
        <Box
          py={'7'}
          border="dashed"
          width={'full'}
          textAlign={'center'}
          borderWidth={2}
          borderColor={
            status === Status.Error
              ? 'red.500'
              : status === Status.Success
                ? 'green.500'
                : 'gray.300'
          }
          display="flex"
          alignItems={'center'}
          gap={4}
          justifyContent="center"
        >
          {status === Status.Loading && (
            <Box display={'flex'} gap={4} textColor="gray.400">
              <Spinner color="gray.400" /> Uploading file
            </Box>
          )}
          {status === Status.Idle && (
            <Text textColor="gray.400">Click to select a file</Text>
          )}
          {status === Status.Success && (
            <Box
              display={'flex'}
              gap={2}
              textColor="green.500"
              alignItems={'center'}
            >
              <BsCheckCircle /> File uploaded successfully.
            </Box>
          )}
          {status === Status.Error && (
            <Box
              display={'flex'}
              gap={2}
              textColor="red.600"
              alignItems={'center'}
            >
              <BiErrorCircle />
              Oops, something went wrong, try again!
            </Box>
          )}
        </Box>
      </InputGroup>
    </>
  )
}

export default FilePicker
