import { useState } from 'react';
import firebase from 'firebase';
import { auth, googleAuthProvider } from '../../lib/firebase';
import { Box, Text, Input, Button } from '@chakra-ui/react';

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
				<Button onClick={signInWithPhone}>Verify</Button>
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
				<Button onClick={ValidatePhoneOTP}>Confirm</Button>
				<Button onClick={setHandler}>Go Back</Button>
			</Box>
			<Box style={{display:googleShow?'block':'none'}}>
			<Text> See other ways to Sign In </Text>
			<Button onClick={signInWithGoogle}>Sign in with Google</Button>
			</Box>
		</Box>
	);
}
