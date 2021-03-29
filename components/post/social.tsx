import {
  Box,
  Text,
  HStack,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useClipboard,
} from '@chakra-ui/react'
import { FaLink, FaTwitter, FaFacebook } from 'react-icons/fa'
import { TwitterShareButton, FacebookShareButton } from 'react-share'

type Props = {
  url: string
  title: string
}

export function PostSocial({ url, title }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { onCopy } = useClipboard(url)

  return (
    <Box my="2vh">
      <Button size="sm" onClick={onOpen}>
        分享文章
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>分享該文章</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="1em">
              可以透過複製連結或是轉至 twitter或 facebook平台
            </Text>
            <HStack as="aside" mb="1rem" spacing="1rem" fontSize="1.25em">
              <IconButton
                variant="unstyle"
                size="sm"
                aria-label="copy link"
                fontSize="20px"
                icon={<FaLink style={{ margin: '0 auto' }} />}
                onClick={onCopy}
              />
              <TwitterShareButton
                url={url}
                title={title}
                via="senlima4"
                style={{ marginRight: '11px' }}
              >
                <FaTwitter />
              </TwitterShareButton>
              <FacebookShareButton url={url}>
                <FaFacebook />
              </FacebookShareButton>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
