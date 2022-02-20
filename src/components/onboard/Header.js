import { Box, Heading, Flex, Text, Button, Progress } from '@chakra-ui/react';
import Logo from 'components/logo';
import { useEffect, useState } from 'react';
const Header = (props) => {
	// const [zero, setZero]=useState(false);
	// useEffect(()=>{
	//   if(props.value===0){
	//     setZero(true);
	//   }
	//   else{
	//     setZero(false);
	//   }
	// })
	return (
		<Flex
			as='nav'
			align='center'
			justify='space-between'
			padding='16px'
			paddingBottom='3rem'
			// border={2}
			// borderWidth={2}
			// borderColor='gray'
		>
			{/* <Flex as="logo">
            <Logo />
          </Flex> */}
			<Flex align='center' mr={5}>
				<Heading as='h1' size='lg' color='#D7354A' letterSpacing={'-.1rem'}>
					Candid
				</Heading>
			</Flex>
			{/* <Flex style={{ display: zero ? 'block' : 'none' }}> */}
			<Progress
				value={props.value}
				colorScheme='red'
				size={'sm'}
				align='left'
				width={100}
				borderRadius={50}
			/>
			{/* </Flex> */}
		</Flex>
	);
};

export default Header;
