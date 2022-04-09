import { Container, Flex, Stack } from '@chakra-ui/react';
import Header from './Header';

export function Layout({ children, value = 0 }){
  return(
    <Container
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