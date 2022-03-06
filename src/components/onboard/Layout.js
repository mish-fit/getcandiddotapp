import {
	Flex,
	Text,
	Input,
	Button,
	Container,
	Heading,
	Stack,
	Center,
	InputGroup,
	InputLeftAddon,
	useToast,
} from '@chakra-ui/react';
import '@fontsource/poppins';
import Header from './Header';
export function Layout({ children, value = 0 }){
  return(
    <Container
			fontFamily={'Poppins'}
			maxW={'container.md'}
			p={0}
      h='100vh'
			align='center'
		>
			<Header value={value}/>
			<Flex display={{ md: 'flex' }} >
				<Stack
					align={{ base: 'center', md: 'stretch' }}
					textAlign={{ base: 'left', md: 'left' }}
					// margin={6}
				>
        {children}
        </Stack>
      </Flex>
    </Container>
  )
}