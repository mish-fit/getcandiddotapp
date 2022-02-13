import {
	Input,
	Heading,
	Stack, Container,Flex,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Progress,
	Button,
} from '@chakra-ui/react';
import Header from './Header';
import { useState, useContext, useRef } from 'react';
import { UserContext } from '../../lib/UserDataProvider';
import "@fontsource/poppins";
const Step3 = (props) => {
	const ctx = useContext(UserContext);
	console.log(ctx.userData);
	console.log(ctx.userSignInInfo);
	const next = (e) => {
		e.preventDefault();
		if (ctx.userData.name === '') {
			ctx.setName(ctx.userSignInInfo.user.displayName);
			ctx.setMail(ctx.userSignInInfo.user.email);
		}
		props.nextStep();
	};

	const back = (e) => {
		e.preventDefault();
		props.prevStep();
	};

	return (
		<>
		<Container
			fontFamily={'Poppins'}
			maxW={'container.md'}
			p={0}
			align='center'
		>
		<Header value={75} />
		<Flex
			display={{ md: 'flex' }}
		>
		<Stack
		align={{ base: "center", md: "stretch" }}
		textAlign={{ base: "center", md: "left" }}
		mt={{ base: 4, md: 0 }}
		ml={{ md: 6 }}
		>
			<FormControl>
				<Heading size={'lg'} marginBottom="20px" >Select Profile Picture</Heading>
				<Input type='file' bg='white' w='200px' />
				<br />
				<Button 
				bg={'#D7354A'}
				_hover={{ bg: '#C23043' }}
				borderRadius={10}
				color='white'
				width={250}				
				height={50}
				fontSize={18}
				marginTop='10px' marginBottom='10px' type='submit'>
					Upload
				</Button>
				<br />
				<Button 
				bg={'#D7354A'}
				_hover={{ bg: '#C23043' }}
				borderRadius={10}
				color='white'
				marginRight='10px'
				width={120}				
				height={50}
				fontSize={18} onClick={back}>
					Back
				</Button>
				<Button
				bg={'#D7354A'}
				_hover={{ bg: '#C23043' }}
				borderRadius={10}
				color='white'
				width={120}				
				height={50}
				fontSize={18}
				onClick={next}>Next</Button>
			</FormControl>
			</Stack>
</Flex></Container>

		</>
	);
};
export default Step3;
