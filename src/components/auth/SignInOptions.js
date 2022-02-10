import { useState } from 'react';
import firebase from 'firebase';
import { auth, googleAuthProvider } from '../../lib/firebase';
import { Box, Text, Input, Flex,Button, Container,Stack, Center } from '@chakra-ui/react';

import { useRouter } from 'next/router';
// Sign in with Phone button
export function SignInOptions() {
	const router = useRouter();
	const [mynumber, setNumber] = useState('+91');
	const [otp, setOtp] = useState('');
	const [show, setShow] = useState(false);
	const [googleShow, setGoogleShow]=useState(true);
	const [final, setFinal] = useState('');

	const signInWithGoogle = async () => {
		await auth.signInWithPopup(googleAuthProvider).then((result) => {
			router.push('/onboard');
		});
	};

	// Validate OTP
	const ValidatePhoneOTP = () => {
		if (otp === null || final === null) return;
		final
			.confirm(otp)
			.then((result) => {
				router.push('/onboard');
			})
			.catch((err) => {
				alert('Wrong code');
			});
	};

	const signInWithPhone = async () => {
		if (mynumber === '' || mynumber.length < 10) return;
		let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
		auth
			.signInWithPhoneNumber(mynumber, verify)
			.then((result) => {
				setFinal(result);
				alert('OTP Sent');
				setShow(true);
				setGoogleShow(false);
			})
			.catch((err) => {
				alert(err);
				window.location.reload();
			});
	};

	const setHandler=()=>{
		setShow(!show);
		setGoogleShow(!googleShow);
	}

	return (

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
		<Box>
			<Box style={{ display: !show ? 'block' : 'none' } }>
			<Text>Verify your phone number to sign in or <br/>create a new Candid Account.</Text>
				<Input
					value={mynumber}
					onChange={(e) => {
						setNumber(e.target.value);
					}}
					placeholder='Enter phone number'
					width={200}
				/>
				<Box id='recaptcha-container'></Box>
				<Button 
				bg={'#ff5151'}
				borderRadius={50}
				color='white'
				_hover={{ bg: '#D7354A'}}
				onClick={signInWithPhone}>Verify</Button>
			</Box>
			<Box style={{ display: show ? 'block' : 'none' }}>
				<Input
					type='text'
					placeholder={'Enter your OTP'}
					onChange={(e) => {
						setOtp(e.target.value);
					}}
					width={200}
				></Input>
				<br />
				<Button 
				borderRadius={50}
				color='white'
				bg={'#ff5151'}
				_hover={{ bg: '#D7354A'}}
				onClick={ValidatePhoneOTP}>Confirm</Button>
				<Button
				borderRadius={50}
				color='white'
				bg={'#ff5151'}
				_hover={{ bg: '#D7354A'}}
				onClick={setHandler}>Go Back</Button>
			</Box>
			<Box style={{display:googleShow?'block':'none'}}>
			<Text> See other ways to Sign In </Text>
			<Button
				borderRadius={50}
				color='white'
			bg={'#ff5151'}
			_hover={{ bg: '#D7354A'}}
			
			onClick={signInWithGoogle}>Sign in with Google</Button>
			</Box>
		</Box>
		</Stack>
</Box></Container>
	);
}
