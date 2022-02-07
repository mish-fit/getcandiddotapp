import { useState } from 'react';
import firebase from 'firebase';
import { auth } from '../../lib/firebase';
import { Box, Input, Button } from '@chakra-ui/react';

import { useRouter } from 'next/router';
// Sign in with Phone button
export function SignInPhoneButton() {
	const router = useRouter();
	const [mynumber, setNumber] = useState('+91');
	const [otp, setOtp] = useState('');
	const [show, setShow] = useState(false);
	const [final, setFinal] = useState('');

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
			})
			.catch((err) => {
				alert(err);
				window.location.reload();
			});
	};

	return (
		<Box>
			<Box style={{ display: !show ? 'block' : 'none' } }>
				<Input
					value={mynumber}
					onChange={(e) => {
						setNumber(e.target.value);
					}}
					placeholder='Enter phone number'
					width={200}
				/>
				<Box id='recaptcha-container'></Box>
				<Button onClick={signInWithPhone}>Send OTP</Button>
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
				<Button onClick={ValidatePhoneOTP}>Verify</Button>
			</Box>
		</Box>
	);
}
