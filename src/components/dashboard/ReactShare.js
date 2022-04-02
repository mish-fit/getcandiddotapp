import React, { useEffect, useState } from 'react'
import {
  Flex,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import {
  EmailIcon,
  EmailShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon, 
  TwitterIcon, 
  WhatsappIcon
} from "react-share";
import { FaKaaba, FaShareAlt } from 'react-icons/fa';
import { borderColor } from 'polished';

export const ReactShare = ({ title, url, description, hashtags, openProp }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ opened, setOpened ] = useState(openProp)
  useEffect(()=>{
    if(opened){
      setOpened(!opened)
      onClose()
    }else{
      onOpen()
      setOpened(!opened)
    }
  },[openProp])
  return (
    <>
    {/* <Button onClick={onOpen}>Share</Button> */}
      <Modal isOpen={isOpen} onClose={()=>{
        setOpened(!opened);
        onClose()
      }} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share on socials!</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
          <Flex justifyContent={"space-evenly"}>
            <WhatsappShareButton
              title={title}
              separator=": "
              url={url}
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <FacebookShareButton
              quote={title}
              url={url}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TelegramShareButton
              quote={title}
              url={url}
            >
              <TelegramIcon size={32} round />
            </TelegramShareButton>
            <TwitterShareButton
              title={title}
              url={url}
              hashtags={hashtags}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton
              title={title}
              url={url}
              summary={description}
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            <EmailShareButton
              subject={title}
              url={url}
              body={description}
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
          </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={()=>{
              setOpened(!opened);
              onClose()
            }}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
  )
}
