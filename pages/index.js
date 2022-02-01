import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { Container,Flex, Box,VStack , HStack , Button , Input , Select , Heading, Text, SimpleGrid, FormControl , FormLabel ,AspectRatio ,useColorMode, useColorModeValue, Tabs, TabList, TabPanels, Tab, TabPanel, Spacer ,Modal,ModalOverlay, ModalContent, ModalHeader,ModalFooter,ModalBody, ModalCloseButton, useDisclosure} from '@chakra-ui/react'
import AddRecommendation from '../src/component/admin/AddRecommendation'
import PhoneScreen from '../src/component/admin/PhoneScreen'
import MobileAppDownloadCard from '../src/component/admin/MobileAppDownloadCard'
import GettingStartedCard from '../src/component/admin/GettingStartedCard'
import ShareCard from '../src/component/admin/ShareCard'
import UserNameShare from '../src/component/admin/UserNameShare'
import CurrentRecommendations from '../src/component/admin/CurrentRecommendations'
import { useRouter } from 'next/router'
import { language} from '../src/translation/admin'

export default function Home() {
  //state hooks
  const [activeAddReco,setActiveAddReco] = React.useState(false)

  //ref hooks
  const initialRef = React.useRef()
  const finalRef = React.useRef()

//other hooks
  const {toggleColorMode} = useColorMode()
  const bgColor = useColorModeValue("gray.50","gray.800")
  const { router,locale, locales, defaultLocale } = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure()
  

//props
  const tabprops = {w : "150px",borderColor : "gray.200",borderWidth : 1,}
  const selectedTabprops = {color: 'brand.700', fontWeight : 'bold', bg: 'brand.200' }
  const hoverTabprops = {bg: 'brand.100'}
  const addRecoButtonprops = {p:0, w:'full',h: 'full', colorScheme:"brand", variant:"primary"}

  const lang = language[locale]

//functions
  //1
  const funcAddReco = () => {
    setActiveAddReco(!activeAddReco)
  }
  //2
  const funcOnClickUserName = () => {
    console.log("user name click")
  }
  //3
  const funcOnClickShare = () => {
    console.log("Share click")
  }
 
  return (
      <Container maxW = "container.xl" p = {0} bg="brand.50" w="full" >
       <Tabs colorScheme={"brand"} >
        <Flex h='100vh' py={0} bg="brand.50" w='66%'>
          <VStack w='full' h='full' spacing={10} alignItems = 'flex-start' bg="brand.10" flex = {2}>
            <Flex w='full' bg="brand.50" direction = 'row' justify = 'space-between'>
                <Container maxW="container.lg" w= 'full'  bg='brand.50' h='50px' p={0}>
                <TabList w='full' h='50px' justify="center">
                  <Tab {...tabprops} _selected={{...selectedTabprops}} _hover={{...hoverTabprops}}>{lang.tabTitles.tab1}</Tab>
                  <Tab {...tabprops} _selected={{...selectedTabprops}} _hover={{...hoverTabprops}}>{lang.tabTitles.tab2}</Tab>
                  <Tab {...tabprops} _selected={{...selectedTabprops}} _hover={{...hoverTabprops}}>{lang.tabTitles.tab3}</Tab>
                </TabList>
                </Container>
            </Flex>
         
            <Flex w='full' justifyItems = 'space-between' mx={0} px='5%' bg="brand.50" direction = 'row'>
              <Container maxW="container.sm" w= '30%'  bg='brand.50' h='40px' />      
              <Spacer />       
              <Container maxW="container.sm" w= '30%' bg='brand.150' h='40px' p={0}>
                <Button {...addRecoButtonprops} onClick={onOpen}>{lang.addRecoButton}</Button>
              </Container>
            </Flex>

            {activeAddReco ? <Flex w='full' bg="brand.50" direction = 'row' mt={10} justify = 'space-between'>
                <Container maxW="container.lg" w= '90%'  bg='brand.150' h='150px'>
                  <AddRecommendation />
                </Container>
            </Flex> : null }

            <Flex w='full' bg="brand.50" direction = 'row' mt={10} justify = 'space-between'>
                <Container maxW="container.lg" w= '90%'  bg='brand.150' h='150px'>
                  <CurrentRecommendations />
                </Container>
            </Flex>

            <Flex w='full' direction="column" bg="brand.50">
              <Flex w='full' bg="brand.50" direction = 'row' mt={10} justify = 'space-between'>
                <Container maxW="container.lg" w= '40%'  bg='brand.150' h='200px'>
                  <GettingStartedCard />
                </Container>
                <Container maxW="container.lg" w= '40%' bg='brand.250' h='200px'>
                  <MobileAppDownloadCard />
                </Container>
              </Flex>
              <Flex w='full' bg="brand.50" direction = 'row' mt={10} justify = 'space-between'>
                <Container maxW="container.lg" w= '40%'  bg='brand.150' h='200px'>
                  <ShareCard />
                </Container>
              </Flex>
            </Flex>
          </VStack>
        </Flex>
      </Tabs>            
          
      <VStack w='34%' h='full' 
      spacing={10} alignItems = 'flex-start' 
      bg="brand.50" flex = {1} pos='fixed' zIndex = {100} 
      top = {0} bottom = {0} right = {0} 
      borderLeftWidth={1} borderLeftColor={"gray.300"}>
          <Flex w='full' bg="brand.50" direction = 'row' justify = 'space-between' 
            p={0} m={0}>
            <Container w='full'  bg='brand.50' h='60px' p={0} m={0}>
              <UserNameShare 
                link="https://www.getcandid.app/username" 
                onClickUserName = {funcOnClickUserName}
                onClickShare = {funcOnClickShare}
                />
            </Container>
          </Flex>
          <Flex bg="brand.50" flex={1} w='full' h='full' justify='center' alignItems = 'center'>
            <Box w = '200px' h='400px' bg="brand.100" borderColor = 'gray.400' borderWidth = {2} borderRadius = {32} >
              <Box w = '100%' h='100%' bg="brand.50" borderColor = 'black' borderWidth = {8} borderRadius = {30} p={2}>
                <PhoneScreen />
              </Box> 
            </Box> 
          </Flex>            
        </VStack>
        <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{language.addRecoButton[locale]}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Container>
   
  )
}
