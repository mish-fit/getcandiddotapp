import {
	Input,
	Text,
	Box, Container,Stack,
	Heading,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Button,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { firestore } from '../../lib/firebase';
import { UserContext } from '../../lib/UserDataProvider';
const Step6 = (props) => {
	const ctx = useContext(UserContext);
	console.log(ctx.userData);
	const back = (e) => {
		e.preventDefault();
		props.prevStep();
	};
	const submitHandler = async (e) => {
		const userDoc = firestore.doc(`users/${ctx.userSignInInfo.user.uid}`);
		const batch = firestore.batch();
		batch.set(userDoc, {
			username: ctx.userData.username,
			displayName: ctx.userData.name,
			mail: ctx.userData.mail,
			phone: ctx.userData.phone,
			affiliateCodes: ctx.userData.affiliateCodes,
		});
		await batch.commit();

		e.preventDefault();
	};

	return (
		<>

	<Container maxW={'container.lg'} h={'100vh'} p={0} pt='10' align='center'>
	<Box
	p={10}
	display={{ md: "flex" }}
	maxWidth='26rem'
	borderWidth={1}
	margin={4}
>	<Stack
		align={{ base: "center", md: "stretch" }}
		textAlign={{ base: "center", md: "left" }}
		mt={{ base: 4, md: 0 }}
		ml={{ md: 6 }}
	>
			<FormControl>
				<Heading size={'lg'}>Submit User details</Heading>
				<br />
				<Text>{ctx.userData.name}</Text>
				<Text>{ctx.userData.username}</Text>
				<Text>{ctx.userData.mail}</Text>
				<Text>{ctx.userData.phone}</Text>
				<Text>{ctx.userData.affiliateCodes}</Text>
				<Button 
				borderRadius={50}
				color='white' bg={'#ff5151'} _hover={{ bg: '#D7354A' }} onClick={back}>
					Back
				</Button>
				<Button 
				borderRadius={50}
				color='white' bg={'#ff5151'} _hover={{ bg: '#D7354A' }} onClick={submitHandler} >
					Submit
				</Button>
			</FormControl>
			</Stack>
</Box></Container>
		</>
	);
};
export default Step6;
