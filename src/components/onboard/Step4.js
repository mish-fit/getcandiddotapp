import {
	Input,
	Heading,
	Stack, Container,Box,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Progress,
	Button,
} from '@chakra-ui/react';

import { useState, useContext, useRef } from 'react';
import { UserContext } from '../../lib/UserDataProvider';
import "@fontsource/poppins";
const Step4 = (props) => {
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
	<Container fontFamily={"Poppins"} maxW={'container.lg'} h={'100vh'} p={0} pt='10' align='center'>
	<Box
	p={10}
	bg='gray.50'
	display={{ md: "flex" }}
	maxWidth='26rem'
	borderWidth={2}
	margin={4}
>	<Stack
		align={{ base: "center", md: "stretch" }}
		textAlign={{ base: "center", md: "left" }}
		mt={{ base: 4, md: 0 }}
		ml={{ md: 6 }}
	>
			<Progress value={60} size={'sm'} width={100} borderRadius={50}/>
			<FormControl>
				<Heading size={'lg'} marginBottom="20px" >Select Profile Picture</Heading>
				<Input type='file' bg='white' w='200px' />
				<br />
				<Button 
				borderRadius={50}
				color='white' bg={'#ff5151'} _hover={{ bg: '#D7354A' }} marginTop='10px' marginBottom='10px' type='submit'>
					Upload
				</Button>
				<br />
				<Button 
				borderRadius={50}
				color='white' bg={'#ff5151'} _hover={{ bg: '#D7354A' }} marginRight='5px' onClick={back}>
					Back
				</Button>
				<Button 				borderRadius={50}
				color='white' bg={'#ff5151'} _hover={{ bg: '#D7354A' }} onClick={next}>Next</Button>
			</FormControl>
			</Stack>
</Box></Container>

		</>
	);
};
export default Step4;
